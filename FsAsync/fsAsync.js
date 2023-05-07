const fs = require("fs")

// write file
fs.writeFile("readfile.txt", "today is awesome day", (err) =>{
        console.log("succesfully file created")
        console.log("error : ", err)
})

// append file
fs.appendFile("readfile.txt", "i am rohit bhure from indore, india", (err) => {
    console.log(" task completed // error : ", err)
})

// readfile
fs.readFile("readfile.txt", "utf-8", (err, data) =>{
    console.log(data)
    console.log(err)
})