import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navbarListArray } from './utils';
import { NavLink } from 'react-router-dom';
import "./Sidebar.css";

export const Sidebar = () => (
  <React.Fragment>
    {navbarListArray.map(({title,icon,route})=><SidebarEachMenu route={route} title={title} icon={icon}/>)}
  </React.Fragment>
);

const SidebarEachMenu = ({title,icon,route}:SidebarEachType)=>{
  return <NavLink 
    to={route}  
    className={({ isActive }) =>
    isActive ? "active_menu" : "deactive_menu"
  }> 
    <ListItemButton>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={title} />
  </ListItemButton>
  </NavLink>
}