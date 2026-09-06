"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { auth, googleProvider, githubProvider, db } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  savedIds: number[];
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleSave: (resourceId: number) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Listen for Auth State changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setSavedIds([]);
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // 2. Real-time sync with user's Firestore doc
  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribeSnapshot = onSnapshot(userDocRef, (snap) => {
      if (snap.exists()) {
        setSavedIds(snap.data().savedResourceIds || []);
      } else {
        // Initialize doc on first login
        setDoc(userDocRef, {
          email: user.email || "",
          displayName: user.displayName || "",
          savedResourceIds: [],
          createdAt: serverTimestamp(),
        });
      }
      setLoading(false);
    });

    return () => unsubscribeSnapshot();
  }, [user]);

  // Auth Methods
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signInWithGithub = async () => {
    await signInWithPopup(auth, githubProvider);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // Toggle bookmark in Firestore
  const toggleSave = async (resourceId: number) => {
    if (!user) return;

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
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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