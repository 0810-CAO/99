let myName = 'lnj';
function say(name, age) {
    console.log(`name is ${name}, age is ${age}`);
}
class Person {
    name = 'lnj';
    age = 34;
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    say(){
        console.log(`name is ${this.name}, age is ${this.age}`);
    }
}