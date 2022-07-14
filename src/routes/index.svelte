<script>
  import { currentRouteId } from "../store";
  import { Router, Route } from "svelte-routing";
  import Home from "./Home.svelte";
  import Recruit from "./recruit.svelte";

  let currentRouteIdSnap = "home";
  currentRouteId.subscribe((value) => (currentRouteIdSnap = value));
</script>

{#if currentRouteIdSnap == "home"}
  <Home />
{:else if currentRouteIdSnap == "recruit"}
  <Recruit />
{:else}
  <Home />
{/if}
