import type { TopAppBarComponentDev } from "@smui/top-app-bar";
import { writable } from "svelte/store";

const routeId = {
  HOME: "home",
  RECRUIT: "recruit",
  GUIDE: "guide",
  ACCOUNT: "account",
  OTHERS: "others",
} as const;

let scrollId = writable("");
let firestoreStatus = writable("");
let currentRouteId = writable("home");

export { scrollId, firestoreStatus, routeId, currentRouteId };
