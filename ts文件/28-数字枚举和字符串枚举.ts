// TS中支持两种枚举, 一种是数字枚举, 一种是字符串枚举
// 1.数字枚举
// 默认情况下就是数字枚举
/*
enum Gender{
    Male,
    Female
}
console.log(Gender.Male);
console.log(Gender.Female);
 */

// 2.数字枚举注意点
/*
// 数字枚举的取值默认从0开始递增
// 数字枚举的取值可以是字面量, 也可以是常量, 也可以是计算的结果
const num = 666;
function getNum() {
    return 888;
}
enum Gender{
    // Male = 6,
    // Male = num, // 注意点: 如果使用常量给前面的枚举值赋值了, 那么后面的枚举值也需要手动的赋值
    // Female = 8
    Male = getNum(), // 注意点: 如果使用计算结果给前面的枚举值赋值了, 那么后面的枚举值也需要手动的赋值
    Female = 123
}
*/

//3.枚举反向映射
/*
// 可以根据枚举值获取到原始值
// 也可以根据原始值获取到枚举值
enum Gender{
    Male,
    Female
}
console.log(Gender.Male); // 0
console.log(Gender[0]); // Male
 */


// 4.字符串枚举
/*
enum Gender{
    Male = 'www.it666.com',
    Female = 'www.itzb.com' // 注意点: 如果使用字符串给前面的枚举值赋值了, 那么后面的枚举值也必须手动赋值
}
console.log(Gender.Male);
console.log(Gender.Female);
*/

// 5.字符串枚举注意点
/*
// 注意点: 如果使用字符串给前面的枚举值赋值了, 那么后面的枚举值也必须手动赋值
// 注意点: 和数字枚举不一样, 字符串枚举不能使用常量或者计算结果给枚举值赋值
// 注意点: 虽然字符串枚举不能够使用常量或者计算结果给枚举值赋值, 但是它可以使用内部的其它枚举值来赋值
const str = 'lnj';
function getStr() {
    return 'abc';
}
enum Gender{
    Male = 'www.it666.com',
    // Male = str,
    // Male = getStr(),
    Female = 'www.itzb.com',
    Yao = Female
}
console.log(Gender.Female);
console.log(Gender.Yao);
*/


// 6.异构枚举
// 枚举中既包含数字又包含字符串, 我们就称之为异构枚举
enum Gender{
    Male = 6,
    Female = 'nv'
}

console.log(Gender.Male);
console.log(Gender.Female);
console.log(Gender[6]);
// 注意点: 如果是字符串枚举, 那么无法通过原始值获取到枚举值
// console.log(Gender['nv']);
console.log(Gender);
