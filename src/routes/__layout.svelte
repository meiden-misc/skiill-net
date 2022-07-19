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
    Scrim,
  } from "@smui/drawer";
  import List, { Item, Text, Graphic, Separator, Subheader } from "@smui/list";
  import { ThemeManager } from "../theme/theme";
  import { currentPath, PathId, isLoading } from "$lib/store";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import PageTransition from "$lib/page-transition.svelte";
  import LinearProgress from "@smui/linear-progress";

  export let pathname = "";

  let open = false;
  let isLandscapeSnap = false;
  let topAppBar: TopAppBarComponentDev;
  let theme = new ThemeManager();
  let isLightModeStr = theme.isLight ? "Dark" : "Light";

  onMount(() => {
    open = isLandscape();
    isLandscapeSnap = isLandscape();
    currentPath.set(new URL(location.href).pathname);
    console.log(new URL(location.href).pathname);
  });

  async function setActive(route: string) {
    isLoading.set(true);
    currentPath.set(route);
    open = !isLandscapeSnap ? false : true;
    await new Promise((resolve) => setTimeout(resolve, 1500)); // for debugging
    goto(route);
  }

  function isWideWidth(): boolean {
    return window.innerWidth > 730;
  }

  function isLandscape(): boolean {
    if (!navigator.userAgent.match(/iPhone|Android.+Mobile/) && isWideWidth()) {
      return true;
    } else {
      return false;
    }
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
  {#if !isLandscapeSnap}
    <div class="progress-mobile">
      {#if $isLoading}
        <LinearProgress class="progress-bar-mobile" indeterminate />
      {/if}
    </div>
  {/if}
</TopAppBar>

<AutoAdjust {topAppBar}>
  <div class="drawer-container">
    <Drawer
      variant="modal"
      bind:open
      style="padding: 10px;"
      fixed={isLandscapeSnap}
    >
      <Header>
        <DrawerTitle><strong>スキールネット</strong></DrawerTitle>
        <Subtitle>校内のスキル共有ネットワーク</Subtitle>
      </Header>
      {#if isLandscapeSnap}
        <div class="progress">
          {#if $isLoading}
            <LinearProgress class="progress-bar" indeterminate />
          {/if}
        </div>
      {/if}

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
      <div class="test">
        <div class="material-icons" aria-hidden="true">warning</div>
        <p>プログレスバーの確認の為に画面遷移時に1.5秒遅延させてます</p>
      </div>
    </Drawer>

    {#if !isLandscapeSnap}
      <Scrim fixed={false} />
    {/if}
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
  .test {
    padding: 20px;
    margin-bottom: 65px;
    border-radius: 10px;
    color: var(--m3-on-error);
    background-color: var(--m3-error);
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    overflow: auto;
    box-sizing: border-box;
  }

  .progress {
    padding-top: 8px;
    min-height: 4px;
  }
  .progress-mobile {
    margin-top: -5.5px;
    min-height: 4px;
  }
</style>
