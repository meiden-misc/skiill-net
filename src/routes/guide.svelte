<script lang="ts">
  import Button, { Label } from "@smui/button";
  import { firestoreStatus, isLoading } from "$lib/store";
  import { getStatus } from "../firebase/db_repository";
  import { onMount } from "svelte";

  onMount(() => {
    isLoading.set(false);
  });

  let status = "";

  firestoreStatus.subscribe((value) => (status = value));
</script>

<div class="wide_title">
  <h3>ガイド！</h3>
</div>
<div class="main">
  <p>ガイドかも～</p>
  <Button on:click={getStatus} variant="raised">
    <Label>ステータスを取得</Label>
  </Button>
  <p>{status}</p>
</div>

<style>
</style>
