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

  insertText(text, option) {
    const { head = "", tail = "" } = option;
    const editor = this.$refs.textarea;
    const startPos = option.start ?? this.$refs.textarea.selectionStart;
    const endPos = option.end ?? this.$refs.textarea.selectionStart;
    const textBefore = editor.value.substring(0, startPos);
    const textEnd = editor.value.substring(endPos, editor.value.length);
    const newText = head + text + tail;
    editor.value = textBefore + newText + textEnd;
    return [startPos, startPos + newText.length];
  }

  insertUploadingMediaContent(filename) {
    const caption = `Uploading ${filename}...`;
    const markdownMediaText = MD.Media(caption, "");
    const option = { head: "\n", tail: "\n" };
    return this.insertText(markdownMediaText, option);
  }

  insertMediaContent(caption, url, start, end) {
    const markdownMediaText = MD.Media(caption, url);
    const option = { head: "\n", tail: "\n", start, end };
    this.insertText(markdownMediaText, option);
  }

  async onDrop(files) {
    const file = files[0];
    const [start, end] = this.insertUploadingMediaContent(file.name);
    const location = await this.uploadToS3(file);
    this.insertMediaContent(file.name, location, start, end);
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
