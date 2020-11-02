var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    Validation.LettersValidator = function (value) {
        return lettersRegexp.test(value);
    };
})(Validation || (Validation = {}));
/*
1.什么是命名空间?
命名空间可以看做是一个微型模块,
当我们先把相关的业务代码写在一起, 又不想污染全局空间的时候, 我们就可以使用命名空间
本质就是定义一个大对象, 把变量/方法/类/接口...的都放里面

2.命名空间和模块区别
在程序内部使用的代码, 可以使用命名空间封装和防止全局污染
在程序内部外部使用的代码, 可以使用模块封装和防止全局污染
总结: 由于模块也能实现相同的功能, 所以大部分情况下用模块即可
* */
// namespace Validation {
//     const lettersRegexp = /^[A-Za-z]+$/;
//     export const LettersValidator  = (value) =>{
//         return lettersRegexp.test(value);
//     }
// }
/// <reference path="./56/test.ts" />
console.log(Validation.LettersValidator('abc'));
console.log(Validation.LettersValidator(123));
