<script lang="ts">
  import Button, { Label } from "@smui/button";
  import { getStatus } from "../lib/firebase/db_repository";
  import { firestoreStatus, isLoading } from "$lib/model/store";
  import { onMount } from "svelte";

  onMount(() => {
    isLoading.set(false);
  });

  let statusSnap: String;
  function getStatusSnap() {
    getStatus().then((value) => (statusSnap = value.statusStr));
  }
</script>

<div class="wide_title">
  <h3>その他！</h3>
</div>
<div class="main">
  <p>その他かも～</p>
  <Button on:click={getStatusSnap} variant="raised">
    <Label>ステータスを取得</Label>
  </Button>
  <p>{statusSnap}</p>
</div>

<style>
</style>
