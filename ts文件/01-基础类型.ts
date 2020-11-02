/* TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用*/
// 数值类型 number
let val1:number; // 定义了一个名称叫做val1的变量, 这个变量中将来只能存储数值类型的数据
val1 = 123;
// val1 = "123"; // 会报错
// 注意点: 其它的用法和JS一样
// val1 = 0x11;
// val1 = 0o11;
// val1 = 0b11;
// console.log(val1);

// 布尔类型 boolean
let val2:boolean;
val2 = true;
// val2 = 1; // 会报错
// console.log(val2);

// 字符串类型 string
let val3:string;
val3 = "123";
val3 = `val1=${val1}, val2==${val2}`;
// console.log(val3);