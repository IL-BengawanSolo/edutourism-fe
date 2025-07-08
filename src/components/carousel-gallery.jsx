import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CarouselGallery({ images, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for main carousel
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      else if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full rounded-lg bg-white p-4 shadow-lg md:p-6">
      {/* Main carousel */}
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative aspect-video w-full overflow-hidden">
          {images.map((image, index) => (
            <div
              key={`slide-${index}`}
              className={`absolute inset-0 transform transition-all duration-500 ease-in-out ${
                index === currentIndex
                  ? "translate-x-0 opacity-100"
                  : index < currentIndex
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* Navigation buttons */}
        <Button
          size="icon"
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/60 px-3 py-1 text-xs text-white hover:bg-black/70"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/60 px-3 py-1 text-xs text-white hover:bg-black/70"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
        {/* Caption */}
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-sm text-white">
          {images[currentIndex].alt}
        </div>
      </div>
      {/* Thumbnails */}
      <div className="mt-4 flex gap-2 overflow-x-auto px-2 py-2">
        {images.map((image, index) => (
          <utton
            key={`thumb-${index}`}
            className={`relative h-20 w-20 flex-shrink-0 transition-all duration-200 cursor-pointer ${
              index === currentIndex
                ? "ring-primary ring-2 ring-offset-2"
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="h-full w-full rounded-sm object-cover"
            />
          </utton>
        ))}
      </div>
    </div>
  );
}
