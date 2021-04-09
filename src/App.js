import React from 'react';
import './App.css';
// import Sidebar from './Sidebar';
// import Chat from './Chat';
// import HomeContainer from './HomeContainer';
import Dashboard from './Pages/Dashboard';


function App(){
  
   return (  
   <div className="app">
      <div className="app_body">
     
     <Dashboard />
      {/* <Sidebar />
      <Chat messages={[{name:"ayush", received: "5am", message: "yo guys", timestamp: "6 AM"}]}  />
       */}
      </div>  
   </div>
   
)

}

export default App;


