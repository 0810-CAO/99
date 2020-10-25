import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CUR_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from "./mutations-type";
export default {
  // changeFullScreen(state, flag) {
  //   state.isFullScreen = flag;
  // }
  // 注意需要使用[]来使用
  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag;
    // 判断三个界面共存的问题
    if (flag) {
      state.isShowListPlayer = false;
      state.isShowMiniPlayer = false;
    }
  },
  [SET_MINI_PLAYER](state, flag) {
    state.isShowMiniPlayer = flag;
    if (flag) {
      state.isShowListPlayer = false;
      state.isFullScreen = false;
    }
  },
  [SET_LIST_PLAYER](state, flag) {
    state.isShowListPlayer = flag;
  },
  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag;
  },
  [SET_MODE_TYPE](state, flag) {
    state.modeType = flag;
  },
  [SET_SONG_DETAIL](state, list) {
    state.songs = list;
  },
  [SET_SONG_LYRIC](state, lyric) {
    state.currentLyric = lyric;
  },
  // 设计成如果出入index则删除固定数据，不传则删除全部
  [SET_DEL_SONG](state, index) {
    if (index !== undefined) {
      state.songs.splice(index, 1);
    } else {
      state.songs = [];
    }
    // 解决播放歌曲在列表后而删除前面的歌曲
    if (index < state.currentIndex) {
      state.currentIndex = state.currentIndex - 1;
    }
    // 如果删除全部,则需要关闭播放/mini/list界面
    if (state.songs.length === 0) {
      state.isFullScreen = false;
      state.isShowMiniPlayer = false;
      state.isShowListPlayer = false;
    }
  },
  [SET_CURRENT_INDEX](state, index) {
    if (index < 0) {
      index = state.songs.length - 1;
    } else if (index > state.songs.length - 1) {
      index = 0;
    }
    state.currentIndex = index;
  },
  [SET_CUR_TIME](state, time) {
    state.curTime = time;
  },
  [SET_FAVORITE_SONG](state, song) {
    let result = state.favoriteList.find(function(currentValue) {
      return currentValue.id === song.id;
    });
    if (result === undefined) {
      state.favoriteList.push(song);
    }
  },
  // 保存favorite的本地缓存
  [SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list;
  },
  [SET_HISTORY_SONG](state, song) {
    let result = state.historyList.find(function(currentValue) {
      return currentValue.id === song.id;
    });
    if (result === undefined) {
      if (state.historyList.length > 30) {
        state.historyList.splice(0, 1);
      }
      state.historyList.push(song);
    }
  },
  [SET_HISTORY_LIST](state, list) {
    state.historyList = list;
  }
};
