import Kweet from "components/Kweet";
import { dbService, storageService } from "fbase";
import { useState, useEffect } from "react";
import KweetFactory from "components/KweetFactory";

const Home = ({userObj}) => {
    const [kweets, setKweets] = useState([]);

    useEffect(() => {
        dbService
          .collection("kweets")
          .orderBy("createAt", "desc")
          .onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
              id: document.id,
              ...document.data(),
            }));
            setKweets(newArray);
          });
      }, []);


   
    return (
    <div className="container">
       <KweetFactory userObj={userObj}/>
        <div style={{marginTop: 30}}>
            {kweets.map((kweet) => (
               <Kweet 
                key={kweet.id} 
                kweetObj={kweet}
                isOwner = {kweet.createId === userObj.uid}    
            />
            ))}
        </div>
    </div>
    );
};

export default Home;