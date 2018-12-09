import express from 'express';
import expressGraphQL  from "express-graphql";
import bodyParser from 'body-parser';
import {HOST, PORT} from './config/config';
import cors from 'cors';
import graph from './controllers/graph'

var router = express.Router();

let app = express();
app.use('/api', graph);
app.use('/', require('./controllers/user.js')(router));
app.use(express.static('public'));

//server running
var server = app.listen(PORT, function(){
  console.log('Running on port ' + PORT);
});

//server sockets
const io = require("socket.io")(server)

io.on('connection', (socket) => {

  socket.username = 'Anonymous'
  socket.on('change_username', (data) => {
    socket.username = data.username
  })

  socket.on('new_message', (data) => {
    io.sockets.emit('new_message', {message : data.message, username : socket.username})
  })
});

