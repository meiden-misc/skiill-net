import { db } from "./client";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";

const recruit = "recruit";

async function getStatus() {
  type StatusData = {
    statusStr: String;
  };

  const docRef = doc(db, "status", "status");
  const docSnap = await getDoc(docRef);
  const status = docSnap.data() as StatusData;
  console.log(status);
  return status;
}
type RecruitData = {
  title: String;
  thumbnail: String;
  media1: String;
  media2: String;
  media3: String;
  media4: String;
  media5: String;
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
  const q = query(collection(db, recruit));
  const querySnapshot = await getDocs(q);
  const ret: RecruitData[] = [];
  querySnapshot.forEach((doc) => {
    ret.push(doc.data() as RecruitData);
  });
  console.log(ret);
  return ret;
}

async function addRecruitData(data: RecruitData) {
  try {
    const docRef = collection(db, "recruit");
    await addDoc(docRef, data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { getStatus, getRecruitData, addRecruitData };
export type { RecruitData };
