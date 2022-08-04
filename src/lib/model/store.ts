import type { TopAppBarComponentDev } from "@smui/top-app-bar";
import { Timestamp } from "firebase/firestore";
import type { RecruitData } from "$lib/firebase/db_repository";
import { writable } from "svelte/store";

const PathId = {
  HOME: "/",
  RECRUIT: "/recruit",
  GUIDE: "/guide",
  ACCOUNT: "/account",
  OTHERS: "/others",
} as const;

const data: RecruitData[] = [
  {
    title: "読み込み中...",
    thumbnail: "",
    media1: "",
    media2: "",
    media3: "",
    media4: "",
    media5: "",
    place: "読み込み中...",
    deadline: Timestamp.now(),
    beginTime: Timestamp.now(),
    endTime: Timestamp.now(),
    issuer: "読み込み中...",
    recruitmentNum: 0,
    recruitStatus: "読み込み中...",
    requirements: "読み込み中...",
    detail: "読み込み中...",
  },
];

let scrollId = writable("");
let firestoreStatus = writable("");
let currentPath = writable("/home");
let isLoading = writable(true);
let recruitDataSnap = writable(data);
let recruitIdSnap = writable([""]);
export {
  scrollId,
  firestoreStatus,
  PathId,
  currentPath,
  isLoading,
  recruitDataSnap,
  recruitIdSnap,
};
