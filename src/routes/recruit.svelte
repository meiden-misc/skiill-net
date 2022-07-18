<script lang="ts">
  import { firestoreStatus, isLoading, sampleData } from "$lib/store";
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
  import Dialog, {
    Header as DialogHeader,
    Title as DialogTitle,
    Content as DialogContent,
    Actions as DialogActions,
  } from "@smui/dialog";

  let dialogOpen = false;
  let recruitDataSnap: RecruitData[];
  let recruitDataSnapLength: number = 0;
  let statusSnap: String = "ボタンをクリックしてFireStoreからフェッチ";

  function getRecruitDataSnap() {
    getStatus().then((value) => {
      statusSnap = value.statusStr;
      getRecruitData().then((value) => {
        recruitDataSnap = value;
        recruitDataSnapLength = value.length;
        isLoading.set(false);
      });
    });
  }
</script>

<div class="wide_title">
  <h3>求人！</h3>
</div>
<div class="main">
  <Button on:click={getRecruitDataSnap} variant="raised">
    <Label>データベースのフェッチ</Label>
  </Button>
  <p>{statusSnap}</p>
  <p>{JSON.stringify(recruitDataSnap)}</p>
  <LayoutGrid>
    {#each Array(recruitDataSnapLength) as _unused, i}
      <Cell>
        <div class="card-container">
          <Card>
            <PrimaryAction on:click={() => null}>
              <Media
                class="card-media-16x9"
                aspectRatio="16x9"
                style="background-image: url({recruitDataSnap[i].thumbnail});"
              />
              <Content class="mdc-typography--body2">
                <p style="margin: 0;">{recruitDataSnap[i].title}</p>
                <h3
                  class="mdc-typography--subtitle2"
                  style="margin: 0 0 10px; color: #888;"
                >
                  {recruitDataSnap[i].issuer}
                </h3>
                {recruitDataSnap[i].detail}
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
    <Fab color="primary" extended on:click={() => (dialogOpen = true)}>
      <FabIcon class="material-icons">add</FabIcon>
      <FabLabel>求人を作成</FabLabel>
    </Fab>
  </div>
</div>

<Dialog
  bind:open={dialogOpen}
  fullscreen
  aria-labelledby="fullscreen-title"
  aria-describedby="fullscreen-content"
>
  <DialogHeader>
    <DialogTitle id="fullscreen-title">求人の作成</DialogTitle>
    <IconButton action="close" class="material-icons">close</IconButton>
  </DialogHeader>
  <Content id="fullscreen-content">
    <p>
      日頃から、こんなスキルを持った人がいないかな、こんな仲間がいたらなと感じていました。<br
      />
      そこで、コンピュータの技術を使って、仲間集めが出来ないかと考えました。それがスキールネットです。<br
      />
      自分にはないスキルを持った仲間を探すためのサイトを作り、自分で使用するだけではなく、<br
      />
      多くの人にもサイトの作り方を資料として公開し、問題の解決に繋げたいと思いました。<br
      />
      企業や社会人向けにはスキルのデータベースのようなものがあるかもしれませんが、学生にはないことに疑問を感じていました。<br
      />
      だからこそ学生のための学生が必要とする項目を作成し、より目的の人材にたどり着けるように募集設定に工夫をするつもりです。<br
      />
      また、部活動や探究活動以外にも、テスト対策など生徒同士で気軽に使用できるようにするつもりです。<br
      />
      自ら学びながら、仲間が相互に教え合い、様々なことに取り組むスタイルは、これからの新しい学習方法だと考えます。<br
      />
      そのための最適な解決方法がスキールネットです<br />
    </p>
    <p>
      日頃から、こんなスキルを持った人がいないかな、こんな仲間がいたらなと感じていました。<br
      />
      そこで、コンピュータの技術を使って、仲間集めが出来ないかと考えました。それがスキールネットです。<br
      />
      自分にはないスキルを持った仲間を探すためのサイトを作り、自分で使用するだけではなく、<br
      />
      多くの人にもサイトの作り方を資料として公開し、問題の解決に繋げたいと思いました。<br
      />
      企業や社会人向けにはスキルのデータベースのようなものがあるかもしれませんが、学生にはないことに疑問を感じていました。<br
      />
      だからこそ学生のための学生が必要とする項目を作成し、より目的の人材にたどり着けるように募集設定に工夫をするつもりです。<br
      />
      また、部活動や探究活動以外にも、テスト対策など生徒同士で気軽に使用できるようにするつもりです。<br
      />
      自ら学びながら、仲間が相互に教え合い、様々なことに取り組むスタイルは、これからの新しい学習方法だと考えます。<br
      />
      そのための最適な解決方法がスキールネットです<br />
    </p>
    <p>
      日頃から、こんなスキルを持った人がいないかな、こんな仲間がいたらなと感じていました。<br
      />
      そこで、コンピュータの技術を使って、仲間集めが出来ないかと考えました。それがスキールネットです。<br
      />
      自分にはないスキルを持った仲間を探すためのサイトを作り、自分で使用するだけではなく、<br
      />
      多くの人にもサイトの作り方を資料として公開し、問題の解決に繋げたいと思いました。<br
      />
      企業や社会人向けにはスキルのデータベースのようなものがあるかもしれませんが、学生にはないことに疑問を感じていました。<br
      />
      だからこそ学生のための学生が必要とする項目を作成し、より目的の人材にたどり着けるように募集設定に工夫をするつもりです。<br
      />
      また、部活動や探究活動以外にも、テスト対策など生徒同士で気軽に使用できるようにするつもりです。<br
      />
      自ら学びながら、仲間が相互に教え合い、様々なことに取り組むスタイルは、これからの新しい学習方法だと考えます。<br
      />
      そのための最適な解決方法がスキールネットです<br />
    </p>
  </Content>
  <Actions>
    <Button action="reject">
      <Label>Reject</Label>
    </Button>
    <Button action="accept" defaultAction>
      <Label>Accept</Label>
    </Button>
  </Actions>
</Dialog>

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
