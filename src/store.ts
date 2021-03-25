import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export interface State {
  content: string;
  preview: string;
}

export default new Vuex.Store<State>({
  state: {
    content: "",
    preview: "<h1>Preview</h1>"
  },
  mutations: {
    updateContent(state, content: string) {
      state.content = content;
    },
    updatePreview(state, previewContent: string) {
      state.preview = previewContent;
    }
  },
  actions: {
    updateContent({ commit }, content) {
      commit("updateContent", content);
    },
    updatePreview({ commit }, previewContent) {
      commit("updatePreview", previewContent);
    }
  }
});
