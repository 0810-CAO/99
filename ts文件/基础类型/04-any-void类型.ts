// any类型
// any表示任意类型, 当我们不清楚某个值的具体类型的时候我们就可以使用any
// 一般用于定义一些通用性比较强的变量, 或者用于保存从其它框架中获取的不确定类型的值
// 在TS中任何数据类型的值都可以负责给any类型
// let value:any; // 定义了一个可以保存任意类型数据的变量
// value = 123;
// value = "abc";
// value = true;
// value = [1, 3, 5];

// void类型
// void与any正好相反, 表示没有任何类型, 一般用于函数返回值
// 在TS中只有null和undefined可以赋值给void类型
// function test():void {
//   console.log("hello world");
// }
// test();

let value:void; // 定义了一个不可以保存任意类型数据的变量, 只能保存null和undefined
// value = 123; // 报错
// value = "abc";// 报错
// value = true;// 报错
// 注意点: null和undefined是所有类型的子类型, 所以我们可以将null和undefined赋值给任意类型
value = null; // 不会报错
// value = undefined;// 不会报错