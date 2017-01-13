
var http = require('http').createServer(handler);
var io = require('socket.io')(http);


http.listen(2406);

/* fuction : handler
 * purpose : handles the index and static files along with error requests
 */
function handler(req,res){
    res.end("This page is intentionaly left blank");
};


clients = [];

/* connection handler for any socket trying to connect to the server */
io.on("connection", function(socket){
	console.log("Got a connection");

	socket.on("intro",function(data){
        let msg = data + ' has connected to the room';
		socket.username = data;
        clients.push(socket);
	});

	socket.on("message", function(data){
		console.log(socket.username,"sent global message: ",data);
	});

    /* purpose  : on disconnect remove the user from the client list
     * input    : None
     */
	socket.on("disconnect", function(){
		console.log(socket.username,"disconnected");
        clients = clients.filter(function(element){ return element !== socket});
	});

});





/*
 * DO NOT SEND MORE THAN 20 MSG/30 SEC... 8 HOUR BAN HAMMER
 */

console.log("welcome to logging bot 2.0");

var irc = require('irc');
var config = require('./config');

/* init method */
var client = new irc.Client(config.irc.server, config.account.username, {
    channels: config.irc.channels,
    debug:false,
    password: config.account.password,
    username: config.account.username,
});

/* get messages in the twitch chat */
client.addListener('message', function (from, to, message) {
    clients.map(function(socket){socket.emit('message',message)});
    console.log(from,': ',message);
});

/*needed, when weird commands are sent to this server */
client.addListener('error', function(message) {
    console.log('error: ', message);
});
