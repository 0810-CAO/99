/*
1.什么是接口类型?
和number,string,boolean,enum这些数据类型一样,
接口也是一种类型, 也是用来约束使用者的
* */
// 定义一个接口类型
interface FullName{
  firstName:string
  lastName:string
}
let obj = {
  firstName:'Cao',
  lastName:'ChengXiang'
  // lastName:18
};
// 需求: 要求定义一个函数输出一个人完整的姓名, 这个人的姓必须是字符串, 这个人的名也必须是一个字符
function say({firstName, lastName}:FullName):void {
  console.log(`我的姓名是:${firstName}_${lastName}`);
}
say(obj);