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
  checkUsernameAvailable: (usernameInput: string) => Promise<boolean>;
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

  // 2. Real-time sync with user's Firestore doc
  useEffect(() => {
    if (!user) return;

    // Helper to format display username (first name if full name with spaces, or exact username)
    const getFirstName = (name?: string | null, email?: string | null) => {
      if (name && name.trim()) {
        const trimmed = name.trim();
        // If it's a full name with spaces (e.g. "Natnael Mulugeta"), return first name
        const parts = trimmed.split(/\s+/);
        return parts[0];
      }
      if (email && email.includes("@")) {
        const prefix = email.split("@")[0];
        return prefix.includes(".") ? prefix.split(".")[0] : prefix;
      }
      return "User";
    };

    const initialName = user.displayName ? getFirstName(user.displayName, user.email) : getFirstName(null, user.email);
    queueMicrotask(() => setUsername(initialName));

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribeSnapshot = onSnapshot(
      userDocRef,
      async (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setSavedIds(data.savedResourceIds || []);
          if (data.username) {
            setUsername(data.username);
          } else if (data.displayName || user.displayName) {
            setUsername(getFirstName(data.displayName || user.displayName, user.email));
          }
        } else {
          // Initialize doc on first login (e.g. Google / GitHub)
          const firstName = getFirstName(user.displayName, user.email);
          const defaultUsername = user.displayName ? getFirstName(user.displayName, user.email) : firstName;
          const usernameLower = defaultUsername.toLowerCase();

          try {
            await setDoc(
              userDocRef,
              {
                email: user.email || "",
                username: defaultUsername,
                usernameLower: usernameLower,
                photoURL: user.photoURL || "",
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
            console.warn("Firestore rules warning:", e);
          }

          setUsername(defaultUsername);
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore Snapshot Permission Warning:", error.message);
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

  // Helper to check if username is available (always returns true as usernames don't need to be unique)
  const checkUsernameAvailable = async (): Promise<boolean> => {
    return true;
  };

  // Sign In strictly using Email & Password
  const signInWithEmail = async (emailInput: string, pass: string) => {
    const trimmed = emailInput.trim();
    if (!trimmed) {
      throw new Error("Please enter your email address.");
    }
    await signInWithEmailAndPassword(auth, trimmed, pass);
  };

  // Sign Up with Email, Password & Display Username
  const signUpWithEmail = async (emailInput: string, pass: string, usernameInput: string) => {
    const trimmedUsername = usernameInput.trim();
    if (!trimmedUsername) {
      throw new Error("Please enter your username.");
    }
    const trimmedEmail = emailInput.trim();

    // Create Firebase Auth user
    const res = await createUserWithEmailAndPassword(auth, trimmedEmail, pass);

    // Update Auth Profile Display Name & Firestore User Doc
    if (res.user) {
      await updateProfile(res.user, { displayName: trimmedUsername });
      setUsername(trimmedUsername);

      try {
        await setDoc(
          doc(db, "users", res.user.uid),
          {
            email: trimmedEmail,
            username: trimmedUsername,
            savedResourceIds: [],
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
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
      console.warn("Failed to update bookmark in Firestore:", error);
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
        checkUsernameAvailable,
        logout,
        toggleSave,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);