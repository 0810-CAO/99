// 可选属性
// 和接口中的可选属性一样, 可传可不传的属性
class Person02 {
  // 注意点: 在TS中如果定义了实例属性, 那么就必须在构造函数中使用, 否则就会报错
  name: string;
  age?: number; // 可选属性
  constructor(name: string, age?: number) {
    this.name = name;
    this.age = age;
  }
  setNameAndAge(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
let p02 = new Person02('cao');
console.log(p02);

// 参数属性
// 一句话搞定实例属性的接收和定义

/*
class Person {
    name:string;
    age:number;
    constructor(name:string, age:number){
        this.name = name;
        this.age = age;
    }
}
* */
class Person01 { //简化上方的代码
  constructor(public name: string, public age: number) {
  }
}
let p03 = new Person01('cao', 21);
console.log(p03);