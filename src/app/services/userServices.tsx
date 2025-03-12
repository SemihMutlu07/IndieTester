import { db, auth } from "./firebase";
import { getDoc, collection, doc, setDoc} from "firebase/firestore"
import { useMemo } from 'react';

export const userCollectionRef = collection(db, "users");

//Sayfa yüklendiğinde yapılacak (useEffect içerisinde, düzgün bir şekilde yenilenmesi için)
//Uid değerine göre user'ı getir.
export const getUser= async (uid: string) => {

      try{
       const userRef = await getDoc(doc(userCollectionRef,uid));
       return userRef;
      }

      catch (err){
        console.error(err);
        return null;
      }

    };

//Değişkenler arttırılabilir (Şimdilik sadece kullanıcı ismi, uid otomatik olarak ekleniyor)
export const addNewUser = async (newUserName: string)=>{

        //Koleksiyon referansını birinci parametre, ikinci paremetre ise bir map olarak doküman.
        try{
            const userId = auth?.currentUser?.uid; //Kullanıcının UID'si
            const userRef = doc(userCollectionRef, userId);

            await setDoc(userRef, {
                userName: newUserName,
                userId: userId, //uid
            });
        }
        catch (err){
          console.error(err);
        }
    
        window.location.reload();
      };
