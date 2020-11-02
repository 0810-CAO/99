// 数字枚举与数值兼容
/*
enum Gender{
    Male,
    Female
}
let value:Gender;
value = Gender.Male;
value = 1
 */

// 数字枚举与数字枚举不兼容
/*
enum Gender{
    Male, // 0
    Female // 1
}
enum Animal{
    Dog, // 0
    Cat // 1
}
let value:Gender;
value = Gender.Male;
value = Animal.Dog; // 报错
*/

// 字符串枚举与字符串不兼容
/*
enum Gender{
    Male = 'abc',
    Female  = 'def'
}
let value:Gender;
value = Gender.Male;
value = 'abc';
 */