import { updateDoc, doc } from "firebase/firestore";

export async function updateData(collectionName, id, data) {
  const db = getFirestore(firebase_app);
  const docRef = doc(db, collectionName, id);

  try {
    await updateDoc(docRef, data);
    return { success: true, error: null };
  } catch (e) {
    return { success: false, error: e };
  }
}
