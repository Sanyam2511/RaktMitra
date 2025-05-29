import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import axios from "axios";

const MapComponent = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bloodbank/nearby?longitude=${location.lng}&latitude=${location.lat}&radius=10`)
      .then((response) => setBloodBanks(response.data.bloodBanks))
      .catch((error) => console.error(error));
  }, [location]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap center={location} zoom={10} mapContainerStyle={{ height: "400px", width: "100%" }}>
        {bloodBanks.map((bank) => (
          <Marker key={bank._id} position={{ lat: bank.location.coordinates[1], lng: bank.location.coordinates[0] }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
