<template>
  <div id="window-size-component">
    <p>window width {{ windowWidth }} -- height {{ windowHeight }}</p>
  </div>
</template>

<script>
import { useWindowSizeStore } from '../stores/WindowSizeStore';
import { mapState } from 'pinia' // add this

export default {
  name: 'WindowSize',
  computed: {
    ...mapState(useWindowSizeStore, ['windowWidth', 'windowHeight']),
  }
}
</script>

<style scoped lang="scss">
#window-size-component {
  width: 100%;
  position: fixed;
  top:0;
  z-index: 999;
  color: white;
  font-size: 8pt;
  font-weight: lighter;
  background-color: rgba(155, 158, 156, 0.8);
  p {
    margin: 0;
    padding:0 0 0.1em 1em;
  }
}
</style>
