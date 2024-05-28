import React,{useState,useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
let socket;


const Chat = ({location}) => {
    const [name,setName]=useState('');    
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    const ENDPOINT=process.env.REACT_APP_ENDPOINT;
    const [users,setUsers]=useState([]);

        useEffect(()=>{
            fetch(ENDPOINT).then(res=>console.log(res.body))
        const {name,room}=queryString.parse(location.search);

        socket=io(ENDPOINT, {
            transports: ['websocket']
         });
        socket.on("connect_error", (e) => {
            console.log(e);
         });
        setName(name);
        setRoom(room);

        socket.emit('join',{name,room},(error)=>{
        });

        return ()=>{
            socket.emit('disconnect')

            socket.off()
        }
    },[ENDPOINT,location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages(messages=>[...messages,message]);
        })
        socket.on('roomData',({users})=>{
            setUsers([...users]);
        });
    },[]);
    const sendMessage=(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }
    return (
        <div className="outerContainer">
            <div className="container">
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <div className="secondContainer">
            <TextContainer users={users}/>
            </div>
        </div>
    )
}

export default Chat
