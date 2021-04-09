import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded';
import { IconButton, Avatar } from '@material-ui/core';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SidebarChat from './SidebarChat'; 

function Sidebar() { 
   // const [input, setinput] = useState("");
    const [room, setroom] = useState([]);

    const addRoom = () => {
        const roomName = prompt("Enter a Room Name");
        setroom(roomName);
      
    }

   
   

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://upload.wikimedia.org/wikipedia/commons/5/52/Background_images.png"
                 />
                <div className="sidebar_headerRight">
                    <IconButton>
                    <DonutLargeRoundedIcon />
                    </IconButton>
                    <IconButton>
                    <MoreVertRoundedIcon />
                    </IconButton>
                    <IconButton>
                    <ChatRoundedIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchRoundedIcon onClick={addRoom} />
                </div>
            </div>
            <div className="sidebar_chats">
               {room.map((index)=>(
                   <SidebarChat name={room} />
               ))}
            </div>
        </div>
    )
}

export default Sidebar
