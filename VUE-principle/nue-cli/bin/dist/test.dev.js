"use strict";

// function demo(a, b) {
//   return a + b
// }
// let res = demo(12, 13)
// console.log(res)
function demo(a) {
  return function (b) {
    return a + b;
  };
} // let res = demo(12)
// let res2 = res(20)
// console.log(res2)


var res = demo(10)(20);
console.log(res);