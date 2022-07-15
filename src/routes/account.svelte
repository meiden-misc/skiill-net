<script lang="ts">
  import Button, { Label } from "@smui/button";
  import { firestoreStatus } from "../store";
  import { getStatus } from "../firebase/db_repository";

  let status = "";

  firestoreStatus.subscribe((value) => (status = value));
</script>

<div class="wide_title">
  <h1>アカウント！</h1>
</div>
<div class="main">
  <p>アカウントかも～</p>
  <Button on:click={getStatus} variant="raised">
    <Label>ステータスを取得</Label>
  </Button>
  <p>{status}</p>
</div>

<style>
  h1 {
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
    background-color: var(--m3-primary-container);
  }

  .main {
    padding: 16px;
    text-align: center;
  }
</style>
