<template>
  <div>
    <button type="submit" @click.prevent="requestPreview">미리보기</button>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";

export default class MarkdownPreviewButton extends Vue {
  async requestPreview() {
    const response = await fetch(process.env.VUE_APP_MARKDOWN_PREVIEW_API, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "plaintext"
      },
      body: this.$store.state.content
    });
    const { html } = await response.json();
    await this.$store.dispatch("updatePreview", html);
  }
}
</script>
