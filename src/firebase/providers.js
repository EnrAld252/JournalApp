import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signWidthGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credential=GoogleAuthProvider.credentialFromResult(result);

        const { displayName, email, pthotoURL, uid } = result.user;
        console.log(result.user)
        return {
            ok: true,
            //user info
            displayName, email, pthotoURL, uid
        }
    } catch (error) {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return {
            ok: false,
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {
        //FirebaseAuth contiene toda la autentificacion
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        //Actualización del usuario el name en firebase despues de registrar
        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }

}

export const loginWithEmailPassword =async ({ email, password }) => {
    try {
        const resp =await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL,displayName } = resp.user;
        return {
            ok: true,
            uid, photoURL, email,displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }

}
export const logoutFirebase=async()=>{
    //Esto cierra la autenticación en google, facebook, twitter y demas paltaformas en que se hizo el login
    return await FirebaseAuth.signOut();
}