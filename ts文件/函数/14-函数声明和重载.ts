// TS函数完整格式
// 在TS中函数的完整格式应该是由函数的定义和实现两个部分组成的
// 定义一个函数

// let AddFun:(a:number, b:number)=>number;
// // 根据定义实现函数
// AddFun = function (x:number, y:number):number {
//     return x + y;
// };
// let res = AddFun(10, 20);
// console.log(res);

// 一步到位写法
// let AddFun:(a:number, b:number)=>number =
// function (x:number, y:number):number {
//     return x + y;
// };
// let res = AddFun(20, 20);
// console.log(res);


// 根据函数的定义自动推导对应的数据类型
// let AddFun:(a:number, b:number)=>number =
//     function (x, y) {
//         return x + y;
//     };
// let res = AddFun(20, 20);
// console.log(res);

// TS函数声明
// 先声明一个函数
// type AddFun = (a:number, b:number)=>number;
// // 再根据声明去实现这个函数
// // let add:AddFun = function (x:number, y:number):number {
// //     return x + y;
// // };
// let add:AddFun = function (x, y) {
//     return x + y;
// };
// let res = add(30, 20);
// console.log(res);

// TS函数重载
// 函数的重载就是同名的函数可以根据不同的参数实现不同的功能
// function getArray(x:number):number[] {
//   let arr = [];
//   for(let i = 0; i <= x; i++){
//       arr.push(i);
//   }
//   return arr;
// }
// function getArray(str:string):string[] {
//   return str.split('');
// }

// 定义函数的重载
// function getArray(x:number):number[];
// function getArray(str:string):string[];
// // 实现函数的重载
// function getArray(value:any):any[] {
//     if(typeof value === 'string'){
//         return value.split('');
//     }else{
//         let arr = [];
//         for(let i = 0; i <= value; i++){
//             arr.push(i);
//         }
//         return arr;
//     }
// }
// // let res = getArray(10);
// let res = getArray('www.5260.site');
// console.log(res);
