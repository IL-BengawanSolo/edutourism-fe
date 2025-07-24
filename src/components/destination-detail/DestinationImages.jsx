import React, { useState } from "react";
import useFetchDestinationImages from "@/api/useFetchDestinationImages";
import { SpinnerCircular } from "spinners-react";
import CarouselGallery from "@/components/carousel-gallery.jsx";
import { Button } from "../ui/button.jsx";
import { X } from "lucide-react";

const fallbackImages = [
  "/images/default-placeholder.png",
  "/images/default-placeholder.png",
  "/images/default-placeholder.png",
  "/images/default-placeholder.png",
  "/images/default-placeholder.png",
];

const DestinationImages = ({ destination_uuid }) => {
  const { images, loading, error } =
    useFetchDestinationImages(destination_uuid);

  // Modal state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  if (error) {
    return (
      <div className="flex h-[300px] items-center justify-center text-red-500">
        Gagal memuat gambar destinasi.
      </div>
    );
  }

  // Siapkan array gambar, fallback ke lokal jika data dari backend kurang dari 5
  const displayImages = Array(5)
    .fill(null)
    .map((_, i) =>
      images && images[i] && images[i].image_url
        ? {
            src: images[i].image_url,
            alt: images[i].alt || `Foto ${i + 1}`,
            width: 800,
            height: 600,
          }
        : {
            src: fallbackImages[i],
            alt: `Placeholder ${i + 1}`,
            width: 800,
            height: 600,
          },
    );

  // Modal overlay
  const Modal = ({ open, onClose, children }) =>
    !open ? null : (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        onClick={onClose}
        aria-modal="true"
        tabIndex={-1}
      >
        <div
          className="relative w-full max-w-3xl"
          onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal content
        >
          <Button
            className="absolute top-2 right-2 z-10 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={onClose}
            aria-label="Tutup"
            size="icon"
          >
            <X className="h-6 w-6" />
          </Button>
          {children}
        </div>
      </div>
    );

  return (
    <>
      <div
        id="general-info"
        className="grid h-[340px] grid-cols-2 gap-2 md:h-[300px]"
      >
        {/* Kiri: gambar utama */}
        <div className="col-span-1 row-span-1 h-full">
          <img
            src={displayImages[0].src}
            alt={displayImages[0].alt}
            className="h-[300px] w-full cursor-pointer object-cover"
            onClick={() => {
              setActiveIndex(0);
              setGalleryOpen(true);
            }}
          />
        </div>
        {/* Kanan: 4 grid (2x2) */}
        <div className="col-span-1 grid h-[300px] grid-cols-2 grid-rows-2 gap-2">
          {displayImages.slice(1).map((img, idx) => (
            <div key={idx} className="group relative h-full w-full">
              <img
                src={img.src}
                alt={img.alt}
                className={`h-full w-full cursor-pointer object-cover ${
                  idx === 3 ? "transition group-hover:brightness-60" : ""
                }`}
                onClick={() => {
                  setActiveIndex(idx + 1);
                  setGalleryOpen(true);
                }}
              />
              {idx === 3 && (
                <button
                  className="absolute right-2 bottom-2 cursor-pointer rounded-lg bg-black/60 px-3 py-1 text-xs text-white hover:bg-black/70"
                  onClick={() => {
                    setActiveIndex(0);
                    setGalleryOpen(true);
                  }}
                >
                  Lihat semua foto
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Modal Gallery */}
      <Modal open={galleryOpen} onClose={() => setGalleryOpen(false)}>
        <CarouselGallery
          images={displayImages}
          initialIndex={activeIndex}
          onClose={() => setGalleryOpen(false)}
        />
      </Modal>
    </>
  );
};

export default DestinationImages;
