<script lang="ts">
  import Drawer, {
    AppContent,
    Content,
    Title as DrawerTitle,
    Header,
    Subtitle,
  } from "@smui/drawer";
  import List, { Item, Text, Graphic, Separator, Subheader } from "@smui/list";
  import Contents from "./_pochikata.svelte";
  import { scrollId } from "../store";
</script>

<AppContent class="app-content">
  <main class="main-content">
    <Contents />
  </main>
</AppContent>

<div class="drawer-container">
  <Drawer style="padding: 10px; min-width: max-content;">
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
</div>

<style>
  .drawer-container {
    position: fixed;
    display: flex;
    min-width: max-content;
    left: 10;
    top: 40;
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
    padding-left: 270px;
  }
</style>
