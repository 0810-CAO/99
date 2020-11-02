/*
1.访问器装饰器
- 访问器装饰器声明在一个访问器的声明之前（紧靠着访问器声明）。
访问器装饰器应用于访问器的 属性描述符并且可以用来监视，修改或替换一个访问器的定义

- 访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    + 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    + 成员的名字。
    + 成员的属性描述符。

- 注意: 
TypeScript不允许同时装饰一个成员的get和set访问器。
取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上
* */
function test(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // console.log(target);
    // console.log(propertyKey);
    // console.log(descriptor);
    descriptor.set = (value:string)=>{
        target.myName = value;
    }
    descriptor.get = ():string=>{
        return target.myName;
    }
}
class Person {
    private _name:string; // lnj
    constructor(name:string){
        this._name = name;
    }
    @test
    get name():string{
        return this._name;
    }
    set name(value:string){
        this._name = value;
    }
    
}
let p = new Person('lnj');
p.name = 'zs';
console.log(p.name);
console.log(p);

