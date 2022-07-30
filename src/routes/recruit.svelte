<script lang="ts">
  import {
    firestoreStatus,
    isLoading,
    recruitDataSnap,
    recruitIdSnap,
  } from "$lib/store";
  import {
    getStatus,
    getRecruitData,
    deleteRecruitData,
    type RecruitData,
  } from "../firebase/db_repository";
  import { onMount } from "svelte";
  import Card, {
    Content,
    PrimaryAction,
    Media,
    MediaContent,
    Actions,
    ActionButtons,
    ActionIcons,
  } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import IconButton, { Icon } from "@smui/icon-button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Fab, { Label as FabLabel, Icon as FabIcon } from "@smui/fab";
  import RecruitDialog from "$lib/components/recruit-dialog.svelte";

  let dialogOpen = false;
  let statusSnap: String = "ボタンをクリックしてFireStoreからフェッチ";

  onMount(() => {
    getRecruitData().then((_) => isLoading.set(false));
    console.log("hey");
  });

  // function getRecruitDataSnap() {
  //   getStatus().then((value) => {
  //     statusSnap = value.statusStr;
  //     getRecruitData().then((value) => {
  //       recruitDataSnap = value;
  //       recruitDataSnapLength = value.length;
  //       isLoading.set(false);
  //     });
  //   });
  // }
</script>

<div class="wide_title">
  <h3>求人！</h3>
</div>
<div class="main">
  <Button on:click={getRecruitData} variant="raised">
    <Label>データベースのフェッチ</Label>
  </Button>
  <p>{statusSnap}</p>
  <p>{JSON.stringify($recruitDataSnap)}</p>
  <p>{$recruitIdSnap}</p>
  <LayoutGrid>
    {#each Array($recruitDataSnap.length) as _unused, i}
      <Cell>
        <div class="card-container">
          <Card>
            <PrimaryAction on:click={() => null}>
              <Media
                class="card-media-16x9"
                aspectRatio="16x9"
                style="background-image: url({$recruitDataSnap[i].thumbnail});"
              />
              <Content class="mdc-typography--body2">
                <p style="margin: 0;">{$recruitDataSnap[i].title}</p>
                <h3
                  class="mdc-typography--subtitle2"
                  style="margin: 0 0 10px; color: #888;"
                >
                  {$recruitDataSnap[i].issuer}
                </h3>
                {$recruitDataSnap[i].detail}
              </Content>
            </PrimaryAction>
            <Actions>
              <ActionButtons>
                <Button on:click={() => null}>
                  <Label>Another</Label>
                </Button>
              </ActionButtons>
              <ActionIcons>
                <IconButton
                  on:click={() => null}
                  toggle
                  aria-label="Add to favorites"
                  title="Add to favorites"
                >
                  <Icon class="material-icons" on>favorite</Icon>
                  <Icon class="material-icons">favorite_border</Icon>
                </IconButton>
                <IconButton
                  class="material-icons"
                  on:click={() => null}
                  title="Share">share</IconButton
                >
                <IconButton
                  class="material-icons"
                  on:click={() => deleteRecruitData($recruitIdSnap[i])}
                  title="More options">delete</IconButton
                >
              </ActionIcons>
            </Actions>
          </Card>
        </div>
      </Cell>
    {/each}
  </LayoutGrid>
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
  .card-container {
    padding: 10px;
  }
</style>
