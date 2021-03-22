<template>
  <div id="editor">
    <label>
      <textarea
        ref="textarea"
        class="editor"
        @drop.prevent="onDrop($event.dataTransfer.files)"
        @dragover.prevent
        @dragenter.prevent
      ></textarea>
    </label>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import S3UploadMixin from "@/mixins/S3UploadMixin";
import MD from "@/utils/markdown";

@Component({ mixins: [S3UploadMixin] })
export default class DraggableTextArea extends Vue {
  mounted() {
    this.$refs.textarea.focus();
  }

  insertMediaContent(caption, url) {
    const lf = "\n";
    const editor = this.$refs.textarea;
    const markdownMediaText = MD.Media(caption, url);
    const { selectionStart, selectionEnd } = this.$refs.textarea;
    const textBefore = editor.value.substring(0, selectionStart);
    const textEnd = editor.value.substring(selectionStart, selectionEnd);
    editor.value = lf + textBefore + markdownMediaText + textEnd + lf.repeat(2);
  }

  async onDrop(files) {
    const file = files[0];
    const location = await this.uploadToS3(file);
    this.insertMediaContent(file.name, location);
  }
}
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  height: 50vh;
  width: 100%;
}

.editor {
  flex: 0.7;
  background-color: #2f2d2d;
  color: #ffffff;
  font-size: 20px;
  line-height: 1.6;
}

.editor:focus {
  outline-style: none;
  border-color: transparent;
}
</style>
