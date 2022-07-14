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
  import { currentRouteId, routeId } from "../store";
  import { Router, Link, Route } from "svelte-routing";

  let open = true;
  let topAppBar: TopAppBarComponentDev;
  let theme = new ThemeManager();
  let isLightModeStr = theme.isLight ? "Dark" : "Light";

  let currentRouteIdSnap = "home";

  currentRouteId.subscribe((value) => {
    currentRouteIdSnap = value;
  });

  function setActive(route: string): void {
    currentRouteId.set(route);
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
      <Content>
        <List>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive(routeId.HOME)}
            activated={currentRouteIdSnap === routeId.HOME}
          >
            <Graphic class="material-icons" aria-hidden="true">home</Graphic>
            <Text>ホーム</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive(routeId.RECRUIT)}
            activated={currentRouteIdSnap === routeId.RECRUIT}
          >
            <Graphic class="material-icons" aria-hidden="true"
              >rocket_launch</Graphic
            >
            <Text>求人</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive(routeId.INFO)}
            activated={currentRouteIdSnap === routeId.INFO}
          >
            <Graphic class="material-icons" aria-hidden="true"
              >emoji_people</Graphic
            >
            <Text>案内</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive(routeId.ACCOUNT)}
            activated={currentRouteIdSnap === routeId.ACCOUNT}
          >
            <Graphic class="material-icons" aria-hidden="true">badge</Graphic>
            <Text>アカウント</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive(routeId.OTHER)}
            activated={currentRouteIdSnap === routeId.OTHER}
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
        <slot />
      </main>
    </AppContent>
  </div>
</AutoAdjust>

<style>
  .drawer-container {
    position: relative;
    display: flex;
    height: 90vh;
    min-width: max-content;
    overflow: hidden;
    z-index: 0;
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
  }
</style>
