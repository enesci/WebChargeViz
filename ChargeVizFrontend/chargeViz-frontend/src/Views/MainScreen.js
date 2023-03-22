import {useContext} from "react";
import {AllContext} from "../App";
import LocationController from "../Views/LocationController"
import LocationComponent from "./LocationComponent";
import MapComponent from "./MapComponent";

export default function MainScreen(){
    let [context, setContext] = useContext(AllContext);

    const logoutClicked = () => {
        setContext({...context, currentScreen: "loginScreen", loggedInUser: null})
    }

    //TODO map stuff einbinden
    return (
      <>
          <div>
              <button id="logoutBtn" onClick={logoutClicked}>Logout</button>
          </div>
          <div>
              <LocationController/>
              <div className="mapBox">
                  <MapComponent/>
                  <LocationComponent/>
              </div>
          </div>
      </>
    );
}