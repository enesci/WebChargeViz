import {useContext, useEffect} from "react";
import {AllContext} from "../App";
import {getCoords, updateDeleteLocation} from "../utils/apiManager";

export default function UpdateDeleteScreen(){
    let locationName, locationAddress, locationPostCode, locationCity;
    let [context, setContext] = useContext(AllContext);
    let currentlyLoggedInUser = context.loggedInUser;

    console.log("Context: " + context)

    //TODO displayLocation callen wenn man auf den Screen wechselt
    const displayLocation = () => {
         let savedLocation = context.currentLocation;
         if (savedLocation != null) {
             locationName.value = savedLocation.name;
             locationAddress.value = savedLocation.address;
             locationPostCode.value = savedLocation.postCode;
             locationCity.value = savedLocation.city;
         }
    }

    const updateClicked = async () => {
        let savedLocation = context.currentLocation;
        if (savedLocation != null) {
            savedLocation.name = locationName.value;
            savedLocation.address = locationAddress.value;
            savedLocation.postCode = locationPostCode.value;
            savedLocation.city = locationCity.value;

            let coords = await getCoords(locationAddress.value);
            console.log(coords);

            if (coords != null){
                savedLocation.lon = coords.lon;
                savedLocation.lat = coords.lat;
            } else {
                savedLocation.lon = null;
                savedLocation.lat = null;
            }

            let updateResponse = await updateDeleteLocation(savedLocation._id, savedLocation, "PUT");
            if (updateResponse.status === 204) {
                alert("Successfully updated Location!")
            } else {
                alert("Something went wrong updating the Location!")
            }
            setContext({...context, currentScreen: "mainScreen", currentLocation: null})
        }
    }

    const deleteClicked = async () => {
        let savedLocation = context.currentLocation;
        if (savedLocation != null) {
            let deleteResponse = await updateDeleteLocation(savedLocation._id, {}, "DELETE");
            if (deleteResponse.status === 204){
                alert("Successfully deleted Location!")
            } else {
                alert("Something went wrong deleting the Location!")
            }
            setContext({...context, currentScreen: "mainScreen", currentLocation: null})
        }
    }

    const cancelClicked = () => {
        setContext({...context, currentScreen: "mainScreen", currentLocation: null});
    }

    useEffect(displayLocation, [])

    //TODO update und delete nur displayen wenn der eingeloggte benutzer ein admin ist
    return (
        <>
            <form>
                <div className="updateDeleteScreen">
                    <label htmlFor="add_name" className="input_lable">Name</label>
                    <input type="text" id="add_name" ref={e => locationName = e} name="add_name" required/>
                    <br/>

                    <label htmlFor="add_address" className="input_lable">Adresse</label>
                    <input type="text" id="add_address" ref={e => locationAddress = e} name="add_address" required/>
                    <br/>

                    <label htmlFor="add_postCode" className="input_lable">Postleitzahl</label>
                    <input type="text" id="add_postCode" ref={e => locationPostCode = e} name="add_postCode" required/>
                    <br/>

                    <label htmlFor="add_city" className="input_lable">Stadt</label>
                    <input type="text" id="add_city" ref={e => locationCity = e} name="add_city" required/>
                    <br/>

                    {  (currentlyLoggedInUser != null && currentlyLoggedInUser.isAdmin) ?
                        (<div className="centerUpdateDeleteCancel">
                        <>
                        <input type="button" onClick={updateClicked} id="addLocationBtn" name="addLocationBtn" value="Update"/>
                        <input type="button" onClick={deleteClicked} id="addLocationBtn" name="addLocationBtn" value="Delete"/>
                        <input type="button" onClick={cancelClicked} id="addLocationBtn" name="addLocationBtn" value="Cancel"/>
                        </>
                            </div>
                        ) :
                        (<div className="centerAddCancel">
                        <input type="button" onClick={cancelClicked} id="addLocationBtn" name="addLocationBtn" value="Cancel"/>
                        </div>
                        )
                    }
                    </div>
            </form>
        </>
    );
}