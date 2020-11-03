// 泛型类
class Chache<T> {
    arr:T[] = [];
    add(value:T):T{
        this.arr.push(value);
        return value;
    }
    all():T[]{
        return this.arr;
    }
}
let chache = new Chache<number>();
chache.add(1);
chache.add(2);
chache.add(3);
console.log(chache.all());
