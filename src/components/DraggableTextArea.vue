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

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import S3UploadMixin from "@/mixins/S3UploadMixin";
import MD from "@/utils/markdown";

interface InsertTextOption {
  head: string;
  tail: string;
  start?: number;
  end?: number;
}

@Component
export default class DraggableTextArea extends Mixins(S3UploadMixin) {
  text = "";

  get editor(): HTMLTextAreaElement {
    return this.$refs.editor as HTMLTextAreaElement;
  }

  get caretOffset(): number {
    return this.editor.selectionStart;
  }

  @Watch("text")
  onTextChange(text: string) {
    this.$store.dispatch("updateContent", text);
  }

  mounted() {
    this.editor.focus();
  }

  insertText(text: string, option: InsertTextOption): [number, number] {
    const { head = "", tail = "" } = option;
    const startPos = option.start ?? this.caretOffset;
    const endPos = option.end ?? this.caretOffset;
    const textBefore = this.text.substring(0, startPos);
    const textEnd = this.text.substring(endPos, this.text.length);
    const newText = head + text + tail;
    this.text = textBefore + newText + textEnd;
    return [startPos, startPos + newText.length];
  }

  insertUploadingMediaContent(filename: string) {
    const caption = `Uploading ${filename}...`;
    const markdownMediaText = MD.Media(caption, "");
    const option = { head: "\n", tail: "\n" };
    return this.insertText(markdownMediaText, option);
  }

  insertMediaContent(caption: string, url: string, start: number, end: number) {
    const markdownMediaText = MD.Media(caption, url);
    const option = { head: "\n", tail: "\n", start, end };
    this.insertText(markdownMediaText, option);
  }

  async onDrop(files: FileList) {
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
