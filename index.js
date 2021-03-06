var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('login', function(nome){
    io.emit('login', nome);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Estou ouvindo na porta: 3000!');
});
