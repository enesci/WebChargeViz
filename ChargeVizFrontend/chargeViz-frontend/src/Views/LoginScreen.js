import {useContext} from "react";
import {AllContext} from "../App";
import {getUser} from "../utils/apiManager";

export default function LoginScreen() {
    let username;
    let password;
    let [context, setContext] = useContext(AllContext);

    const loginUser = async () => {
        let user = {name: username.value, password: password.value};
        console.log(user)
        let userResponse = await getUser(user);

        if (userResponse.status === 200) {
            let userJSON = await userResponse.json();
            alert("Welcome Back " + userJSON.name + "!")
            context.loggedInUser = userJSON;
            context.currentScreen = "mainScreen";
            setContext({...context})
        } else {
            alert("Invalid User!")
        }
    }

    return (
        <>
            <form>

                <div className="container">
                    <div className="center">
                    <label htmlFor="loginName">Username</label>

                    <input type="text" ref={e => username = e} placeholder="Enter Username" id="loginName"
                           required/>

                    <pre>
                    <label htmlFor="loginPassword">Password</label>
                    <input type="password" ref={e => password = e} placeholder="Enter Password" id="loginPassword"
                           required/>
                    </pre>
                    <button type="button" id="loginBtn" onClick={loginUser}>Login</button>
                </div>
                </div>

            </form>
        </>
    );
}