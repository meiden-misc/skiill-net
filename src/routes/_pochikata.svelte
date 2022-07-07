<script lang="ts">
  import Button, { Label, Icon } from "@smui/button";
  import { getStatus } from "../firebase/db_repository";

  let open = true;
  let active = "movie";
  let clicked = 0;
</script>

<div>
  <Button on:click={() => (open = !open)}>
    <Label>Toggle Drawer</Label>
  </Button>
  <br />
  <pre class="status">Active: {active}</pre>
  <slot />

  <p id="movie">わああ</p>
  <Button on:click={() => getStatus()}>
    <Icon class="material-icons">thumb_up</Icon>
    <Label>ステータスを取得</Label>
  </Button>
</div>
