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
  .main {
    padding: 16px;
    text-align: center;
  }
</style>
