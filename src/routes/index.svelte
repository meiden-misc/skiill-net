<script lang="ts">
  import Button, { Label } from "@smui/button";
  import { firestoreStatus } from "../store";
  import { getStatus } from "../firebase/db_repository";

  let status = "";

  firestoreStatus.subscribe((value) => (status = value));
</script>

<div class="main">
  <p>わああああ</p>
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
