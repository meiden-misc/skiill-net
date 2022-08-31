<script lang="ts">
    import Button, { Label } from "@smui/button";
    import { getStatus } from "$lib/firebase/db_repository";
    import { onMount } from "svelte";
    import { currentUser, firestoreStatus, isLoading } from "$lib/model/store";

    onMount(() => {
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
    <p>{$currentUser.uid}</p>
</div>

<style>
    .main {
        padding: 16px;
        text-align: center;
    }
</style>
