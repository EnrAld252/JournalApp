import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes=async(uid='')=>{
    if(!uid) throw new Error('El UID del usuario no existe');
    //Hacemos referencia a notes
    const collectionRef=collection(FirebaseDB,`${uid}/journal/notes`);
    //Obtenemos los documentos
    const docs=await getDocs(collectionRef);
    console.log(docs);
    //Recorremos documentos
    const notes=[];
    docs.forEach(doc=>{
        notes.push({id:doc.id,...doc.data()});
    });
    return notes;
    
}