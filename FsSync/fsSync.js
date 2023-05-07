// fs module 

const fs = require('fs')

// ======================================

// read file 

const a = fs.readFileSync('node.txt', 'utf8') // readfilesync blocking i/o modle
console.log(a.toString())

console.log("Finished Reading file")

// =======================================

// write file

const b = fs.writeFileSync('file2.txt', 'this is data 2 :)')
console.log(b)

// ========================================

// append file

const c = fs.appendFileSync('file2.txt', ' this is append data')
console.log(c)

// =========================================

// new data type buf data
// buffer is mainly used to store binary data

const buf_data = fs.readFileSync('file2.txt')
// this is called buf data 
console.log(buf_data)

org_data = buf_data.toString()
// conver buf data to string
console.log(org_data)

// ==========================================

// rename 

fs.renameSync('oldfile.txt', 'newfile.txt')