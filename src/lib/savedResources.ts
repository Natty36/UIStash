import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Fetch all saved resource IDs for a user
 */
export async function getSavedResourceIds(userId: string): Promise<number[]> {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data().savedResourceIds || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching saved resources:", error);
    return [];
  }
}

/**
 * Toggle a bookmark: Adds the ID if not present, removes it if already saved.
 */
export async function toggleSaveResource(
  userId: string,
  resourceId: number,
  isCurrentlySaved: boolean
): Promise<void> {
  try {
    const userRef = doc(db, "users", userId);

    if (isCurrentlySaved) {
      // Remove ID from array
      await updateDoc(userRef, {
        savedResourceIds: arrayRemove(resourceId),
        updatedAt: serverTimestamp(),
      });
    } else {
      // Add ID to array (setDoc with merge creates the user doc if it doesn't exist yet)
      await setDoc(
        userRef,
        {
          savedResourceIds: arrayUnion(resourceId),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.error("Error toggling saved resource:", error);
    throw error;
  }
}