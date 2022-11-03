const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on("waterfull", () => {
  console.log("please turn off the motor!");
  setTimeout(() => {
    console.log("its a gental event please turn of the motor!");
  }, 5000); // 5 secound timer
});

console.log('The script is running')
console.log('The script is still running')

myEmitter.emit('waterfull');
