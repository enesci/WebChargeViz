import {useContext} from "react"
import {AllContext} from "../App";
import {getCoords, postLocation} from "../utils/apiManager";

export default function AddScreen(){
    let locationName, locationAddress, locationPostCode, locationCity;
    let [context, setContext] = useContext(AllContext);
    let currentlyLoggedInUser = context.loggedInUser;

    const addButtonOnClick = async () => {
        let locationToPost = {
            name: locationName.value,
            address: locationAddress.value,
            postCode: locationPostCode.value,
            city: locationCity.value
        }

        let coords = await getCoords(locationAddress.value);
        console.log(coords);

        if (coords != null){
            locationToPost.lon = coords.lon;
            locationToPost.lat = coords.lat;
        } else {
            locationToPost.lon = null;
            locationToPost.lat = null;
        }

        let postResponse = await postLocation(locationToPost);
        if (postResponse != null && postResponse.status === 201) {
            setContext({...context, currentScreen: "mainScreen"});
            alert("Successfully posted Location!");
        } else {
            alert("Something went wrong adding the Location");
        }
    }

    const cancelClicked = () => {
        setContext({...context, currentScreen: "mainScreen", currentLocation: null});
    }

    return(
        <>
            <form>
                <div className="addScreen">
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
                        (<div className="centerAddCancel">
                            <>
                                <input type="button" onClick={addButtonOnClick} id="addLocationBtn" name="addLocationBtn" value="Add"/>
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