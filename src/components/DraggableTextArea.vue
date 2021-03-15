<template>
  <div id="editor">
    <div class="image-preview" ref="preview">
      <img :src="src" alt="preview" />
    </div>
    <div
      class="textarea"
      ref="textarea"
      contenteditable
      @drop.prevent="onDrop($event.dataTransfer.files)"
      @dragover.prevent
      @dragenter.prevent
    ></div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class DraggableTextArea extends Vue {
  src = "https://placehold.it/";

  mounted() {
    this.$refs.textarea.focus();
    const { clientWidth, clientHeight } = this.$refs.preview;
    this.src += `${clientWidth}x${clientHeight}`;
  }

  onDrop(files) {
    const file = files[0];
    this.preview(file);
  }

  preview(file) {
    const reader = new FileReader();
    reader.onload = this.renderPreview;
    reader.readAsDataURL(file);
  }

  renderPreview(e) {
    this.src = e.currentTarget.result;
  }
}
</script>

<style scoped>
#editor {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.image-preview {
  display: flex;
  flex: 0.3;
  background-size: cover;
  align-items: center;
}

.image-preview img {
  margin: auto;
}

.textarea {
  flex: 0.7;
  background-color: #2f2d2d;
  color: #ffffff;
  font-size: 20px;
  line-height: 1.6;
}

.textarea:focus {
  outline-style: none;
  border-color: transparent;
}
</style>
