import { Location } from "react-iconly";
import { MapIcon } from "lucide-react";
import DestinationMap from "@/components/DestinationMap.jsx";

const DestinationLocation = ({ destination }) => (
  <div
    id="location"
    className="col-span-1 flex flex-col gap-4 rounded-2xl bg-white p-8 lg:col-span-4"
  >
    <h1 className="text-2xl font-bold">Lokasi</h1>
    <p className="text-neutral-black mt-4 mb-2 flex items-center gap-2 text-base font-medium">
      <Location set="bold" className="text-pr-blue-800 size-10" />
      {destination.address}
    </p>
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-pr-blue-600 hover:bg-pr-blue-600/90 mb-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow transition"
    >
      <MapIcon className="text-base text-white" />
      <span>Lihat di Google Maps</span>
    </a>
    <div className="z-0 h-[360px]">
      <DestinationMap
        destinations={destination}
        center={[destination.latitude, destination.longitude]}
      />
    </div>
  </div>
);
export default DestinationLocation;
