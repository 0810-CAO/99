// 1.枚举成员类型
// 我们就可以把枚举成员当做类型来使用
/*
enum Gender{
    Male = 'www.it666.com',
    Female = 'www.itzb.com'
}
interface TestInterface {
    age: Gender.Male
}
class Person implements TestInterface{
    age: Gender.Male
    // age: Gender.Female // 由于类型不匹配, 所以会报错
    // age: 0 // 注意点: 由于数字枚举的本质就是数值, 所以这里写一个数值也不会报错

    // age: Gender.Male
    // age: Gender.Female
    // age: 'www.it666.com' // 注意点: 如果是字符串枚举, 那么只能是枚举成员的值, 不能是其它的值
    // age: string
}
*/


// 2.联合枚举类型
// 2.1什么是联合类型?
// 联合类型就是将多种数据类型通过|连接起来
// 我们可以把枚举类型当做一个联合类型来使用

/*
let value:(number | string); // (number | string)联合类型
value = 1;
value = 6;
value = "123";
 */

enum Gender{
    Male ,
    Female
}
interface TestInterface {
    age: Gender // age: (Gender.Male | Gender.Female)
}
class Person implements TestInterface{
    // age: Gender.Male
    age: Gender.Female
}