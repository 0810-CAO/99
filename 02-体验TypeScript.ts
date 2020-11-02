// 注意点: 由于TS并不是一门新的语言, 而是对JS的扩展, 所以我们可以在TS文件中直接编写JS代码
//         TS支持类型注解, 我们可以通过类型注解来告诉系统, 变量中将来只能存储什么类型的数据
/*
let val:number;
val = 123;
val = "123";
val = true;
val = [1, 3, 5];
 */
function test(a:any[], b:number) { // 期望a是一个数组, b是一个数值
    return a.length + b;
}
let res = test([1, 3, 5], 10);
// let res = test(1, 10); tsc 文件名编译后执行
console.log(res);