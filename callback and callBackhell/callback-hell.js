const fs = require('fs')

fs.readFile("input.txt", "utf8", (err,data)=>{
    if(err){
        console.log("getting error")
        return
    }
    const modifydata = data.toUpperCase()
    fs.writeFile("output.txt", "utf8", (err,data)=>{
        if(err){
            console.log("getting error")
            return
        }
        console.log("data written to file")
    })
    fs.readFile("output.txt", "utf8", (err,data)=>{
        if(err){
            console.log("getting error in reading file")
            return
        }
        console.log("file readed")
    })
})