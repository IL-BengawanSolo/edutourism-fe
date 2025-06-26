import React from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";

import geoJsonData from "../lib/solo-raya.json";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Badge } from "./ui/badge.jsx";
import { Separator } from "./ui/separator.jsx";
import { getPriceLabel } from "@/lib/utils.js";

const DestinationMap = ({ destinations, center = [-7.560421, 110.826454] }) => {
  // SVG Iconly Location sebagai string (tanpa background)
  const svgIcon = encodeURIComponent(`
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(3.5,2)" fill="#0163D2">
      <path d="M8.49344564,0 C13.1561184,0 17,3.71789185 17,8.31775805 C17,10.6356906 16.1570081,12.787628 14.7695,14.611575 C13.2388042,16.6235165 11.3521561,18.3764655 9.22854262,19.7524254 C8.74251142,20.0704162 8.3038733,20.0944155 7.77044902,19.7524254 C5.63473516,18.3764655 3.74808708,16.6235165 2.23050003,14.611575 C0.84198351,12.787628 0,10.6356906 0,8.31775805 C0,3.71789185 3.84388161,0 8.49344564,0 Z M8.49344564,5.77683196 C6.95165787,5.77683196 5.6942286,7.04779499 5.6942286,8.57675052 C5.6942286,10.1177057 6.95165787,11.3296704 8.49344564,11.3296704 C10.0362418,11.3296704 11.3057714,10.1177057 11.3057714,8.57675052 C11.3057714,7.04779499 10.0362418,5.77683196 8.49344564,5.77683196 Z"/>
    </g>
  </svg>
`);

  const createDivIcon = (label) =>
    window.L.divIcon({
      className: "custom-marker",
      html: `
        <div style="
          display: flex;
          align-items: center;
          font-family: 'Montserrat', sans-serif;
          min-height: 48px;
        ">
          <img src="data:image/svg+xml,${svgIcon}" width="24" height="24" style="display:block; filter: drop-shadow(0 2px 4px rgba(1,99,210,0.10));"/>
            <span style="
              font-size: 12px;
              font-weight: 500;
              color: #0163D2;
              letter-spacing: -0.1em;
              white-space: nowrap;
              text-shadow: 0 1px 2px #fff;
              background: rgba(255, 255, 255, 0.8); /* biru muda transparan */
              //  background: rgba(227, 240, 255, 0.7); /* biru muda transparan */
              border-radius: 999px;
              padding: 1px 4px;
              display: inline-block;
            ">
              ${label}
            </span>
        </div>
      `,
      // anchor X = padding kiri (6) + setengah icon (12), anchor Y = tinggi icon (24)
      iconAnchor: [12, 32], // [18, 32] agar anchor tetap di bawah icon, bukan di bawah label
    });

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
      weight: 0.2,
      opacity: 1,
      fillColor: fillColors[feature.properties.NAME_2] || "#FFFFFF", // Default putih jika tidak ada warna
      fillOpacity: 0.2, // Transparansi area arsiran
    };
  };

  // Normalize destinations: support array or single object
  const destinationList = Array.isArray(destinations)
    ? destinations
    : destinations
      ? [destinations]
      : [];
  console.log(destinations);
  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom={false} minZoom={9}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains={"abcd"}
        detectRetina={true}
      />

      <GeoJSON data={geoJsonData} style={getStyle} />

      <MarkerClusterGroup showCoverageOnHover={false}>
        {destinationList.map((destination) => (
          <Marker
            key={destination.slug}
            position={[destination.latitude, destination.longitude]}
            icon={createDivIcon(destination.name)}
          >
            <Popup >
              <div className="font-montserrat flex min-w-xs flex-col pr-4">
                <h3 className="text-neutral-black text-xl font-bold">
                  {destination.name}
                </h3>

                <Separator className="mt-2" />

                <div className="my-2 flex flex-col">
                  <div className="flex flex-row flex-wrap gap-2">
                    {destination.categories.map((cat) => (
                      <Badge key={cat} className="text-xs" variant="custom">
                        {cat || []}
                      </Badge>
                    ))}

                    {destination.place_types.map((ptypes) => (
                      <Badge
                        key={ptypes}
                        className="text-xs"
                        variant="custom_secondary"
                      >
                        {ptypes || []}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-neutral-dark-grey !mt-2 !mb-0 font-medium">
                    <span className="hidden md:inline">Harga Tiket Masuk </span>
                    <span className="font-semibold">
                      {getPriceLabel(
                        destination.ticket_price_min,
                        destination.ticket_price_max,
                      )}
                    </span>
                  </p>
                </div>

                <Separator />
                <p className="!my-2 line-clamp-3 text-sm text-neutral-700">
                  {destination.description}
                </p>

                <img
                  src="/src/assets/images/kampung-batik-laweyan.jpeg"
                  alt=""
                />
                <a
                  href={`/destinations/${destination.slug}`}
                  className="text-primary mt-3 text-sm font-semibold hover:underline"
                >
                  Lihat Detail
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default DestinationMap;
