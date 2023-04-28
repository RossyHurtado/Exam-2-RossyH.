import express, {
    request,
    response
} from "express";
import {
    Server
} from "socket.io";
import cors from "cors";

//Serial Port Configuration

import {
    SerialPort,
    ReadlineParser
} from "serialport"

const protocolConfiguration = {
    path: 'COM3',
    baudRate: 9600
}
const serialPort = new SerialPort(protocolConfiguration);
const parser = serialPort.pipe(new ReadlineParser());


const PORT = 8080
const expressApp = express()
const httpServer = expressApp.listen(PORT, () => {
    console.table({
        'Game': `http://localhost:${PORT}/game`,
    })

})
const io = new Server(httpServer, {
    path: '/real-time'
})

expressApp.use('/game', express.static('public-game'))
expressApp.use(express.json())

io.on('connection', (socket) => {
    console.log('Connected!', socket.id)
    //
})

let currentScore = 0;

expressApp.get('/final-score', (request, response) => {
    response.send({
        content: currentScore
    });
})


/*___________________________________________

1) Create an endpoint to POST player's current score and print it on console
It should send a messago to ARDUINO to turn on and off the lights when the player scores a point
_____________________________________________ */

expressApp.post('/score', (req, res) => {
    
    const score = req.body.score;
    console.log(`Player's score: ${score}`);
      
    //message to ARDUINO when the player scores a point
    
    if (score > 0) {
          port.write('1');
        } else {
          port.write('0');
        }
       res.send('Score received');
      });
    
/*___________________________________________

2) Create an endpoint to POST that the game is over and turn on all the lights.
_____________________________________________ */

expressApp.post('/game-over', (req, res) => {
    
        console.log('Game over');
        
        // Send message to Arduino to turn on all lights
        port.write('2');
        res.send('Game over: signal received');

    });
      

let arduinoMessage = {
    actuatorValue: 0,
    btnAValue: 0,
    btnBValue: 0
}

parser.on('data', (data) => {
    console.log(data);
    let dataArray = data.split(' ')
    arduinoMessage.actuatorValue = parseInt(dataArray[0])
    arduinoMessage.btnAValue = parseInt(dataArray[1])
    arduinoMessage.btnBValue = parseInt(dataArray[2])

 
 //3) Use the socket.io instance to send the message from the ARDUINO to the client in the browser

    
    io.on('connection', (socket) => {
    console.log('A user connected');

  
    socket.on('disconnect', () => {
    console.log('A user disconnected');
 
});


});

expressApp.post('/score', (req, res) => {
  const score = req.body.score;
  console.log(`Player's score: ${score}`);

  // Send message to Arduino to turn on/off lights
  if (score > 0) {
    port.write('1');

    io.emit('score', score); // Emit score to all connected clients
  } else {
    port.write('0');
  }

  res.send('Score received');
});



});