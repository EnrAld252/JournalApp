import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { useEffect } from "react";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        //Cuando el estado de autenticacion cambia
        //Es un observablle
        onAuthStateChanged(FirebaseAuth, async (user) => {
            //Validamos si esta activo el usuario
            if (!user) return dispatch(logout());
            //Si si existe realizamos el login
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
            dispatch(startLoadingNotes());
        });

    }, []);

    return status
    
}
