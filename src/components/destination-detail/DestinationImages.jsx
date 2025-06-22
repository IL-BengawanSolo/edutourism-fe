import React from "react";

const images = [
  "/src/assets/images/laweyan/laweyan1.jpg", // 0: utama kiri
  "/src/assets/images/laweyan/laweyan2.jpg", // 1: kanan atas kiri
  "/src/assets/images/laweyan/laweyan3.jpg", // 2: kanan atas kanan
  "/src/assets/images/laweyan/laweyan4.jpg", // 3: kanan bawah kiri
  "/src/assets/images/laweyan/laweyan5.jpg", // 4: kanan bawah kanan
];

const DestinationImages = () => {
  return (
    <div
      id="general-info"
      className="grid h-[340px] grid-cols-2 gap-2 md:h-[300px]"
    >
      {/* Kiri: gambar utama */}
      <div className="col-span-1 row-span-1 h-full">
        <img src={images[0]} alt="" className="h-[300px] w-full object-cover" />
      </div>
      {/* Kanan: 4 grid (2x2) */}
      <div className="col-span-1 grid h-[300px] grid-cols-2 grid-rows-2 gap-2">
        <img src={images[1]} alt="" className="h-full w-full object-cover" />
        <img src={images[2]} alt="" className="h-full w-full object-cover" />
        <img src={images[3]} alt="" className="h-full w-full object-cover" />
        <div className="relative h-full w-full">
          <img src={images[4]} alt="" className="h-full w-full object-cover" />

          <button className="absolute right-2 bottom-2 rounded-lg bg-black/60 px-3 py-1 text-xs text-white">
            Lihat semua foto
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationImages;
