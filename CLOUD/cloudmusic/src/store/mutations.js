import { SET_FULL_SCREEN } from "./mutations-type";
export default {
  // changeFullScreen(state, flag) {
  //   state.isFullScreen = flag;
  // }
  // 注意需要使用[]来使用
  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag;
  }
};
