function orderfood(){
    return new Promise((resolve , reject) =>{
        setTimeout(()=>{
            let success = false
            if(success){
                resolve('food is ready')
            } else {
                reject('food is not ready')
            }
        },2000)
    })
}

orderfood()
.then(response => console.log(response))
.catch(error => console.log(error))