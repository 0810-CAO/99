// 函数接口
// 我们除了可以通过接口来限定对象以外, 我们还可以使用接口来限定函数
// interface SumInterface {
//   (a:number, b:number):number //传入两个number类型值，返回number类型值
// }
// let sum:SumInterface = function (x:number, y:number):number {
//   return x + y;
// }
// let res = sum(10, 20);
// console.log(res);

// 混合类型接口
// 约定的内容中既有对象属性, 又有函数
// 要求定义一个函数实现变量累加
// let count = 0; // 会污染全局空间
// function demo() {
//     count++;
//     console.log(count);
// }
// demo();
// demo();
// demo();

// let demo = (()=>{ // 使用闭包确实可以解决污染全局空间的问题, 但是对于初学者来说不太友好
//   let count = 0;
//   return ()=>{
//       count++;
//       console.log(count);
//   }
// })();
// demo();
// demo();
// demo();
// 在JS中函数的本质是什么? 就是一个对象
// let demo = function () {
//     demo.count++;
// }
// demo.count = 0;
// demo();
// demo();
// demo();
interface CountInterface {
  ():void
  count:number
}
let getCounter = (function ():CountInterface {
  /*
  CountInterface接口要求数据既要是一个没有参数没有返回值的函数
                            又要是一个拥有count属性的对象
  fn作为函数的时候符合接口中函数接口的限定 ():void
  fn作为对象的时候符合接口中对象属性的限定  count:number
  * */
  let fn = <CountInterface>function () {
      fn.count++;
      console.log(fn.count);
  }
  fn.count = 0;
  return fn;
})();
getCounter();
getCounter();
getCounter();
