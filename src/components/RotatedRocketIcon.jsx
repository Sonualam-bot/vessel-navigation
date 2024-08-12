import L from "leaflet";

const createRotatedIcon = (iconUrl, rotation, isRocket = false) => {
  return L.divIcon({
    className: `custom-icon ${isRocket ? "rocket-icon" : ""}`,
    html: `<img src="${iconUrl}" style="transform: rotate(${rotation}deg); width: 20px; height: 70px;">`,
    iconSize: [20, 70],
    iconAnchor: [10, 35],
  });
};

export { createRotatedIcon };

//this component will create rotated icon for markers
//iconUrl - the url of the icon
// rotation - rotation angle in degrees
//flag to check whether the icon if for the rocket
//L- divIcon coming from leaflet
