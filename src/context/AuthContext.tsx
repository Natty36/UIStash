"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { auth, googleProvider, githubProvider, db } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  username: string | null;
  savedIds: number[];
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (identifier: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleSave: (resourceId: number) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Listen for Auth State changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setSavedIds([]);
        setUsername(null);
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // 2. Real-time sync with user's Firestore doc (with safety error callback)
  useEffect(() => {
    if (!user) return;

    // Set fallback username immediately from Auth profile or email
    const initialFallbackUsername =
      user.displayName || user.email?.split("@")[0] || `user_${user.uid.slice(0, 5)}`;
    setUsername(initialFallbackUsername);

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribeSnapshot = onSnapshot(
      userDocRef,
      async (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setSavedIds(data.savedResourceIds || []);
          if (data.username || data.displayName) {
            setUsername(data.username || data.displayName);
          }
        } else {
          // Initialize doc on first login (e.g. Google / GitHub)
          const defaultUsername =
            user.displayName?.replace(/\s+/g, "").toLowerCase() ||
            user.email?.split("@")[0] ||
            `user_${user.uid.slice(0, 5)}`;

          const usernameLower = defaultUsername.toLowerCase();

          try {
            await setDoc(
              userDocRef,
              {
                email: user.email || "",
                displayName: user.displayName || defaultUsername,
                username: defaultUsername,
                usernameLower: usernameLower,
                savedResourceIds: [],
                createdAt: serverTimestamp(),
              },
              { merge: true }
            );

            // Reserve username mapping if not taken
            const usernameDocRef = doc(db, "usernames", usernameLower);
            const usernameSnap = await getDoc(usernameDocRef);
            if (!usernameSnap.exists()) {
              await setDoc(usernameDocRef, {
                uid: user.uid,
                email: user.email || "",
                username: defaultUsername,
                createdAt: serverTimestamp(),
              });
            }
          } catch (e) {
            console.warn("Firestore rules warning (Initialize Firestore in Firebase Console):", e);
          }

          setUsername(defaultUsername);
        }
        setLoading(false);
      },
      (error) => {
        // Quietly suppress snapshot permission errors so Auth works seamlessly
        console.warn("Firestore Snapshot Permission Warning (Update rules in Firebase Console):", error.message);
        setLoading(false);
      }
    );

    return () => unsubscribeSnapshot();
  }, [user]);

  // Auth Methods
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signInWithGithub = async () => {
    await signInWithPopup(auth, githubProvider);
  };

  // Sign In using Email OR Username
  const signInWithEmail = async (identifier: string, pass: string) => {
    const trimmed = identifier.trim();
    if (!trimmed) {
      throw new Error("Please enter your email or username.");
    }

    let targetEmail = trimmed;

    // If identifier is not an email (does not contain @), resolve email from username in Firestore
    if (!trimmed.includes("@")) {
      const usernameLower = trimmed.toLowerCase();
      try {
        const usernameDocRef = doc(db, "usernames", usernameLower);
        const usernameSnap = await getDoc(usernameDocRef);

        if (usernameSnap.exists()) {
          targetEmail = usernameSnap.data().email;
        } else {
          // Query users collection as secondary fallback
          const q = query(collection(db, "users"), where("usernameLower", "==", usernameLower));
          const querySnap = await getDocs(q);
          if (!querySnap.empty) {
            targetEmail = querySnap.docs[0].data().email;
          } else {
            throw new Error("No account found with that username.");
          }
        }
      } catch (err: any) {
        if (err.message && err.message.includes("No account found")) {
          throw err;
        }
        if (err.code === "permission-denied" || err.message?.includes("permission")) {
          throw new Error("Firestore permission denied. Please sign in with your email address or update your Firebase Rules.");
        }
        throw err;
      }
    }

    await signInWithEmailAndPassword(auth, targetEmail, pass);
  };

  // Sign Up with Email, Password & Username
  const signUpWithEmail = async (email: string, pass: string, usernameInput: string) => {
    const trimmedUsername = usernameInput.trim();
    if (!trimmedUsername) {
      throw new Error("Please choose a username.");
    }

    if (trimmedUsername.length < 3) {
      throw new Error("Username must be at least 3 characters long.");
    }

    if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
      throw new Error("Username can only contain letters, numbers, and underscores.");
    }

    const usernameLower = trimmedUsername.toLowerCase();

    // Check username availability if permission allows
    try {
      const usernameDocRef = doc(db, "usernames", usernameLower);
      const usernameSnap = await getDoc(usernameDocRef);

      if (usernameSnap.exists()) {
        throw new Error("This username is already taken. Please choose another.");
      }
    } catch (err: any) {
      if (err.message && err.message.includes("already taken")) {
        throw err;
      }
      console.warn("Skipping username pre-check (Firestore rules restricted):", err);
    }

    // Create Firebase Auth user
    const res = await createUserWithEmailAndPassword(auth, email.trim(), pass);

    // Update Auth Profile Display Name & Firestore Docs
    if (res.user) {
      await updateProfile(res.user, { displayName: trimmedUsername });
      setUsername(trimmedUsername);

      try {
        // Save user doc in Firestore
        await setDoc(
          doc(db, "users", res.user.uid),
          {
            email: email.trim(),
            username: trimmedUsername,
            usernameLower: usernameLower,
            displayName: trimmedUsername,
            savedResourceIds: [],
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );

        // Reserve unique username mapping in Firestore
        await setDoc(doc(db, "usernames", usernameLower), {
          uid: res.user.uid,
          email: email.trim(),
          username: trimmedUsername,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.warn("Firestore write skipped due to rules:", e);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  // Toggle bookmark in Firestore
  const toggleSave = async (resourceId: number) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      const isSaved = savedIds.includes(resourceId);

      await setDoc(
        userDocRef,
        {
          savedResourceIds: isSaved ? arrayRemove(resourceId) : arrayUnion(resourceId),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.warn("Failed to update bookmark in Firestore (Check Firebase Rules):", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        username,
        savedIds,
        loading,
        signInWithGoogle,
        signInWithGithub,
        signInWithEmail,
        signUpWithEmail,
        logout,
        toggleSave,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);