import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { addNewUser } from "./userServices";

    //Giriş yap, kullanıcıyı ekle
    export const signUp = async (email: string, password: string) => {
        try{
            await createUserWithEmailAndPassword(auth,email,password);
            addNewUser(""); //Şimdilik boş
        }

        catch (e){
            console.error(e);
        }
    }

    //Giriş yap
    export const signIn = async (email: string, password: string)=>{
        try{
            await signInWithEmailAndPassword(auth,email,password);
        }

        catch(e){
            console.error(e);
        }

    }

    //Google ile giriş
    export const signInWithGoogle = async () => {
        try{

            await signInWithPopup(auth, googleProvider);
            }
    
            catch(e) {
                console.error(e);
            }

    }


    //Çıkış yap
    export const logOut = async () => {
        try{
            await signOut(auth)

        }

        catch (e){
            console.error(e);
        }

    }

