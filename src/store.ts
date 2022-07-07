import type { TopAppBarComponentDev } from "@smui/top-app-bar";
import { writable } from "svelte/store";

let scrollId = writable("");
let firestoreStatus = writable("");

export { scrollId, firestoreStatus };
