function orderfood(){
    return new Promise((resolve , reject) =>{
        setTimeout(()=>{
            let success = true
            if(success){
                resolve('food is ready')
            } else {
                reject('food is not ready')
            }
        },2000)
    })
}

async function getfood(){
    try {
        let response = await orderfood()
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}

getfood()