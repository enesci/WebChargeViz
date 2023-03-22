import {getAllLocations} from "../utils/apiManager";
import {useContext, useEffect} from "react";
import {AllContext} from "../App";

export default function LocationController(){
    let [context, setContext] = useContext(AllContext);

    const showAllLocations = async () => {
        let locationListResponse = await getAllLocations();
        let locationList = await locationListResponse.json();
        console.log(locationList)
        setContext({...context, allLocations: locationList})
    }


    const addContactButtonClicked = () => {
        setContext({...context, currentScreen: "addScreen"});
    }

    useEffect(() =>{
        showAllLocations()
    }, []);

    return (
        <>
        <div className="row">
            <div className="column_tripple_butt">
                <div className="tbl_buttons">
                    <button className="btn_addcontact" id="btn_addNewID" onClick={addContactButtonClicked}>Add New</button>
                </div>
            </div>
        </div>
        </>
    );
}
