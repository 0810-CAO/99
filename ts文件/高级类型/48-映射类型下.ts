// Pick映射类型
// 将原有类型中的部分内容映射到新类型中
interface TestInterface {
  name: string,
  age: number
}
type MyType001 = Pick<TestInterface, 'name'>//name:string


// Record映射类型
// 他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
type Animal = 'person' | 'dog' | 'cat';
interface TestInterface {
  name: string;
  age: number;
}
type MyType1 = Record<Animal, TestInterface>
//person: TestInterface;
//dog: TestInterface;
//cat: TestInterface;

let res: MyType1 = {
  person: {
    name: 'zs',
    age: 18
  },
  dog: {
    name: 'ls',
    age: 14
  },
  cat: {
    name: 'ww',
    age: 16
  }
}






