<template>
  <div id="editor">
    <label>
      <textarea
        ref="editor"
        :value="text"
        class="editor"
        @input="text = $event.target.value"
        @keydown.tab.prevent="tabToIndent"
        @drop.prevent="onDrop($event.dataTransfer.files)"
        @dragover.prevent
        @dragenter.prevent
      ></textarea>
    </label>
  </div>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";
import S3UploadMixin from "@/mixins/S3UploadMixin";
import MD from "@/utils/markdown";

@Component({ mixins: [S3UploadMixin] })
export default class DraggableTextArea extends Vue {
  text = "";

  get caretOffset() {
    return this.$refs.editor.selectionStart;
  }

  @Watch("text")
  onTextChange(text, oldText) {
    console.log(text, oldText);
  }

  mounted() {
    this.$refs.editor.focus();
  }

  insertText(text, option = {}) {
    const { head = "", tail = "" } = option;
    const startPos = option.start ?? this.caretOffset;
    const endPos = option.end ?? this.caretOffset;
    const textBefore = this.text.substring(0, startPos);
    const textEnd = this.text.substring(endPos, this.text.length);
    const newText = head + text + tail;
    this.text = textBefore + newText + textEnd;
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

  tabToIndent() {
    this.text += "\t";
  }
}
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  height: 50vh;
  width: 100%;
  tab-size: 4;
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
