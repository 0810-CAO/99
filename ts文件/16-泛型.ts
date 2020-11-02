/*
1.什么是泛型?
- 在编写代码的时候我们既要考虑代码的健壮性, 又要考虑代码的灵活性和可重用性
通过TS的静态检测能让我们编写的代码变得更加健壮, 但是在变得健壮的同时却丢失了灵活性和可重用性
所以为了解决这个问题TS推出了泛型的概念
- 通过泛型不仅可以让我们的代码变得更加健壮, 还能让我们的代码在变得健壮的同时保持灵活性和可重用性
* */
// 需求: 定义一个创建数组的方法, 可以创建出指定长度的数组, 并且可以用任意指定的内容填充这个数组
/*
let getArray = (value:number, items:number = 5):number[]=>{
    return new Array(items).fill(value);
};
// let arr = getArray(6, 3);
let arr = getArray("abc", 3); // 报错
console.log(arr);
 */
/*
let getArray = (value:any, items:number = 5):any[]=>{
    return new Array(items).fill(value);
};
// let arr = getArray("abc", 3);
let arr = getArray(6, 3);
// console.log(arr);
// 当前存储的问题:
// 1.编写代码没有提示, 因为TS的静态检测不知道具体是什么类型
// 2.哪怕代码写错了也不会报错, 因为TS的静态检测不知道具体是什么类型
let res = arr.map(item=>item.length); // ['abc', 'abc', 'abc'] => [3, 3, 3]
console.log(res);
 */

// 需求:要有代码提示, 如果写错了要在编译的时候报错
let getArray = <T>(value:T, items:number = 5):T[]=>{
    return new Array(items).fill(value);
};
// let arr = getArray<string>('abc');
// let arr = getArray<number>(6);
// 注意点: 泛型具体的类型可以不指定
//         如果没有指定, 那么就会根据我们传递的泛型参数自动推导出来
let arr = getArray('abc');
// let arr = getArray(6);
let res = arr.map(item=>item.length);
console.log(res);