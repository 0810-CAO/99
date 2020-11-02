// 去除 null或 undefined检测
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
let fn = getLength('www.it66.com');
let res = fn();
console.log(res);