<script lang="ts">
    import {
        firestoreStatus,
        isLoading,
        recruitDataSnap,
        recruitIdSnap,
    } from "$lib/model/store";
    import {
        getStatus,
        getRecruitData,
        deleteRecruitData,
        type RecruitData,
    } from "$lib/firebase/db_repository";
    import { onMount } from "svelte";
    import Button, { Label } from "@smui/button";
    import Fab, { Label as FabLabel, Icon as FabIcon } from "@smui/fab";
    import RecruitDialog from "$lib/components/recruit/register.svelte";
    import Card from "$lib/components/recruit/content/card.svelte";
    import Table from "$lib/components/recruit/content/table.svelte";
    import { signIn } from "$lib/firebase/auth";

    let dialogOpen = false;
    let statusSnap: String = "ボタンをクリックしてFireStoreからフェッチ";

    onMount(() => {
        getRecruitData().then((_) => isLoading.set(false));
        console.log("hey");
    });
</script>

<div class="wide_title">
    <h3>求人！</h3>
</div>
<div class="main">
    <Button on:click={signIn} variant="raised">
        <Label>認証</Label>
    </Button>
    <p>{statusSnap}</p>
    <Table />
    <Card />
    <div class="fab">
        <Fab
            color="primary"
            extended
            on:click={() => {
                dialogOpen = false;
                dialogOpen = true;
            }}
        >
            <FabIcon class="material-icons">add</FabIcon>
            <FabLabel>求人を作成</FabLabel>
        </Fab>
    </div>
</div>

<RecruitDialog {dialogOpen} />

<style>
    .main {
        padding-bottom: 80px;
    }
    .fab {
        position: fixed;
        right: 25px;
        bottom: 25px;
        transition: 1s;
    }
</style>
