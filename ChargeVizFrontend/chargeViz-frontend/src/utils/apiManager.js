let userRoute = "http://localhost:8000/users"
let locationRoute = "http://localhost:8000/susLocs"

export async function postLocation(locationToPost){
    try {
        let response = await fetch(locationRoute,
            {method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(locationToPost)
            }
        )
        return await response;
    } catch (err) {
        console.log(err)
        return null;
    }
}

export async function updateDeleteLocation(locationID, locationJSON, method){
    try {
        let response = await fetch(locationRoute + "/" + locationID,
            {method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(locationJSON)
            }
        )
        return await response;
    } catch (err) {
        alert("Something went wrong updating/deleting the Location!")
        console.log(err)
        return null;
    }
}

export async function getUser(user){
    try {
        let response = await fetch(userRoute,
            {method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            }
        )
        return await response;
    } catch (err) {
        alert(err)
        alert("Something went wrong fetching User!")
        console.log(err)
        return null;
    }
}

export async function getSingleLocation(locationID){
    try {
        let response = await fetch(locationRoute + "/" + locationID,
            {method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            }
        )
        return await response;
    } catch (err) {
        alert("Something went wrong fetching the Location!")
        console.log(err)
        return null;
    }
}

export async function getAllLocations(){
    try {
        let response = await fetch(locationRoute,
            {method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        )
        return await response;
    } catch (err) {
        alert("Something went wrong fetching the Locations!")
        console.log(err)
        return null;
    }
}

export async function getCoords(contactAddress){
    let url = "https://nominatim.openstreetmap.org/search?q=" + contactAddress + "&format=json&polygon=1&addressdetails=1";
    try {
        let response = await fetch(url, {
            method: "GET", headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
        let responseJSON = await response.json();
        console.log("Reponse JSON", responseJSON);
        console.log("Contact Address: ", contactAddress);
        if (responseJSON !== undefined) {
            let latitude = responseJSON[0].lat;
            let longitude = responseJSON[0].lon;

            return {lon: longitude, lat: latitude};
        } else {
            alert("Address doesn't exist!");
            return null;
        }
    } catch (err) {
        console.log(err)
    }
}