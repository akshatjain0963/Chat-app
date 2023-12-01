import io from "socket.io-client";
import React,{useState} from "react";
import Chat from "./Chat";
import './App.css';


const socket=io.connect("http://localhost:3001");
function App() {
const[username, setUsername] =useState("");
const[room, setRoom] =useState("");
const[showChat, setShowChat] =useState(false);

const joinroom=()=>{
  if(username!==""&&room!==""){
    socket.emit("join_room",room);
    setShowChat(true);
      
  }
}

  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
     <h3>Join a Chat</h3>
     <input 
     onChange={(event) => setUsername(event.target.value)} 
     type="text" 
     placeholder="Enter your name" 
     name="text"
     />
     <input 
     type="text" 
     onChange={(event) => setRoom(event.target.value)} 
     placeholder="Room ID..." 
      name="text"
     /> 
     <button onClick={joinroom} type="submit">Join</button>
     </div>
      )
     :
     (
     <Chat socket={socket} username={username} room={room}/>
     )
}
    </div>

  );
}


export default App;
