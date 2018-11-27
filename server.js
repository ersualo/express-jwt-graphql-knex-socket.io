import express from 'express';
import bodyParser from 'body-parser';
import {promisify} from 'bluebird';
import {HOST, PORT} from './config/config';
import Knex from './config/knex';

var router = express.Router();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use('/api', require('./middlewares/auth.js'));
app.use('/api', require('./controllers/graph')(router));
app.use('/', require('./controllers/user.js')(router));
app.use(express.static('public'));

//server running
var server = app.listen(8000, function(){
  console.log('Running on port 8000!');
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

