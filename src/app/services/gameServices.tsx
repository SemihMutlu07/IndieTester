import { db, auth } from "./firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"

export const gameCollectionRef = collection(db, "games");

    //Sayfa yüklendiğinde yapılacak (useEffect içerisinde)
    //Oyun listesini çek
    export const getGameList = async () => {

      try{
      //const data = await getDocs(gameCollectionRef); //colllection referansından ilgili dokümanları alıyor.
      //const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id})); {/*Bu dokümanlarla yeni bir dizi*/}
      //return filteredData;
      //}
      const data = await getDocs(gameCollectionRef); // Koleksiyonun tüm dokümanlarını al
      const filteredData = data.docs.map((doc) => {
        const docData = doc.data(); 
        return {
          id: doc.id, 
          title: docData.title, 
          explanation: docData.explanation, 
          publishDate: docData.publishDate, 
        };
      });
      return filteredData;

      }

      catch (err){
        console.error(err);
        return [];
      }

    };

    //Yeni oyun ekle
    export const addNewGame = async (newGameTitle :string, newExplanation :string)=>{
        const today = new Date();
    
        const day = String(today.getDate()).padStart(2, '0'); // Gün değeri 
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Ay değeri 
        const year = today.getFullYear(); // Yıl değeri
        const dateString = `${day}/${month}/${year}`; // Oyunun eklendiği tarih ekleniyor
    
        //Koleksiyon referansını birinci parametre, ikinci paremetre ise bir map olarak doküman almaktadır
        try{
        await addDoc(gameCollectionRef, {
          title: newGameTitle, 
          explanation: newExplanation, 
          publishDate: dateString,
          userId: auth?.currentUser?.uid //uid (user id) benzersizdir. (Giriş sonrası user id değeri eklenilmiştir)
        });
        }
        catch (err){
          console.error(err);
        }
    
        window.location.reload();
      };

    //Oyun sil  
    export const deleteGame = async (id: string) =>{
    //Bir doküman oluşturmak için:
    //Birinci parametre database referansı, ikinci parametre koleksiyon ismi, üçüncü parametre doküman id'si
    try{
      const gameDoc= doc(db, "games", id) //1-Database ref, 2-koleksiyon ismi, 3-doküman id
      await deleteDoc(gameDoc);
    }
    catch(err){
      console.error(err);
    }

    window.location.reload();

    };

    //Oyun güncelle
    //Burada sadece oyun başlığı değişikliği mevcut. Çeşitlendirilebilir
    export const updateGame = async (id: string, newGameTitle: string)=>{
        //Bir doküman oluşturmak için:
        //Birinci parametre database referansı, ikinci parametre koleksiyon ismi, üçüncü parametre doküman id'si
        try{
          const gameDoc= doc(db, "games", id);
          //Bir doküman referansı, ve map içerisinde değiştirmek istediğin field: yeni değer
          await updateDoc(gameDoc, {
            title: newGameTitle
          });
        }
        catch(err){
          console.error(err);
        }
    
        window.location.reload();
    
      }


