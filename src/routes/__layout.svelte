<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export const load = async ({ url: { pathname } }) => ({
    props: { pathname },
  });
</script>

<script lang="ts">
  import type { TopAppBarComponentDev } from "@smui/top-app-bar";
  import Button, { Label } from "@smui/button";
  import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
  } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import Drawer, {
    AppContent,
    Content,
    Title as DrawerTitle,
    Header,
    Subtitle,
  } from "@smui/drawer";
  import List, { Item, Text, Graphic, Separator, Subheader } from "@smui/list";
  import { ThemeManager } from "../theme/theme";
  import { currentPath, PathId, isLoading } from "../store";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import PageTransition from "$lib/page-transition.svelte";
  import LinearProgress from "@smui/linear-progress";

  export let pathname = "";

  let currentPathSnap = "";
  let open = true;
  let topAppBar: TopAppBarComponentDev;
  let theme = new ThemeManager();
  let isLightModeStr = theme.isLight ? "Dark" : "Light";

  onMount(() => {
    currentPath.set(new URL(location.href).pathname);
    console.log(new URL(location.href).pathname);
  });

  currentPath.subscribe((value) => {
    currentPathSnap = value;
  });

  function setActive(route: string): void {
    isLoading.set(true);
    currentPath.set(route);
    console.log(route);
    goto(route);
  }
</script>

<TopAppBar bind:this={topAppBar} variant="fixed">
  <Row>
    <Section>
      <IconButton class="material-icons" on:click={() => (open = !open)}
        >menu</IconButton
      >
      <Title><strong>スキールネット</strong></Title>
    </Section>
    <Section align="end" toolbar>
      <Button on:click={theme.toggleTheme}>
        <Label>{isLightModeStr}</Label>
      </Button>
    </Section>
  </Row>
</TopAppBar>

<AutoAdjust {topAppBar}>
  <div class="drawer-container">
    <Drawer variant="dismissible" bind:open style="padding: 10px;">
      <Header>
        <DrawerTitle><strong>スキールネット</strong></DrawerTitle>
        <Subtitle>校内のスキル共有ネットワーク</Subtitle>
      </Header>
      <div class="progress">
        {#if $isLoading}
          <LinearProgress class="progress-bar" indeterminate />
        {/if}
      </div>

      <Content>
        <List>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive(PathId.HOME)}
            activated={$currentPath == PathId.HOME}
          >
            <Graphic class="material-icons" aria-hidden="true">home</Graphic>
            <Text>ホーム</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive(PathId.RECRUIT)}
            activated={$currentPath == PathId.RECRUIT}
          >
            <Graphic class="material-icons" aria-hidden="true"
              >rocket_launch</Graphic
            >
            <Text>求人</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive(PathId.GUIDE)}
            activated={$currentPath == PathId.GUIDE}
          >
            <Graphic class="material-icons" aria-hidden="true"
              >emoji_people</Graphic
            >
            <Text>案内</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive(PathId.ACCOUNT)}
            activated={$currentPath == PathId.ACCOUNT}
          >
            <Graphic class="material-icons" aria-hidden="true">badge</Graphic>
            <Text>アカウント</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive(PathId.OTHERS)}
            activated={$currentPath == PathId.OTHERS}
          >
            <Graphic class="material-icons-outlined" aria-hidden="true"
              >info</Graphic
            >
            <Text>その他</Text>
          </Item>
        </List>
      </Content>
    </Drawer>

    <AppContent class="app-content">
      <main class="main-content">
        <PageTransition {pathname}>
          <slot />
        </PageTransition>
      </main>
    </AppContent>
  </div>
</AutoAdjust>

<style lang="scss">
  .drawer-container {
    position: sticky;
    top: 100%;
    height: 90vh;
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    overflow: auto;
    /* height: 100%; */
    box-sizing: border-box;
  }

  .progress {
    padding-top: 10px;
    min-height: 5px;
  }
</style>
