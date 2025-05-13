import SearchBar from "@/components/SearchBar.jsx";
import React from "react";
import DestinationCard from "@/components/DestinationCard.jsx";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const Destination = () => {
  return (
    <div className="mt-0.5 mx-auto w-full max-w-10/12">
      {/* Search Bar */}
      <section className="sticky top-0 z-10 bg-neutral-bg py-6">
        <SearchBar />
      </section>

      {/* Main Layout */}
      <section className="grid grid-cols-1 gap-9 lg:grid-cols-2">
        {/* Destination Cards */}
        <div className="col-span-1 flex flex-col gap-4">
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
        </div>

        {/* Map */}
        <div className="col-span-1 sticky top-28 h-[calc(100vh-1rem)]">
          <MapContainer
            center={[-7.5675595,110.7954161]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-7.5675595,110.7954161]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default Destination;
