function fetchdata(callback){
    setTimeout(()=>{
        console.log('fetch data')
        callback()
    }, 2000)
}

function processdata(){
    console.log('processing data')
}

fetchdata(processdata)