import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeFragment from '../Fragments/HomeFragment';
import TableFragment from '../Table/TableFragment';
import ContactFragment from '../Fragments/ContactFragment';
import ChatFragment from '../Whatsapp/ChatFragment';
import {Home , Category, Phonelink, ShoppingCart, Settings, PowerOff} from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [fragment, setfragment] = useState("Home");

  const loadFragment =  () =>{
    switch(fragment){
      case "Home":
      return <HomeFragment />
        case "WhatsApp":
        return <ChatFragment />
       case "TableFragment":
         return <TableFragment />
      case "ContactFragment":
        return <ContactFragment />
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            BIGMART
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
        <List>
       
       <ListItem button onClick={e=>setfragment("Home")}>
         <ListItemIcon>{<Home />}</ListItemIcon>
         <ListItemText primary="Home" />
       </ListItem>

       <ListItem button onClick={e=>setfragment("WhatsApp")}>
         <ListItemIcon>{<Category />}</ListItemIcon>
         <ListItemText primary="WhatsApp" />
       </ListItem>

       <ListItem button onClick={e=>setfragment("TableFragment")}>
         <ListItemIcon>{<Phonelink />}</ListItemIcon>
         <ListItemText primary="Manage Categories" />
       </ListItem>

       <ListItem button onClick={e=>setfragment("ContactFragment")}>
         <ListItemIcon>{<Settings />}</ListItemIcon>
         <ListItemText primary="Settings" />
       </ListItem>

       <ListItem button>
         <ListItemIcon>{<PowerOff />}</ListItemIcon>
         <ListItemText primary="Log Out" />
       </ListItem>
   
   </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {loadFragment()}
      </main>
    </div>
  );
}
