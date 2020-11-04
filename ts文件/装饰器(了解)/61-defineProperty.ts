/*
Object.defineProperty()
可以直接在一个对象上定义一个新属性，
或者修改一个对象的现有属性，并返回此对象。
* */
// 定义一个新的属性
/*
let obj = {age:21};
Object.defineProperty(obj, 'name', {
    value:'ccx'
});
console.log(obj);
 */

// 修改原有属性
/*
let obj = {age:18};
Object.defineProperty(obj, 'age', {
    value:21
});
console.log(obj);
 */

// 修改属性配置-读写
/*
let obj = {age:18};
Object.defineProperty(obj, 'age', {
    writable:false//非可读可写
})
obj.age = 34;
console.log(obj.age);
 */


// 修改属性配置-迭代
/*
let obj = {age:21, name:'ccx'};
Object.defineProperty(obj, 'name', {
    enumerable: false//不可迭代
})
for(let key in obj){
    console.log(key);
}
 */

// 修改属性配置-配置
let obj = { age: 21, name: 'ccx' };
Object.defineProperty(obj, 'name', {
  enumerable: false,
  configurable: false//配置完后就不能再次配置
});
Object.defineProperty(obj, 'name', {
  enumerable: true,
  configurable: false
});
for (let key in obj) {
  console.log(key);
}
