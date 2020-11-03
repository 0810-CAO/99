// <reference path="./72-命名空间补充.ts" />
// console.log(Validation.LettersValidator('abc')); // true
// console.log(Validation.LettersValidator(123)); // false
// console.log("hello word")
function getLength(value:(string | null | undefined)) {
  value = 'abc';
  return ()=>{
      // return value.length; // 报错
      // return (value || '').length;
      // return (value as string).length;
      // 我们可以使用!来去除null和undefined
      // !的含义就是这个变量一定不是null和undefined
      return value!.length;
  }
}
let fn = getLength('www.5260.site');
let res = fn();
console.log(res);