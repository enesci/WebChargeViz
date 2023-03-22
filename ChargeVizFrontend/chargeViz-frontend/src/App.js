import logo from './logo.svg';
import './App.css';
import {createContext, useState} from "react";
import UpdateDeleteScreen from "./Views/UpdateDeleteScreen"
import LoginScreen from "./Views/LoginScreen";
import MainScreen from "./Views/MainScreen";
import AddScreen from "./Views/AddScreen";

export const AllContext = createContext(null)

function App() {
    let[context, setContext] = useState({loggedInUser: null, currentScreen:null, currentLocation: null, allLocations: []});
    let currentScreen = null;
    switch (context.currentScreen){
        case "loginScreen":
            currentScreen = <LoginScreen/>
            break;
        case "mainScreen":
            console.log("Main Screen")
            currentScreen = <MainScreen/>
            break;
        case "addScreen":
            currentScreen = <AddScreen/>
            break;
        case "updateDeleteScreen":
            currentScreen = <UpdateDeleteScreen/>
            break;
        default:
            currentScreen = <LoginScreen/>
    }

    return (
        <>
            <AllContext.Provider value={[context, setContext]}>
                {currentScreen}
            </AllContext.Provider>
      </>
  );
}

export default App;
