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
// 榜单信息
export const getTopListDetail = () => {
  return new Promise(function(resolve, reject) {
    let category = {
      officialList: [
        { name: "云音乐飙升榜", id: 19723756 },
        { name: "云音乐新歌榜", id: 3779629 },
        { name: "网易原创歌曲榜", id: 2884035 },
        { name: "云音乐热歌榜", id: 3778678 }
      ],
      recList: [
        { name: "云音乐说唱榜", id: 5213356842 },
        { name: "云音乐电音榜", id: 1978921795 },
        { name: "云音乐欧美新歌榜", id: 2809577409 },
        { name: "抖音排行榜", id: 2250011882 },
        { name: "云音乐ACG音乐榜", id: 71385702 },
        { name: "云音乐古典音乐榜", id: 71384707 }
      ],
      globalList: [
        { name: "美国Billboard周榜", id: 60198 },
        { name: "UK排行榜周榜", id: 180106 },
        { name: "Beatport全球电子舞曲榜", id: 3812895 },
        { name: "日本Oricon周榜", id: 60131 },
        { name: "iTunes榜", id: 11641012 },
        { name: "英国Q杂志中文版周榜", id: 2023401535 }
      ],
      otherList: [
        { name: "KTV唛榜", id: 21845217 },
        { name: "法国 NRJ Vos Hits 周榜", id: 27135204 },
        { name: "新声榜", id: 2617766278 },
        { name: "云音乐韩语榜", id: 745956260 },
        { name: "电竞音乐榜", id: 2006508653 },
        { name: "云音乐欧美热歌榜", id: 2809513713 }
      ],
      titles: {
        officialList: "官方榜",
        recList: "推荐榜",
        globalList: "全球榜",
        otherList: "更多榜单"
      }
    };
    Network.get("toplist/detail")
      .then(function(data) {
        data.list.forEach(function(obj) {
          let flag = false;
          for (let key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].rank = obj;
                flag = true;
                break;
              }
            }
            if (flag) {
              break;
            }
          }
        });
        resolve(category);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
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
