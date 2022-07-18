<script lang="ts">
  import { firestoreStatus, isLoading, sampleData } from "../store";
  import {
    getStatus,
    getRecruitData,
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
  import { raf } from "svelte/internal";

  onMount(() => {});

  let sampleDataSnap: RecruitData[];
  let sampleDataSnapLength: number = 0;
  getRecruitData().then((value) => {
    sampleDataSnap = value;
    sampleDataSnapLength = value.length;
    isLoading.set(false);
  });
</script>

<div class="wide_title">
  <h3>求人！</h3>
</div>
<div class="main">
  <Button on:click={getStatus} variant="raised">
    <Label>サンプルを取得</Label>
  </Button>
  <p>求人かも～</p>
  <LayoutGrid>
    {#each Array(sampleDataSnapLength) as _unused, i}
      <Cell>
        <div class="card-container">
          <Card>
            <PrimaryAction on:click={() => null}>
              <Media class="card-media-16x9" aspectRatio="16x9" />
              <Content class="mdc-typography--body2">
                <p style="margin: 0;">{sampleDataSnap[i].title}</p>
                <h3
                  class="mdc-typography--subtitle2"
                  style="margin: 0 0 10px; color: #888;"
                >
                  {sampleDataSnap[i].issuer}
                </h3>
                {sampleDataSnap[i].detail}
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
                  on:click={() => null}
                  title="More options">more_vert</IconButton
                >
              </ActionIcons>
            </Actions>
          </Card>
        </div>
      </Cell>
    {/each}
  </LayoutGrid>
  <div class="fab">
    <Fab color="primary" extended>
      <FabIcon class="material-icons">add</FabIcon>
      <FabLabel>求人を作成</FabLabel>
    </Fab>
  </div>
</div>

<style>
  .fab {
    position: fixed;
    right: 25px;
    bottom: 25px;
    transition: 1s;
  }
  * :global(.card-media-16x9) {
    background-image: url(https://www.lightstalking.com/wp-content/uploads/backlit-beach-color-258109-3-1024x576.jpg);
  }

  .card-container {
    padding: 10px;
  }
</style>
