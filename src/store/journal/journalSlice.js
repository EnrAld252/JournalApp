import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        //active:null
        //    active:{
        //     id:'ABCD',
        //     title:'',
        //     body:'',
        //     date:12265,
        //     imgUrls:[] //https://foto.jpg,
        //    }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {

            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved='';
        },
        //Cargar Notas
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        //Cuando guardo notas
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved='';
            //TODO mensaje de error
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    note.title = action.payload.title;
                    note.body = action.payload.body;
                }
                return note;
            });
            //TODO Motrar mensaje de actualización
            state.messageSaved=`${action.payload.title}, Actualizada correctamente`
        },
        setPhotosToActiveNote:(state,action)=>{
        //Asignamos la imagenes guardadas al guardar
          state.active.imageUrls=[...state.active.imageUrls,...action.payload];
          state.isSaving=false;
        },
        deleteNodeById: (state, action) => {

        },

    },
})
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    deleteNodeById
} = journalSlice.actions