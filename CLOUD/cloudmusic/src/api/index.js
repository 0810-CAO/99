/* eslint-disable */
// 用于管理请求各种接口地址的
import Network from './network'
// 获取banner
export const getBanner = () => Network.get('banner?type=2')
// 获取推荐歌单
export const getPersonalized = () => Network.get('personalized?limit=6')
// 获取推荐最新专辑
export const getAlbum = () => Network.get('album/newest')
// 获取推荐最新音乐
export const getNewSong = () => Network.get('personalized/newsong')
// 获取歌单详情
export const getPlayList = (data) => Network.get('playlist/detail',data)
// 获取专辑歌曲
export const getAlbumSong = (data) => Network.get('album',data)
// export const getAlbum = (data) => Network.get('album', data)