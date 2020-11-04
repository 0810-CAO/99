// let val;
// val = 123;
// val = "123";
// val = true;
// val = [1, 3, 5];
// /*
// 注意点:
// 由于JS是弱类型的, 所以只要定义了一个变量, 就可以往这个变量中存储任意类型的数据
// 也正是因为如此, 所以会给我们带来一个问题
// * */
// function test(a, b) { // 期望a是一个数组, b是一个数值
//     return a.length + b;
// }
// // let res = test([1, 3, 5], 10);
// let res = test(1, 10);
// console.log(res);