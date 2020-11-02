/*
枚举类型是TS为JS扩展的一种类型, 在原生的JS中是没有枚举类型的
枚举用于表示固定的几个取值
*/
enum Gender{ // 定义了一个名称叫做Gender的枚举类型, 这个枚举类型的取值有两个, 分别是Male和Femal
  Male,
  Femal
}
let val:Gender; // 定义了一个名称叫做val的变量, 这个变量中只能保存Male或者Femal
val = Gender.Male;
val = Gender.Femal;
// val = 'nan'; // 报错
// val  = false;// 报错
// 注意点: TS中的枚举底层实现的本质其实就是数值类型, 所以赋值一个数值不会报错
// val = 666; // 不会报错
// console.log(Gender.Male); // 0
// console.log(Gender.Femal);// 1

// 注意点: TS中的枚举类型的取值, 默认是从上至下从0开始递增的
//         虽然默认是从0开始递增的, 但是我们也可以手动的指定枚举的取值的值
// 注意点: 如果手动指定了前面枚举值的取值, 那么后面枚举值的取值会根据前面的值来递增
// console.log(Gender.Male); // 6
// console.log(Gender.Femal);// 7

// 注意点: 如果手动指定了后面枚举值的取值, 那么前面枚举值的取值不会受到影响
// console.log(Gender.Male); // 0
// console.log(Gender.Femal);// 6

// 注意点: 我们还可以同时修改多个枚举值的取值, 如果同时修改了多个, 那么修改的是什么最后就是什么
// console.log(Gender.Male); // 8
// console.log(Gender.Femal);// 6

// 我们可以通过枚举值拿到它对应的数字
// console.log(Gender.Male); // 0
// 我们还可以通过它对应的数据拿到它的枚举值
// console.log(Gender[0]); // Male


// 探究底层实现原理
/*
var Gender;
(function (Gender) {
// Gender[key] = value;
  Gender[Gender["Male"] = 0] = "Male";
  Gender[Gender["Femal"] = 1] = "Femal";
})(Gender || (Gender = {}));

let Gender = {};
Gender["Male"] = 0;
Gender[0] = "Male";
Gender["Femal"] = 1;
Gender[1] = "Femal";
* */
