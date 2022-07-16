<script lang="ts">
  import Button, { Label } from "@smui/button";
  import { firestoreStatus, isLoading } from "../store";
  import { getStatus } from "../firebase/db_repository";
  import { onMount } from "svelte";

  onMount(() => {
    console.log("hi");
    isLoading.set(false);
  });

  let status = "";

  firestoreStatus.subscribe((value) => (status = value));
</script>

<div class="wide_title">
  <h3>アカウント！</h3>
</div>
<div class="main">
  <p>アカウントかも～</p>
  <Button on:click={getStatus} variant="raised">
    <Label>ステータスを取得</Label>
  </Button>
  <p>{status}</p>
</div>

<style>
  h3 {
    padding: 0px;
    padding-top: 70px;
    margin: 0px;
    font-weight: 800;
    color: var(--m3-on-primary-container);
  }
  .wide_title {
    padding: 0px;
    margin: 0px;
    text-align: center;
    height: 200px;
    background-color: var(--m3-inverse-primary);
  }

  .main {
    padding: 16px;
    text-align: center;
  }
</style>
