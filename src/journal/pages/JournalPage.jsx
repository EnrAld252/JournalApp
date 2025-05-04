import { IconButton, Typography } from '@mui/material'
import { AddOutlined, MailOutline } from '@mui/icons-material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../components/view/NothingSelectedView'
import { NoteView } from '../components/view'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {
  const { isSaving,active,notes } = useSelector(state=>state.journal);
  
  const dispatch=useDispatch();
  const onClickNewNote=()=>{

     dispatch(startNewNote());
  }
  return (

    

    <JournalLayout>
     
      {/* <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem accusamus eos consequuntur, nihil nobis nostrum quo ea ut ad ratione. Quas minima accusamus assumenda harum dolore explicabo a reprehenderit obcaecati.</Typography>  */}
      {/* <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem accusamus eos consequuntur, nihil nobis nostrum quo ea ut ad ratione. Quas minima accusamus assumenda harum dolore explicabo a reprehenderit obcaecati.</Typography> */}
    {/* cuando no hay una nota seleccionada */}
    {/* <NothingSelectedView/> */}
     {/* NoteView */}
     {/* <NothingSelectedView/>  */}
     {(!!active ?
           <NoteView/>:
           <NothingSelectedView/>)
           
           }
     
     <IconButton
       onClick={onClickNewNote}
       disabled={isSaving}
       size="large"
       sx={{
        color:'white',
        backgroundColor:'error.main',
        ':hover':{backgroundColor:'error.main',opacity:0.9},
        position:'fixed',
        right:50,
        bottom:50
       }}
     >
      <AddOutlined
       sx={{fontSize:30}}
      ></AddOutlined>
     </IconButton>
     
    </JournalLayout>
  )
}
