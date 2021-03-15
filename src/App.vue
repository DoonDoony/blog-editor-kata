<template>
  <div id="app">
    <draggable-text-area></draggable-text-area>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DraggableTextArea from "./components/DraggableTextArea.vue";

@Component({
  components: {
    DraggableTextArea
  }
})
export default class App extends Vue {}
</script>
