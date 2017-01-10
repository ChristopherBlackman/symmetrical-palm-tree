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

