<template>
  <div>
    <div v-html="$store.state.preview"></div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MarkdownPreview extends Vue {}
</script>

<style scoped></style>
