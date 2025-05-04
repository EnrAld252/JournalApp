import { SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, FormControl, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { ImageGallery } from './ImageGallery'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../../hooks/useForm'
import { setActiveNote } from '../../../store/journal/JournalSlice'
import { startSaveNote, startUploadingFiles } from '../../../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fielInputRef=useRef();

    useEffect(() => {

        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);

    const onSaveNote = () => {

        dispatch(startSaveNote());
    }
    const onFileInputChange = ({ target }) => {
        console.log(target.files);
        if (target.files.length === 0) return;

        dispatch(startUploadingFiles(target.files));

    }

    return (
        <Grid container direction='row' justifyContent='space-between' sx={{ mb: 1 }} className='animate__animated animate__fadeIn animate_faster'>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>
            <Grid item>
                {/* Ponemos input File */}
                <input

                    type="file"
                    multiple
                    ref={fielInputRef}
                    onChange={onFileInputChange} 
                    style={{display:'none'}}
                    />
                <IconButton
                 color="primary"
                 disabled={isSaving}
                 onClick={()=>fielInputRef.current.click()}
                 >
                    <UploadOutlined></UploadOutlined>
                </IconButton>
                <Button
                    color='primary'
                    onClick={onSaveNote}
                    disabled={isSaving}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container size={{ xs: 12, md: 12 }}>
                <TextField
                    type="text"
                    variant='filled'
                    fullWidth
                    placeholder='Ingresar Titulo'
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='Que sucedio en el dia de hoy?'
                    label="Titulo"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid>
                {/* Galeria de imagenes */}
                <ImageGallery />
            </Grid>
        </Grid>
    )
}
