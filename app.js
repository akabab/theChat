var express = require('express');
var socket = require('socket.io');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

server.listen(8080);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

//app.use(app.router);

//ROUTES
app.get('/', function (req, res) {
	res.render('index');
});


//SOCKET CONNECTION
var io = socket.listen(server);

io.sockets.on('connection', function (client) {
	console.log("Client connected..");

	client.emit('message', { message: 'Hello world' });
	client.on('answer', function (data) {
		console.log(data.my);
	});
});
