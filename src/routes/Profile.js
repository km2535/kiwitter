import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({userObj, refreshUser}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut()
        history.push("/")
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({displayName: newDisplayName});
            refreshUser();
        }
    };


    return(
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input 
                onChange={onChange}
                type="text" 
                placeholder="이름을 적어주세요"
                value={newDisplayName}
                autoFocus
                className="formInput"
            />
            <input 
                type="submit" 
                value="프로필 수정하기"
                className="formBtn"
                style={{
                    marginTop: 10,
                }}
            />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            로그 아웃
        </span>
        </div>
    );
};

export default Profile;