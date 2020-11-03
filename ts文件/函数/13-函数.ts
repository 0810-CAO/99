// TS中的函数
// TS中的函数大部分和JS相同
/*
// 命名函数
function say1(name) {
    console.log(name);
}
// 匿名函数
let say2 = function (name) {
    console.log(name);
}
// 箭头函数
let say3 = (name) => {
    console.log(name);
}
 */
// 命名函数
function say1(name:string):void {
    console.log(name);
}
// 匿名函数
let say2 = function (name:string):void {
    console.log(name);
}
// 箭头函数
let say3 = (name:string):void =>{
    console.log(name);
}
