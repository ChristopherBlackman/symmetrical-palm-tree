
var http = require('http').createServer(handler);
var io = require('socket.io')(http);


http.listen(2406);

/* fuction : handler
 * purpose : handles the index and static files along with error requests
 */
function handler(req,res){
    res.end("This page is intentionaly left blank");
};


/* to keep the pointer on export */
var clients = {};
clients.arr = [];

/* connection handler for any socket trying to connect to the server */
io.on("connection", function(socket){
	console.log("Got a connection");

    /*
     * init method
     */
	socket.on("intro",function(data){
        let msg = data + ' has connected to the room';
		socket.username = data;
        clients.arr.push(socket);
	});

    /*
     * client sending a message to the server
     */
	socket.on("message", function(data){
		console.log(socket.username,"sent global message: ",data);
	});

    /*
     * on disconnect remove the user from the client array
     */
	socket.on("disconnect", function(){
		console.log(socket.username,"disconnected");
        clients.arr = clients.arr.filter(function(element){ return element !== socket});
	});

});

module.exports = clients;


