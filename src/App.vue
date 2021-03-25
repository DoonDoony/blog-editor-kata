<template>
  <div id="app">
    <draggable-text-area></draggable-text-area>
    <markdown-preview></markdown-preview>
    <markdown-preview-button></markdown-preview-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DraggableTextArea from "@/components/DraggableTextArea.vue";
import MarkdownPreview from "@/components/MarkdownPreview.vue";
import MarkdownPreviewButton from "@/components/MarkdownPreviewButton.vue";

@Component({
  components: {
    DraggableTextArea,
    MarkdownPreview,
    MarkdownPreviewButton
  }
})
export default class App extends Vue {}
</script>
