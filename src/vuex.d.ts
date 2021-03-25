import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;

  interface State {
    contents: string;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
