import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./JournalSlice";
import { loadNotes } from "../../helpers";
import { fileupload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        //Ponemos la variable de isSaving en true para deshabilitar botón en lo que guarda
        dispatch(savingNewNote(setActiveNote(true)));
        //obtenemos uid
        const { uid } = getState().auth;

        const newNote = {
            title: 'test title',
            body: 'test body',
            date: new Date().getTime()
        }
        //Creamos u Obtenemos documento
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        const setDocResp = await setDoc(newDoc, newNote);
        console.log(newDoc, setDocResp);
        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
        //dispatch
        //dispatch(newNote)
        //dispatch(activeNote)
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        console.log(uid);
        const notes= await loadNotes(uid);

        dispatch(setNotes(notes)); 
    }
}

export const startSaveNote=()=>{
   return async(dispatch,getState)=>{

    dispatch(setSaving());
   //id usuario
    const { uid } = getState().auth;
    const { active:note } = getState().journal;
    console.log(note);
    
    const noteToFireStore={...note};
    delete noteToFireStore.id;

    const docRef=doc(FirebaseDB,`${uid}/journal/notes/${note.id}`)
    await setDoc(docRef,noteToFireStore,{marge:true});
    dispatch(updateNote(note));
   }
}

export const startUploadingFiles=(files=[])=>{
    return async(dispatch,getSatate)=>{

       dispatch(setSaving());
       //queremos disparar todas las imagenes en secuencias
       const fileUploadPromises=[];
       for (const file of files) {
          fileUploadPromises.push(fileupload(file));
       }
       const photosUrls=await Promise.all(fileUploadPromises);
       dispatch(setPhotosToActiveNote(photosUrls));
       console.log(photosUrls);
    }
}