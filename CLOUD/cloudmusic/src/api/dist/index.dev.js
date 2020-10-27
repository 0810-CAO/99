"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllArtists = exports.getLetterArtists = exports.getHotArtists = exports.getTopListDetail = exports.getSearchHot = exports.getSearchList = exports.getArtistsSongs = exports.getSongUrl = exports.getSongLyric = exports.getSongDetail = exports.getAlbumSong = exports.getPlayList = exports.getNewSong = exports.getAlbum = exports.getPersonalized = exports.getBanner = void 0;

var _network = _interopRequireDefault(require("./network"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// 获取banner
var getBanner = function getBanner() {
  return _network["default"].get("banner?type=2");
}; // 获取推荐歌单


exports.getBanner = getBanner;

var getPersonalized = function getPersonalized() {
  return _network["default"].get("personalized?limit=6");
}; // 获取推荐最新专辑


exports.getPersonalized = getPersonalized;

var getAlbum = function getAlbum() {
  return _network["default"].get("album/newest");
}; // 获取推荐最新音乐


exports.getAlbum = getAlbum;

var getNewSong = function getNewSong() {
  return _network["default"].get("personalized/newsong");
}; // 获取歌单详情


exports.getNewSong = getNewSong;

var getPlayList = function getPlayList(data) {
  return _network["default"].get("playlist/detail", data);
}; // 获取专辑歌曲


exports.getPlayList = getPlayList;

var getAlbumSong = function getAlbumSong(data) {
  return _network["default"].get("album", data);
}; // 获取歌曲详情


exports.getAlbumSong = getAlbumSong;

var getSongDetail = function getSongDetail(data) {
  return _network["default"].get("song/detail", data);
}; // 获取歌词


exports.getSongDetail = getSongDetail;

var getSongLyric = function getSongLyric(data) {
  return _network["default"].get("lyric", data);
}; // 获取音乐url


exports.getSongLyric = getSongLyric;

var getSongUrl = function getSongUrl(data) {
  return _network["default"].get("song/url", data);
}; // 获取歌手单曲


exports.getSongUrl = getSongUrl;

var getArtistsSongs = function getArtistsSongs(data) {
  return _network["default"].get("artists", data);
}; // 搜索


exports.getArtistsSongs = getArtistsSongs;

var getSearchList = function getSearchList(data) {
  return _network["default"].get("search?type=1", data);
}; // 热搜


exports.getSearchList = getSearchList;

var getSearchHot = function getSearchHot(data) {
  return _network["default"].get("search/hot", data);
}; // 榜单信息


exports.getSearchHot = getSearchHot;

var getTopListDetail = function getTopListDetail() {
  return new Promise(function (resolve, reject) {
    var category = {
      officialList: [{
        name: "云音乐飙升榜",
        id: 19723756
      }, {
        name: "云音乐新歌榜",
        id: 3779629
      }, {
        name: "网易原创歌曲榜",
        id: 2884035
      }, {
        name: "云音乐热歌榜",
        id: 3778678
      }],
      recList: [{
        name: "云音乐说唱榜",
        id: 5213356842
      }, {
        name: "云音乐电音榜",
        id: 1978921795
      }, {
        name: "云音乐欧美新歌榜",
        id: 2809577409
      }, {
        name: "抖音排行榜",
        id: 2250011882
      }, {
        name: "云音乐ACG音乐榜",
        id: 71385702
      }, {
        name: "云音乐古典音乐榜",
        id: 71384707
      }],
      globalList: [{
        name: "美国Billboard周榜",
        id: 60198
      }, {
        name: "UK排行榜周榜",
        id: 180106
      }, {
        name: "Beatport全球电子舞曲榜",
        id: 3812895
      }, {
        name: "日本Oricon周榜",
        id: 60131
      }, {
        name: "iTunes榜",
        id: 11641012
      }, {
        name: "英国Q杂志中文版周榜",
        id: 2023401535
      }],
      otherList: [{
        name: "KTV唛榜",
        id: 21845217
      }, {
        name: "法国 NRJ Vos Hits 周榜",
        id: 27135204
      }, {
        name: "新声榜",
        id: 2617766278
      }, {
        name: "云音乐韩语榜",
        id: 745956260
      }, {
        name: "电竞音乐榜",
        id: 2006508653
      }, {
        name: "云音乐欧美热歌榜",
        id: 2809513713
      }],
      titles: {
        officialList: "官方榜",
        recList: "推荐榜",
        globalList: "全球榜",
        otherList: "更多榜单"
      }
    };

    _network["default"].get("toplist/detail").then(function (data) {
      data.list.forEach(function (obj) {
        var flag = false;

        for (var key in category) {
          for (var i = 0; i < category[key].length; i++) {
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
    })["catch"](function (err) {
      reject(err);
    });
  });
}; // 获取热门歌手信息(数组)


exports.getTopListDetail = getTopListDetail;

var getHotArtists = function getHotArtists() {
  return new Promise(function (resolve, reject) {
    _network["default"].get("top/artists?offset=0&limit=10").then(function (result) {
      resolve(result.artists);
    })["catch"](function (err) {
      reject(err);
    });
  });
}; // 获取分类歌手信息(数组)


exports.getHotArtists = getHotArtists;

var getLetterArtists = function getLetterArtists(letter) {
  return new Promise(function (resolve, reject) {
    var lettersArtists = [];

    _network["default"].all([_network["default"].get("artist/list?offset=0&limit=5&type=1&area=7&initial=".concat(letter)), _network["default"].get("artist/list?offset=0&limit=5&type=2&area=7&initial=".concat(letter)), _network["default"].get("artist/list?offset=0&limit=5&type=1&area=96&initial=".concat(letter)), _network["default"].get("artist/list?offset=0&limit=5&type=2&area=96&initial=".concat(letter)), _network["default"].get("artist/list?offset=0&limit=5&type=1&area=16&initial=".concat(letter)), _network["default"].get("artist/list?offset=0&limit=5&type=2&area=16&initial=".concat(letter))]).then(function (result) {
      result.forEach(function (item) {
        lettersArtists.push.apply(lettersArtists, _toConsumableArray(item.artists));
      }); // console.log(lettersArtists);

      resolve(lettersArtists);
    })["catch"](function (err) {
      reject(err);
    });
  });
}; // 将热门歌手、分类歌手信息全部封装到一个数组中使用，A-Z也需要push到一个数组中


exports.getLetterArtists = getLetterArtists;

var getAllArtists = function getAllArtists(letter) {
  return new Promise(function (resolve, reject) {
    var keys = ["热"];
    var list = [getHotArtists()];

    for (var i = 65; i < 91; i++) {
      var _char = String.fromCharCode(i); // console.log(char);


      keys.push(_char); // 根据遍历的A-Z参数来获取分类歌手信息

      list.push(getLetterArtists(_char));
    }

    _network["default"].all(list).then(function (result) {
      var obj = {};
      obj.keys = keys;
      obj.list = result;
      resolve(obj);
    })["catch"](function (err) {
      reject(err);
    });
  });
};

exports.getAllArtists = getAllArtists;