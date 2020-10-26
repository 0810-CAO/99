/* eslint-disable */
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.timeout = 10000;
export default {
  get: function(path = "", data = {}) {
    return new Promise(function(resolve, reject) {
      axios
        .get(path, {
          params: data
        })
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  post: function(path = "", data = {}) {
    return new Promise(function(resolve, reject) {
      axios
        .post(path, data)
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  // 并发请求
  all: function(list) {
    return new Promise(function(resolve, reject) {
      axios
        .all(list)
        .then(
          axios.spread(function(...result) {
            // 两个请求现在都执行完成
            resolve(result);
          })
        )
        .catch(function(err) {
          reject(err);
        });
    });
  }
};
