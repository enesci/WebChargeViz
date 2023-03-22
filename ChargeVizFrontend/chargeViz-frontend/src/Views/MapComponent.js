import {useContext} from "react";
import {AllContext} from "../App";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "../styles/style.css";
import 'leaflet/dist/leaflet.css';
import {Icon} from "leaflet/dist/leaflet-src.esm";

const NUM_COLORS = 9;
function colorPicker() {
    let randomNum = Math.floor(Math.random() * NUM_COLORS);
    switch (randomNum){
        case 0:
            return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
        case 1:
            return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
        case 2:
            return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
        case 3:
            return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
        case 4:
            return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png"
        case 5:
            return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png"
        case 6:
            return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png"
        case 7:
            return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gray.png"
        case 8:
            return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png"
        default:
            return "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
    }
}

export default function MapComponent(){
    let [context, setContext] = useContext(AllContext);

    return(
      <>

          <MapContainer style={{ height: '85vh', width: '80%' }} center={[ 52.51658, 13.381]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              {context.allLocations != null && context.allLocations.map((currentLocation) =>
                  (
                      currentLocation.lat != null && currentLocation.lon != null &&
                  <Marker icon={new Icon({iconUrl: colorPicker(), iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]})} position={[ currentLocation.lat, currentLocation.lon]}>
                      <Popup>
                          {currentLocation.name} <br /> {currentLocation.address}
                      </Popup>
                  </Marker>
                  ))
              }
          </MapContainer>

      </>

    );
}

