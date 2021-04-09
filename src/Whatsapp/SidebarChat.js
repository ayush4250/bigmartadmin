import React from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';



function SidebarChat({name}) {

    
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info">

           
                <h2>{name}</h2>
                <p>This is last Message</p>
         

               
               
            </div>
            
        </div>
    )
}

export default SidebarChat
