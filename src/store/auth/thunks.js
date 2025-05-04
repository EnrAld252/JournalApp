import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signWidthGoogle } from "../../firebase/providers";
import { checkingCradentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCradentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCradentials());
        const result = await signWidthGoogle();
        if (!result.ok) return (dispatch(logout(result.errorMessage)))
        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        //Ponemos que estamos haciendo el chequeo de las credenciasles
        dispatch(checkingCradentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLoginWitchEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        //Ponemos que estamos haciendo el chequeo de las credenciasles
        dispatch(checkingCradentials());
        //mandamos a llamar la función de providers
        const { ok, uid, photoURL, errorMessage, displayName } = await loginWithEmailPassword({ email, password });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, email, photoURL, errorMessage }));
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();

        dispatch(logout());
    }
}