import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if (name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
    };

    return(
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{marginBottom: 30}}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                <FontAwesomeIcon icon={faGoogle} size="2x"/>
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                <FontAwesomeIcon icon={faGithub} size="2x"/>
                </button>
            </div>
        </div>
    )
}


export default Auth;