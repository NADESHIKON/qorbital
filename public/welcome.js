function start(){
  joinGame(document.getElementById('username').value);
  document.getElementById('menu').style.display = "none";
  document.getElementById('display').style.display = "flex";
  document.getElementById('bottomMenu').style.display = "none";
  document.getElementById("patchNotes").style.display = "none";
  joinGame = start = () => {};
}
document.getElementById('start').addEventListener('click', start);
/*document.onwheel = e => {
  if(e.deltaY > 0){
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }else{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
};*/
document.addEventListener('keydown', (event) => {
  if(event.key == 'Enter') start();
});

 document.getElementById("username").addEventListener('keypress', (event)=>{
          if(event.keyCode==13){
            console.log("a");
          }
      });
var pncc = document.getElementById("patchNotesContentContainer");

var scrollFunc = function() {
          var y = window.scrollY;
          if (y >= 300) {
            document.getElementById("patchNotesContentContainer").className = "scrolledOnCont";
            document.getElementById("patchNotesLogo").className = "scrolledOn";
            console.log(document.getElementById("patchNotesLogo").classList);
            console.log("a");
          }
        };
window.addEventListener("scroll", scrollFunc);
document.getElementById('linkPN').addEventListener('click', ()=>{
          document.getElementById("patchNotes").scrollIntoView();
});
document.getElementById("patchNotesContentContainer").addEventListener("click",()=>{
  document.getElementById("patchNotesContentContainer").classList.toggle('pnccClicked');
});
//Create a PatchNote Code. IDK what to do with it lmao

var patchNotes = [];
constructPatchNote(["Camera Controls and Movement Added"], "0.0");
constructPatchNote(["Reference Grid Added"], "0.1");
constructPatchNote(["Coordinate and Shooting Added"], "0.2");
constructPatchNote(["Added Knockback","QoL changes to firing"], "0.3");
//dont mind me just being inefficient with my code
updatePatchNote();

function updatePatchNote(){
  document.getElementById("patchNotesContentContainer").innerHTML = "";
  for(var i = patchNotes.length-1; i > -1; i--){
    document.getElementById("patchNotesContentContainer").appendChild(patchNotes[i]);
  }
}
function constructPatchNote(notes, versionNumber){
    var cont = document.createElement("div");
    cont.className = "patchNote";
    var title = document.createElement("h1");
    title.textContent = "Version " + versionNumber;
    cont.appendChild(title);
    for(var i = 0; i < notes.length; i++){
      var tempP = document.createElement("p");
      tempP.textContent = " - " + notes[i];
      cont.appendChild(tempP);
    }
    patchNotes.push(cont);
};

//Modal

document.getElementById("createGame").addEventListener('click', ()=>{
  var i = 0;
  document.getElementById("userModal").style.display= "inline-block";
  document.getElementById("modal-overlay").style.display = "inline-block";
  var a = setInterval(()=>{
    document.getElementById("userModal").style.opacity = i;
    document.getElementById("modal-overlay").style.opacity = i/2.8;
    i+=0.1;
     if(i >= 1){
       clearInterval(a);

     }
  }, 25);
});
document.getElementById("modal-overlay").addEventListener('click', ()=>{
  if(parseInt(document.getElementById("userModal").style.opacity) >=0.3){
  var i = 1;
  var a = setInterval(()=>{
    document.getElementById("userModal").style.opacity = i;
    document.getElementById("modal-overlay").style.opacity = i/2.8;
    i-=0.1;
     if(i <= 0){
       clearInterval(a);
       document.getElementById("userModal").style.display= "none";
       document.getElementById("modal-overlay").style.display = "none";
       updateLobbyList();
       document.getElementById("lobbyListContainer").display = "none";
       document.getElementById("playerListContainer").display = "none";
     }
  }, 25);
  }
});

//creating a sample lobby:
function CreateLobby(name, id){
  this.name = name;
  this.players = [];
  this.people = 1;
  this.id = id;
  this.append = function(){
    var cont = document.createElement("div");
    cont.className = "lobbyBlock";
    var label = document.createElement("span");
    label.textContent = this.name;
    label.className = "lobbyLabel";
    var ppl = document.createElement("span");
    ppl.textContent = this.people + "/10";
    ppl.className = "lobbyPpl";
    var join = document.createElement("button");
    join.textContent = "join";
    join.addEventListener('click', ()=>{
      this.waitList();
    });
    cont.appendChild(label);
    cont.appendChild(join);
    cont.appendChild(ppl);
    cont.appendChild(document.createElement("br"));
    document.getElementById("lobbyListContainer").appendChild(cont);
  }
  this.waitList = function(){
    //change UI to have "back/leave," and boom
    document.getElementById("modalTitle").textContent = name;
    document.getElementById("lobbyListContainer").style.display = "none";
    document.getElementById("linkHostLobby").style.display = "none";
    document.getElementById("playerListContainer").style.display = "block";
    for(var i = 0; i < this.players.length; i++){
      this.players[i].app();
    }
  }
}
function PlayerBlock(name, pClass){
    this.class = pClass;
    this.name = name;
    this.app = function(){
      var cont = document.createElement("div");
      cont.className = "playerBlock";
      var n = document.createElement("span");
      n.textContent = name;
      n.className = "playerName";
      var c = document.createElement("img");
      c.className = "playerClass";
      c.src = "/assets/Class-defender.png";
      cont.appendChild(n);
      cont.appendChild(c);
      document.getElementById("playerListContainer").appendChild(cont);
    }
}
var lobbies = {};
for(var i = 0; i < 4; i++){
  lobbies[i + 1] = new CreateLobby("POG",i+1);
  lobbies[i+1].players.push(new PlayerBlock("Thomas", "Defender"));
}
function updateLobbyList(){
  document.getElementById("lobbyListContainer").innerHTML = "";
  document.getElementById("lobbyListContainer").style.display = "block";
  document.getElementById("linkHostLobby").style.display = "block";
  document.getElementById("modalTitle").textContent = "Join a Lobby";
  for(const key of Object.keys(lobbies)){
    lobbies[key].append();
    console.log(key);
  }
}
updateLobbyList();
