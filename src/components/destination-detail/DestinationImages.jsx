import React from "react";
import useFetchDestinationImages from "@/api/useFetchDestinationImages";
import { SpinnerCircular } from "spinners-react";

const fallbackImages = [
  "/src/assets/images/default-placeholder.png",
  "/src/assets/images/default-placeholder.png",
  "/src/assets/images/default-placeholder.png",
  "/src/assets/images/default-placeholder.png",
  "/src/assets/images/default-placeholder.png",
];

const DestinationImages = ({ destination_uuid }) => {
  const { images, loading, error } =
    useFetchDestinationImages(destination_uuid);

  // Jika loading
  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <SpinnerCircular
          size={48}
          thickness={100}
          color="#3b82f6"
          secondaryColor="#e5e7eb"
        />
        <span className="ml-2 text-neutral-500">Memuat gambar...</span>
      </div>
    );
  }

  // Jika error
  if (error) {
    return (
      <div className="flex h-[300px] items-center justify-center text-red-500">
        Gagal memuat gambar destinasi.
      </div>
    );
  }

  // Siapkan array 5 gambar, fallback ke lokal jika data dari backend kurang dari 5
  const displayImages = Array(5)
    .fill(null)
    .map((_, i) =>
      images && images[i] && images[i].image_url
        ? images[i].image_url
        : fallbackImages[i]
    );

  return (
    <div
      id="general-info"
      className="grid h-[340px] grid-cols-2 gap-2 md:h-[300px]"
    >
      {/* Kiri: gambar utama */}
      <div className="col-span-1 row-span-1 h-full">
        <img
          src={displayImages[0]}
          alt=""
          className="h-[300px] w-full object-cover"
        />
      </div>
      {/* Kanan: 4 grid (2x2) */}
      <div className="col-span-1 grid h-[300px] grid-cols-2 grid-rows-2 gap-2">
        <img
          src={displayImages[1]}
          alt=""
          className="h-full w-full object-cover"
        />
        <img
          src={displayImages[2]}
          alt=""
          className="h-full w-full object-cover"
        />
        <img
          src={displayImages[3]}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="relative h-full w-full">
          <img
            src={displayImages[4]}
            alt=""
            className="h-full w-full object-cover"
          />
          <button className="absolute right-2 bottom-2 rounded-lg bg-black/60 px-3 py-1 text-xs text-white">
            Lihat semua foto
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationImages;