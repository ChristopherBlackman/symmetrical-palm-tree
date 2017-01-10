
var http = require('http').createServer(handler);
var io = require('socket.io')(http);


http.listen(2406);

/* fuction : handler
 * purpose : handles the index and static files along with error requests
 */
function handler(req,res){
    res.end("This page is intentionaly left blank");
};


/* array of all sockets that are connected */
var clients = [];

/* connection handler for any socket trying to connect to the server */
io.on("connection", function(socket){
	console.log("Got a connection");

    /* purpose : this shoould be used once on connection to the socket
     *           adds the user and socket to the active clients and broadcasts to all other sockets that this user has joined
     * input   : data = "a_user_name"
     */
	socket.on("intro",function(data){

        let msg = data + ' has connected to the room';
        /* initializa the socket infomation and add to the clients array */
		socket.username = data;
        clients.push(socket);
        socket.emit('message',msg);
        socket.broadcast.emit('message',msg);


        console.log(msg);
	});

    /* purpose  : this should send a message to all in the chat room, if one has blocked this client name then they will not see this sockets username
     * input    : data = {username:"a_user_name", message:"a long message here"}
     */
	socket.on("message", function(data){
		console.log(socket.username,"sent global message: ",data);
        var msg = timestamp()+", "+socket.username+": "+data;
        socket.broadcast.emit('message',msg);
	});

    /* purpose  : on disconnect remove the user from the client list
     * input    : None
     */
	socket.on("disconnect", function(){
		console.log(socket.username,"disconnected");
		io.emit("message", timestamp()+": "+socket.username+" disconnected.");
        clients = clients.filter(function(element){ return element !== socket});
	});

});

/* function : timestamp
 * purpose  : gets the current data on the server
 * input    : none
 * return: date
 */
function timestamp(){
	return new Date().toLocaleTimeString();
}
