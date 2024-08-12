import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// assets
import location1Img from "./assets/location1.png";
import location2Img from "./assets/location2.png";
import { RocketMarker } from "./components/RocketMarker";

// CSS styles to control z-index of markers
const styles = `
  .leaflet-marker-icon {
    z-index: 1000 !important;
  }
    .rocket-icon {
  z-index: 1001 !important;
}`;

function App() {
  // predefined start and end points for the rocket's journey
  const startPoint = [22.1696, 91.4996];
  const endPoint = [22.2637, 91.7159];
  const speed = 20; // Speed in km/h

  // default png for start and end location
  const location1Icon = L.icon({
    iconUrl: location1Img,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  const location2Icon = L.icon({
    iconUrl: location2Img,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <>
      {/* to add z-index for the rocket png  */}
      <style>{styles}</style>
      {/* creating the map container */}
      <MapContainer
        center={startPoint}
        zoom={10}
        style={{ height: "100vh", width: "100%" }}
      >
        {/* adding the map tile layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* adding markers for start and end locations */}
        <Marker position={startPoint} icon={location1Icon} />
        <Marker position={endPoint} icon={location2Icon} />
        {/* adding the animated rocket marker */}
        <RocketMarker
          startPoint={startPoint}
          endPoint={endPoint}
          speed={speed}
        />
      </MapContainer>
    </>
  );
}

export default App;
