import firebase_app from "../config";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function fetchData(collectionName, id) {
  let data = null;
  let error = null;

  try {
    if (id) {
      const docRef = doc(db, collectionName, id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        data = docSnapshot.data();
      } else {
        throw new Error("No such document!");
      }
    } else {
      // Pobieranie wszystkich dokumentów z kolekcji, jeśli ID nie jest podane
      const querySnapshot = await getDocs(collection(db, collectionName));
      data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  } catch (e) {
    error = e;
  }

  return { data, error };
}
