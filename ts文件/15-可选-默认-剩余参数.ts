// 可选参数
// 需求: 要求定义一个函数可以实现2个数或者3个数的加法
/*
function add(x:number, y:number, z?:number):number {
    return x + y + (z ? z : 0);
}
// let res = add(10, 20);
let res = add(10, 20, 30);
console.log(res);
 */
/*
// 可选参数可以配置函数重载一起使用, 这样可以让函数重载变得更加强大
function add(x:number, y:number):number;
function add(x:number, y:number, z:number):number;
function add(x:number, y:number, z?:number) {
    return x + y + (z ? z : 0);
}
let res = add(10, 20, 30);
console.log(res);
*/
/*
function add(x:number, y?:number, z?:number):number {
// function add(x:number, y?:number, z:number):number { // 可选参数后面只能跟可选参数
    return x + (y ? y : 0) + (z ? z : 0);
}
// let res = add(10); // 可选参数可以是一个或多个
console.log(res);
*/

// 默认参数
// 详见"从零玩转JavaScript核心+新特性③"
// 88-JavaScript-函数形参默认值-ES6(掌握)
/*
function add(x:number, y:number=10):number {
    return x + y;
}
// let res = add(10);
let res = add(10, 30);
console.log(res);
*/

// 剩余参数
// 详见"从零玩转JavaScript核心+新特性③"
// 87-JavaScript-函数扩展运算符-ES6(掌握)
/*
function add(x:number, ...ags:number[]) {
    console.log(x);
    console.log(ags);
}
add(10, 20, 30, 40, 50)
 */