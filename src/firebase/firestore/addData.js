import firebase_app from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(colllection, id, data) {
  let result = null;
  let error = null;

  try {
    if (id) {
      result = await setDoc(doc(db, colllection, id), data, {
        merge: true,
      });
    } else {
      result = await addDoc(collection(db, colllection), data);
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
