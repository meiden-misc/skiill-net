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

  let open = true;

  function switchTheme() {
    lightTheme = !lightTheme;
    let themeLink = document.head.querySelector<HTMLLinkElement>("#theme");
    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.rel = "stylesheet";
      themeLink.id = "theme";
    }
    themeLink.href = `/smui${lightTheme ? "" : "-dark"}.css`;
    document.head
      .querySelector<HTMLLinkElement>('link[href$="/smui-dark.css"]')
      ?.insertAdjacentElement("afterend", themeLink);
  }

  let lightTheme =
    typeof window === "undefined" ||
    window.matchMedia("(prefers-color-scheme: light)").matches;

  let topAppBar: TopAppBarComponentDev;
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
      <Button on:click={switchTheme}>
        <Label>{lightTheme ? "Dark" : "Light"}</Label>
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
          <Item activated>
            <Graphic class="material-icons" aria-hidden="true">home</Graphic>
            <Text>ホーム</Text>
          </Item>
          <Item>
            <Graphic class="material-icons" aria-hidden="true"
              >rocket_launch</Graphic
            >
            <Text>発見</Text>
          </Item>
          <Item>
            <Graphic class="material-icons" aria-hidden="true"
              >emoji_people</Graphic
            >
            <Text>求人</Text>
          </Item>
          <Item>
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
    height: 94vh;
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
