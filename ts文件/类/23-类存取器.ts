/*
1.什么是存取器?
通过getters/setters来截取对对象成员的访问 进一步控制对象成员数据的安全性
* */
class Person05 {
    private _age:number = 0;
    set age(val:number){
        console.log('进入了set age方法');
        if(val<0){
            throw new Error('人的年龄不能小于零');
        }
        this._age = val;
    }
    get age():number{
        console.log('进入了get age方法');
        return this._age;
    }
}
let p = new Person05();
p.age = 21;
// p.age = -6; // p.age(-6);
console.log(p.age);
