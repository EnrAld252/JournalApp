import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth'


export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch=useDispatch();

const onLogout=()=>{
   dispatch(startLogout());
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
            ml: { sm: `${drawerWidth}px` }
          }
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            edge='start'
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuOutlined />
          </IconButton>

          <Typography variant='h6' noWrap component="div" sx={{ flexGrow: 1 }}>
            JounalApp
          </Typography>
          <IconButton color='error' onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Toolbar>


      </AppBar>
    </Box>
  )
}
