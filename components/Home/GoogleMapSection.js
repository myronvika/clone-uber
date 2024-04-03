import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import { SourceContext } from "/context/SourceContext";
import { DestinationContext } from "/context/DestinationContext";
import sourseImage from "/img/sourse.png";

function GoogleMapSelection() {
  const containerStyle = {
    width: "100%",
    height: window.innerHeight * 0.8,
  };

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [map, setMap] = React.useState(null);
  const [directionRoutePoints, setDestinationRoutePoints] = useState([]);
  useEffect(() => {
    if (source?.length != [] && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
    if (source.length != [] && destination.length != []) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination?.length != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
    if ((source.length = [] && destination.length != [])) {
      directionRoute();
    }
  }, [destination]);

  function directionRoute() {
    const DirectionService = new google.maps.DirectionsService();
    console.log("DIE");
    DirectionService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDestinationRoutePoints(result);
        } else {
          console.error("Error");
        }
      }
    );
  }

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "2ca17bff466863eb" }}
    >
      {source.length != [] ? (
        <MarkerF position={{ lat: source.lat, lng: source.lng }}>
          <OverlayView
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[18px]">{source.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      ) : null}
      {destination.length != [] ? (
        <MarkerF position={{ lat: destination.lat, lng: destination.lng }}>
          <OverlayView
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[18px]">{destination.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      ) : null}

      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions: {
            strokeColor: "#e61919",
            strokeWeight: 5,
          },
          suppressMarkers: true,
        }}
      />
    </GoogleMap>
  );
}

export default GoogleMapSelection;
