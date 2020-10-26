/* eslint-disable */
// 用于管理请求各种接口地址的
import Network from "./network";
// 获取banner
export const getBanner = () => Network.get("banner?type=2");
// 获取推荐歌单
export const getPersonalized = () => Network.get("personalized?limit=6");
// 获取推荐最新专辑
export const getAlbum = () => Network.get("album/newest");
// 获取推荐最新音乐
export const getNewSong = () => Network.get("personalized/newsong");
// 获取歌单详情
export const getPlayList = data => Network.get("playlist/detail", data);
// 获取专辑歌曲
export const getAlbumSong = data => Network.get("album", data);
// 获取歌曲详情
export const getSongDetail = data => Network.get("song/detail", data);
// 获取歌词
export const getSongLyric = data => Network.get("lyric", data);
// 获取音乐url
export const getSongUrl = data => Network.get("song/url", data);
// 获取歌手单曲
export const getArtistsSongs = data => Network.get("artists", data);
// 获取热门歌手信息(数组)
export const getHotArtists = () => {
  return new Promise(function(resolve, reject) {
    Network.get("top/artists?offset=0&limit=10")
      .then(function(result) {
        resolve(result.artists);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
// 获取分类歌手信息(数组)
export const getLetterArtists = letter => {
  return new Promise(function(resolve, reject) {
    let lettersArtists = [];
    Network.all([
      Network.get(
        `artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`
      ),
      Network.get(
        `artist/list?offset=0&limit=5&type=2&area=7&initial=${letter}`
      ),
      Network.get(
        `artist/list?offset=0&limit=5&type=1&area=96&initial=${letter}`
      ),
      Network.get(
        `artist/list?offset=0&limit=5&type=2&area=96&initial=${letter}`
      ),
      Network.get(
        `artist/list?offset=0&limit=5&type=1&area=16&initial=${letter}`
      ),
      Network.get(
        `artist/list?offset=0&limit=5&type=2&area=16&initial=${letter}`
      )
    ])
      .then(function(result) {
        result.forEach(item => {
          lettersArtists.push(...item.artists);
        });
        // console.log(lettersArtists);
        resolve(lettersArtists);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
// 将热门歌手、分类歌手信息全部封装到一个数组中使用，A-Z也需要push到一个数组中
export const getAllArtists = letter => {
  return new Promise(function(resolve, reject) {
    let keys = ["热"];
    let list = [getHotArtists()];
    for (let i = 65; i < 91; i++) {
      let char = String.fromCharCode(i);
      // console.log(char);
      keys.push(char);
      // 根据遍历的A-Z参数来获取分类歌手信息
      list.push(getLetterArtists(char));
    }
    Network.all(list)
      .then(function(result) {
        let obj = {};
        obj.keys = keys;
        obj.list = result;
        resolve(obj);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
