import React from 'react';
import './ChatFragment.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { Container } from '@material-ui/core';




function App(){
  
   return (  
     
   <div className="apk">
      <div className="apk_body">
     
   
      <Sidebar />
      <Chat messages={[{name:"ayush", received: "5am", message: "yo guys", timestamp: "6 AM"}]}  />
      
      </div>  
   </div>
  
   
)

}

export default App;


