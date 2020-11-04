/*
和ES6迭代器一样
for...of
从零玩转JavaScript核心+新特性③
140-JavaScript-数组高级API上(掌握)
从零玩转JS新特性+流行框架⑥
34-Iterator接口(掌握)
35-Iterator接口应用场景(掌握)
* */
let someArray = [1, "string", false];
for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}
/*
生成器
当生成目标为ES5或ES3，迭代器只允许在Array类型上使用。
在非数组值上使用 for..of语句会得到一个错误，
就算这些非数组值已经实现了Symbol.iterator属性。
为了解决这个问题, 编译器会生成一个简单的for循环做为for..of循环
* */