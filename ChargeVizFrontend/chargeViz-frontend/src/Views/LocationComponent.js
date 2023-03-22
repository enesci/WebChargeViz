import {useContext} from "react";
import {AllContext} from "../App";

export default function LocationComponent() {
    let [context, setContext] = useContext(AllContext);
    const showLocation = (location) => {
        setContext({...context, currentScreen: "updateDeleteScreen", currentLocation: location})
    }

    return (
        <div>
            {(context.allLocations != null) && context.allLocations.map((location) => {
                return(
                    <button onClick={() => showLocation(location)}>{location.name}</button>
                );
            })}
        </div>
    );
}
