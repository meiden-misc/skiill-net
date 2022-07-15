<script>
  import { fly } from "svelte/transition";
  export let pathname = "";
</script>

<!-- Whenever pathname changes, unmount (page transition out), then re-mount (page transition in) -->
{#key pathname}
  <div
    in:fly={{ y: -5, duration: 250, delay: 300 }}
    out:fly={{ y: 5, duration: 250 }}
  >
    <slot />
  </div>
{/key}
