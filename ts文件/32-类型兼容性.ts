// 基本兼容性
/*
interface TestInterface {
    name:string;
}

let p1 = {name:'lnj'};
let p2 = {age:18};
let p3 = {name:'lnj', age:18};

let t:TestInterface;
t = p1;
t = p2;
t = p3; // 可多不可少
 */
/*
interface TestInterface {
    name:string;
    children:{
        age:number
    };
}

let p1 = {name:'lnj', children:{age:18}};
let p2 = {name:'lnj',children:{age:'abc'}};

let t:TestInterface;
t = p1;
t = p2; // 会递归检查
 */