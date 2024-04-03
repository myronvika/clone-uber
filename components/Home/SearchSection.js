import React, { useContext, useState } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "/context/SourceContext";
import { DestinationContext } from "/context/DestinationContext";
import CarListOptions from "./CarListOptions"; 
import { Loader } from "@googlemaps/js-api-loader";

function SearchSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, setDistance] = useState();

  const loader = new Loader({
    apiKey: 'AIzaSyCyOwlhXLXUjNkdivqk15jWeWgzCrqg-2g',
    version: "weekly",
    libraries: ["geometry"]
  });

  const calculateDistance = () => {
    loader.load().then(() => {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        { lat: parseFloat(source.lat), lng: parseFloat(source.lng) },
        { lat: parseFloat(destination.lat), lng: parseFloat(destination.lng) }
      );
  
      console.log(dist * 0.000621374);
      setDistance(dist * 0.000621374);
    });
  }

  return (
    <div>
      <div className="p-2 md:p-6 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold">Get a ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />

        <button
          className="p-3 bg-black w-full mt-5 text-white rounded-lg"
          onClick={() => calculateDistance()}
        >Search </button>
      </div>
      {distance ? <CarListOptions distance={distance} /> : null}
    </div>
  );
}

export default SearchSection;
