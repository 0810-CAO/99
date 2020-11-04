let myName = 'ccx';
function say(name, age) {
    console.log(`name is ${name}, age is ${age}`);
}
class Person {
    name = 'ccx';
    age = 21;
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    say(){
        console.log(`name is ${this.name}, age is ${this.age}`);
    }
}