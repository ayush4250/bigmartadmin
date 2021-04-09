import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AttachmentRoundedIcon from '@material-ui/icons/AttachmentRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import InsertEmoticonRoundedIcon from '@material-ui/icons/InsertEmoticonRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';


function Chat({messages}) {
    const [input, setInput] = useState("");

    const sendMessage= async (e)=>{
        e.preventDefault();

        setInput("");

    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />

                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last Seen at...</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchRoundedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachmentRoundedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertRoundedIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message)=>(

               
                <p className={`chat_message ${message.received && "chat_receiver"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}

                    <span className="chat_timestamp">
                       {message.timestamp} 

                    </span>
                    
                    </p>
                     ))}

                   
            </div>
            <div className="chat_footer">
                <InsertEmoticonRoundedIcon />
                <form>
                    <input value={input} onChange={(e)=> setInput(e.target.value)}
                     placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                </form>
                <MicRoundedIcon />
            </div>
            
        </div>
    )
}

export default Chat
