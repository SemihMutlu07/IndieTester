import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { addNewUser } from "./userServices";
//Navigation işlemlerini auth ile gerçekleştirdik, daha fazla çeşitlendirme için..
//..push adresleri de parametre olarak eklenilebilir

    //Giriş yap, kullanıcıyı ekle
    export const signUp = async (email: string, password: string, router: any) => {
        try{
            await createUserWithEmailAndPassword(auth,email,password);
            addNewUser(""); //Şimdilik boş
            router.push("/login");
        }

        catch (e){
            console.error(e); 
            alert(e);
        }
    }

    //Giriş yap
    export const signIn = async (email: string, password: string, router: any)=>{
        try{
            await signInWithEmailAndPassword(auth,email,password);
            router.push("/login");
        }

        catch(e){
            console.error(e);
            alert(e);
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
        window.location.reload();

    }

