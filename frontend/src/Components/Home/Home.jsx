import React, { useState, useContext } from 'react'
import { SocketContext } from '../../SocketContext'
import "./home.css"
import icon from "../../icon.png"
import main from "../../main-logo.png"
import { useNavigate } from 'react-router-dom'
import { Socket,io } from 'socket.io-client'
import VideoPlayer from '../CallPage/VideoPlayer'

const socket = io.connect("http://localhost:3001");

const Home = () => {
  const { call,
    accepted,
    ended,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    me,
    callUser,
    leavecall,
    answercall, } = useContext(SocketContext);

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);

  const func = () => {
    socket.emit("join_room", room);
    setShow(true);
  }

  return (
    <div>
    
      {
        !show ? (
        <div className='home'>
          <div className='nav'>
            <p> Let's Meet </p>
             </div>
                     
               <div className='container'>
       
                 <div className='contain1'>
                 <p>Meet, chat, call, and collaborate in just one place</p>
                 <h5>Instantly start a video chat for two people with the touch of a button</h5>
                 
                 <div className='inputs'>
                <div className='input1'> <input id='btn1' placeholder='Enter Name' /> <button id='btn2'>New Meeting </button> </div>
                 <div className='input2'> <input id='btn3' placeholder='Enter Meeting Code' onChange={(e) => setRoom(e.target.value) }/>
                  <input id='btn4' placeholder='Enter Name' onChange={(e) => setUsername(e.target.value)} /> 
                  <button id='btn5' onClick={func}> Join Meeting </button> </div>
                 </div>
       
                 </div>
                 <div className='contain2'>
                     <img src={main} />
                 </div>
               </div>
            </div>

        ) : (
          <VideoPlayer socket={socket} username={username} room={room} />
        )}
  </div>
  )
  }

export default Home