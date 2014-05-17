var express = require('express');
var socket = require('socket.io');
var http = require('http');

var app = express();
var server = http.createServer(app);
//var io = socket.listen(server);

server.listen(8080);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(app.router);

app.get('/', function (req, res) {
	res.render('index');
});

// io.sockets.on('connection', function (client) {
// 	console.log("Client connected..");

// 	client.emit('message', { message: 'Hello world' });
// 	client.on('my other event', function (data) {
// 	console.log(data);
//   });
// });