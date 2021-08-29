import {v4 as uuidv4} from 'uuid';
import { dbService, storageService } from "fbase";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const KweetFactory = ({userObj}) => {
    const [kweet, setKweet] = useState("");
    const [attachment, setAttachment] = useState("");


    const onSubmit = async(event) => {
        event.preventDefault();
        if(kweet === ""){
            return;
        }
        let attachmentUrl = "";
        if(attachment !== ""){
        const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment,"data_url");
        attachmentUrl = await response.ref.getDownloadURL();
        }
        await dbService.collection("kweets").add({
            text: kweet,
            createAt: Date.now(),
            createId: userObj.uid,
            attachmentUrl,
        });
        setKweet("");
        setAttachment("")
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setKweet(value);
    };

    const onFileChange = (event) =>{
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        if (Boolean(theFile)) {
            reader.readAsDataURL(theFile);
          }
    };

    const onClearAttachment = () => setAttachment("");


    return(
    <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
        <input
        className="factoryInput__input"
         value={kweet}
         onChange={onChange}
         type="text"
         placeholder="무슨 생각을 하시고 계신가요?"
         maxLength={240}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow"/>
        </div>
        <label htmlFor="attach-file" className="factoryInput__laber">
            <span>  사진 추가하기  </span>
            <FontAwesomeIcon icon={faPlus}/>
        </label>
        <input
            id="attach-file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{
                opacity: 0,
            }}
        />
        {attachment &&(
            <div className="factoryForm__attachment">
                 <img 
                    src={attachment} 
                    style={{
                        backgroundImage: attachment,
                    }}
                />
                <div className="factoryForm__clear" onClick={onClearAttachment}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes}/>
                </div>
            </div>
        )}
    </form>
    );
};

export default KweetFactory;