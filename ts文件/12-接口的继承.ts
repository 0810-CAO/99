// 接口的继承
// TS中的接口和JS中的类一样是可以继承的
interface LengthInterface {
    length:number
}
interface WidthInterface {
    width:number
}
interface HeightInterface {
    height:number
}
interface RectInterface extends LengthInterface,WidthInterface,HeightInterface {
    // length:number
    // width:number
    // height:number
    color:string
}
let rect:RectInterface = {
    length:10,
    width:20,
    height:30,
    color:'red'
}

