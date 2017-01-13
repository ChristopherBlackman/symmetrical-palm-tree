/*
 * DO NOT SEND MORE THAN 20 MSG/30 SEC... 8 HOUR BAN HAMMER
 */

console.log("welcome to logging bot 2.0");

var irc = require('irc');
var clients = require('./app');
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
    console.log(from,': ',message);
    clients.arr.map(function(client){client.emit('message',message);});
});

/*needed, when weird commands are sent to this server */
client.addListener('error', function(message) {
    console.log('error: ', message);
});
