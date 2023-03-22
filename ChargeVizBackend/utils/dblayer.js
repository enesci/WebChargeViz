const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
   name: String, password: String, isAdmin: Boolean
});
const susLocSchema = new mongoose.Schema({
    name: String, address: String, postCode: String, city: String, lon: String, lat: String
});

const User = mongoose.model("User", userSchema);
const Location = mongoose.model("Location", susLocSchema);

async function main(){
    await mongoose.connect("mongodb://127.0.0.1/ChargeViz")
}

async function saveUser(userJSON){
    let userToSave = new User({name: userJSON.name, password: userJSON.pass, isAdmin: userJSON.isAdmin})
    return userToSave.save();
}

async function checkUser(userToCheck){
    return User.findOne({name: userToCheck.name, password: userToCheck.password});
}

async function saveLocation(locationJSON){
    let locationToSave = new Location({name: locationJSON.name, address: locationJSON.address, postCode: locationJSON.postCode, city: locationJSON.city, lon: locationJSON.lon, lat: locationJSON.lat});
    return await locationToSave.save();
}

async function getAllLocations(){
    return Location.find();
}

async function getLocationByID(locationID){
    return Location.findById(locationID);
}

async function deleteLocationByID(locationID){
    await Location.findByIdAndDelete(locationID)
}

async function updateLocation(locationID, locationJSON){
    let locationInDB = await Location.findById(locationID);
    locationInDB.name = locationJSON.name;
    locationInDB.address = locationJSON.address;
    locationInDB.postCode = locationJSON.postCode;
    locationInDB.city = locationJSON.city;
    locationInDB.lon = locationJSON.lon;
    locationInDB.lat = locationJSON.lat;
    return locationInDB.save();
}

module.exports = {
    main,
    saveUser,
    saveLocation,
    checkUser,
    getLocationByID,
    deleteLocationByID,
    getAllLocations,
    updateLocation
}