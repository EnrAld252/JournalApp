import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar, SideBar } from '../components';

const drawerWidth=240;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{ display:'flex'}}  className='animate__animated animate__fadeIn animate_faster'>
        <NavBar drawerWidth={drawerWidth} />
        <SideBar  drawerWidth={drawerWidth} ></SideBar>
       {/* Navbar drawerWidth */}
       {/* Sidebar drawerWidth */}
       <Box 
         component="main"
         sx={{  flexGrow:1,width:'98%',p:3,marginLeft:'35px' }}
        >
          <Toolbar/>
          {children}
       </Box>
    </Box>
  )
}
