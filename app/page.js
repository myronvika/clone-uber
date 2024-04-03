"use client";
import React, { useState } from "react"; 
import { LoadScript } from "@react-google-maps/api";
import SearchSection from "/components/Home/SearchSection";
import GoogleMapSection from "/components/Home/GoogleMapSection";
import { SourceContext } from "/context/SourceContext";
import { DestinationContext } from "/context/DestinationContext";



export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
          libraries={["places"]}
          googleMapsApiKey={"AIzaSyCyOwlhXLXUjNkdivqk15jWeWgzCrqg-2g"}
        >
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <SearchSection />
            </div>
            <div className="col-span-2">
              <GoogleMapSection />
            </div>
          </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
