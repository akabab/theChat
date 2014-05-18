var express = require('express');
var socket = require('socket.io');
var http = require('http');
var path = require('path');
var redis = require('redis');

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
	//console.log("Client connected..");

	client.on('answer', function (data) {
		var nick = client.get('nick', function (err, nick) {
			//console.log(nick + ": " + data.message);
			client.broadcast.emit('message', { nick: nick, message: data.message });
		});
	});

	client.on('join', function (data) {
		client.set('nick', data.nick);
		console.log(data.nick + " joined.");
	});
});
