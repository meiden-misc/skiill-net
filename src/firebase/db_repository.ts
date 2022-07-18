import { app, db } from "./client";
import { doc, Firestore, getDoc, Timestamp } from "firebase/firestore";
import { firestoreStatus, sampleData } from "../store";
import { FirebaseError } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore/lite";
import { safe_not_equal } from "svelte/internal";

const TARGET_COLLECTION_NAME = "recruit";

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
type RecruitData = {
  title: String;
  thumbnail: String;
  media: Map<String, String>;
  place: String;
  deadline: Timestamp;
  beginTime: Timestamp;
  endTime: Timestamp;
  issuer: String;
  recruitmentNum: number;
  recruitStatus: String;
  requirements: String;
  detail: String;
};

async function getRecruitData() {
  const db = getFirestore(app);
  const q = query(collection(db, TARGET_COLLECTION_NAME));
  const querySnapshot = await getDocs(q);
  const ret: RecruitData[] = [];
  querySnapshot.forEach((doc) => {
    ret.push(doc.data() as RecruitData);
  });
  console.log(ret);
  return ret;
}

export { getStatus, getRecruitData };
export type { RecruitData };
