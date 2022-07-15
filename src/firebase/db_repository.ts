import db from "./client";
import { doc, getDoc } from "firebase/firestore";
import { firestoreStatus } from "../store";

async function getStatus(): Promise<void> {
  let result = "";

  const docRef = doc(db, "status", "status");
  const docSnap = await getDoc(docRef);
  const status = docSnap.data();

  if (docSnap.exists()) {
    result = status as unknown as string;
  } else {
    result = "No such document";
  }

  console.log(result);

  firestoreStatus.set(result);
}

export { getStatus };
