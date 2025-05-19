import SearchBar from "@/components/SearchBar.jsx";
import React from "react";
import DestinationCard from "@/components/DestinationCard.jsx";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useFetchDestinations from "@/api/useFetchDestinations.js";
import geoJsonData from "../lib/solo-raya.json";

const Destination = () => {
  const { destinations } = useFetchDestinations();

  console.log(destinations);

  // Fungsi untuk menentukan gaya berdasarkan atribut GeoJSON
  const getStyle = (feature) => {
    const fillColors = {
      Karanganyar: "#FFCCCC", // Merah muda
      Surakarta: "#CCFFCC", // Hijau muda
      Sukoharjo: "#CCCCFF", // Biru muda
      Boyolali: "#FFFFCC", // Kuning muda
      Klaten: "#FFCCFF", // Magenta muda
      Wonogiri: "#CCFFFF", // Cyan muda
      Sragen: "#FFD9B3", // Oranye muda
    };

    return {
      color: "#1B2559", // Outline hitam untuk semua daerah
      weight: 0.5,
      opacity: 1,
      fillColor: fillColors[feature.properties.NAME_2] || "#FFFFFF", // Default putih jika tidak ada warna
      fillOpacity: 0.3, // Transparansi area arsiran
    };
  };

  return (
    <div className="mx-auto mt-0.5 w-full max-w-10/12">
      {/* Search Bar */}
      <section className="bg-neutral-bg sticky top-0 z-10 py-6">
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
        <div className="sticky top-28 col-span-1 h-[calc(100vh-1rem)]">
          <MapContainer
            center={[-7.5675595, 110.7954161]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <GeoJSON data={geoJsonData} style={getStyle} />

            {destinations.map((destination) => (
              <Marker
                key={destination.id}
                position={[destination.latitude, destination.longitude]}
              >
                <Popup>
                  {destination.name} <br /> {destination.description}
                </Popup>
                <Tooltip
                  direction="top"
                  offset={[-8, -2]}
                  opacity={1}
                  interactive
                  permanent
                >
                  <span className="text-xs font-semibold text-neutral-700">
                    {destination.name}
                  </span>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default Destination;
