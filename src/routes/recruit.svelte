<script lang="ts">
  import { firestoreStatus, isLoading } from "../store";
  import { getStatus } from "../firebase/db_repository";
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

  onMount(() => {
    console.log("hi");
    isLoading.set(false);
  });
  let status = "";

  firestoreStatus.subscribe((value) => (status = value));
</script>

<div class="wide_title">
  <h3>求人！</h3>
</div>
<div class="main">
  <Button on:click={getStatus} variant="raised">
    <Label>ステータスを取得</Label>
  </Button>
  <p>{status}</p>
  <p>求人かも～</p>
  <LayoutGrid>
    {#each Array(9) as _unused, i}
      <Cell>
        <div class="card-container">
          <Card>
            <PrimaryAction on:click={() => null}>
              <Media class="card-media-16x9" aspectRatio="16x9" />
              <Content class="mdc-typography--body2">
                <h2 class="mdc-typography--headline6" style="margin: 0;">
                  A card with media.
                </h2>
                <h3
                  class="mdc-typography--subtitle2"
                  style="margin: 0 0 10px; color: #888;"
                >
                  And a subtitle.
                </h3>
                It's all in this card. It's a veritable smorgasbord of card features.
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
