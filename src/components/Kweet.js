import { dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Kweet = ({kweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newKweet, setNewKweet] = useState(kweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("삭제하시겠습니까?");
        if(ok){
            const data = await dbService.doc(`kweets/${kweetObj.id}`).delete();
            if(kweetObj.attachmentUrl !== "")
            await storageService.refFromURL(kweetObj.attachmentUrl).delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target : {value},
        } = event;
        setNewKweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`kweets/${kweetObj.id}`).update({text:newKweet});
        setEditing(false);
    };

    return (
        <div className="kweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container kweetEdit">
                        <input
                         onChange={onChange} 
                         value={newKweet} 
                         required
                         placeholder ="키윗 고치기"
                         className="formInput" 
                        />
                        <input type="submit" value="업데이트" className="formBtn"/>
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancleBtn">
                        취소
                    </button>
                </>
            ):(
                <>
                <h4>{kweetObj.text}</h4>
                {kweetObj.attachmentUrl && (
                    <img src={kweetObj.attachmentUrl} width="50px" height="50px"/>
                )}
                {isOwner && (
                <div className="kweet__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt}/>
                    </span>
                </div>
            )}
            </>
        )}
        </div>
    );
};

export default Kweet;