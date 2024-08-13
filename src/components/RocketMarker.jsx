import { useState, useEffect, useRef } from "react";
import { Marker, useMap } from "react-leaflet";
import { createRotatedIcon } from "./RotatedRocketIcon";

//asset
import rocket from "../assets/rocket.png";

function RocketMarker({ startPoint, endPoint, speed }) {
  // state to hold current position of the rocket
  const [position, setPosition] = useState(startPoint);
  // Get reference to the map
  const map = useMap();
  // ref to hold the marker instance
  const markerRef = useRef(null);

  useEffect(() => {
    if (!markerRef.current) return;

    // create a rotated icon for the rocket
    const rocketIcon = createRotatedIcon(rocket, 60, true);

    // setting the icon for the marker
    markerRef.current.setIcon(rocketIcon);

    // calculating distance and duration for the animation
    const latitudeDiff = endPoint[0] - startPoint[0];
    const longitudeDiff = endPoint[1] - startPoint[1];
    const distance = Math.sqrt(
      latitudeDiff * latitudeDiff + longitudeDiff * longitudeDiff
    );
    const duration = (distance / speed) * 3600;
    const startTime = Date.now();

    // Animation function
    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsedTime / duration, 1);

      // Calculating new position
      const newLat = startPoint[0] + latitudeDiff * progress;
      const newLng = startPoint[1] + longitudeDiff * progress;

      // updating marker position
      setPosition([newLat, newLng]);

      // continuing animation if not completed
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // starting the animation
    animate();
  }, [startPoint, endPoint, speed, map]);

  return <Marker position={position} ref={markerRef} />;
}

export { RocketMarker };

//RocketMarker component for animating the rocket's movement
//startPoint - Starting coordinates [lat, lng]
//endPoint - Ending coordinates [lat, lng]
//speed - Speed of the rocket in km/h
