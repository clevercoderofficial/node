const fs = require('fs')

// fs.readFile('node.txt', 'utf8', (err, data)=>{ // readfile non blocking i/o modle
//     console.log(err, data)
// })

const a = fs.readFileSync('node.txt', 'utf8') // readfilesync blocking i/o modle
console.log(a.toString()) 

// fs.writeFile('file.txt', 'this is a data', ()=>{
//     console.log("written to the file")
// })

const b = fs.writeFileSync('file2.txt', 'this is data 2 :)')
console.log(b)


console.log("Finished Reading file")