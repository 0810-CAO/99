// 设置播放模式类型
import mode from "./modeType";
export default {
  // 全局播放界面(可切换至歌词)
  isFullScreen: false,
  // 底部迷你播放
  isShowMiniPlayer: false,
  // 播放列表
  isShowListPlayer: false,
  // 播放
  isPlaying: false,
  // 播放模式
  modeType: mode.loop,
  // 全部歌曲信息
  songs: [],
  // 当前播放歌曲
  currentSong: {},
  // 当前播放歌曲下标
  currentIndex: 0,
  // 当前播放歌曲歌词
  currentLyric: {},
  // 当前播放歌曲播放位置
  curTime: 0,
  // 收藏歌曲数组
  favoriteList: [],
  // 播放历史
  historyList: []
};
