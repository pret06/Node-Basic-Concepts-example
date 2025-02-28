//Scenario: A train arrives at a station, and an announcement is made! 

const eventEmitter = require('events')
const station = new eventEmitter()

station.on('train Arrived', (train)=>{
    console.log(`train ${train} has arrived`)
    console.log('Please board the platform')
})

setTimeout(()=>{
    station.emit('train Arrived', 'express 101')
}, 3000)

