# Welcome to symmetrical palm tree
- this is the testing library for game jam 2017,

# Plans to implement
- [x] get a connection with some kind of socket server
- [x] get a connection to the twitch irc servers and authenticate
- [x] merge both programs

# Install
- node 
- python 2.7 >
- g++
- Setting up the twitch bot requires one to edit the config_dist.js file and to fill in channel, username and password( not your actual password)

```bash
# cd into js
npm install 
node irc.js
```

Here is an example on how to setup a socket io connection in the Superpowers library as of 2017

```ts

class ScriptBehavior extends Sup.Behavior {
    x = io( 'http://localhost:2406/' );
    name = "A_Computer";
    awake() {
        this.x.on("message",this.messages);

        this.x.emit("intro",this.name);
        this.x.emit('message',"hello world");
    }
    messages(data){
        Sup.log(data);
    }
    update() {

    }
}
Sup.registerBehavior(ScriptBehavior);

```
