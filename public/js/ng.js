var server = io.connect('http://ycribier.com');

var messages = [];

server.on('connect', function () {
	var nick = prompt("Set your nickname");
	server.emit('join', { nick: nick });
});


(function () {
	var ngApp = angular.module('chat', []);

	ngApp.controller('ChatController', function ($scope) {
		this.messages = messages;

		this.sendMessage = function (message) {
			server.emit('answer', { message: message });
			messages.push("oim> " + message);
			$scope.newMessage = "";
		};

		server.on('message', function (data) {
			messages.push(data.nick + "> " + data.message);
			$scope.$apply();
		});

	});

})();
