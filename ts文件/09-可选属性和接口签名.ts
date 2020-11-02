// 定义一个接口
interface FullName{
  firstName:string
  lastName:string
  middleName?:string //可选属性
  [propName:string]:any //索引签名
}
// 需求: 如果传递了middleName就输出完整名称, 如果没有传递middleName, 那么就输出firstName和lastName
function say1({firstName, lastName, middleName}:FullName):void {
  // console.log(`我的姓名是:${firstName}_${lastName}`);
  if(middleName){
      console.log(`我的姓名是:${firstName}_${middleName}_${lastName}`);
  }else{
      console.log(`我的姓名是:${firstName}_${lastName}`);
  }
}
// 注意点: 如果使用接口来限定了变量或者形参, 那么在给变量或者形参赋值的时候,
// 赋予的值就必须和接口限定的一模一样才可以, 多一个或者少一个都不行
// say1({firstName:'Jonathan'});
// say1({firstName:'Jonathan', lastName:'Lee', middleName:"666"});

// 注意点: 但是在企业开发中可以多一个也可能少一个
// 少一个或少多个怎么做? 可选属性
// say1({firstName:'Jonathan', lastName:'Lee', middleName:"666"});
// say1({firstName:'Jonathan', lastName:'Lee'});

// 多一个或者多多个怎么做? 如果绕开TS检查
// 方式一: 使用类型断言
// say1({firstName:'Jonathan', lastName:'Lee', middleName:"666", abc:'abc'} as FullName);
// 方式二: 使用变量
// let obj1 = {firstName:'Jonathan', lastName:'Lee', middleName:"666", abc:'abc'};
// say1(obj1);
// 方式三: 使用索引签名
// say1({firstName:'Jonathan', lastName:'Lee', middleName:"666", abc:'abc', 123:123, def:"def"});