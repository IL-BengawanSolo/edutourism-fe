import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge.jsx";
import { Location } from "react-iconly";
import DestinationMap from "@/components/DestinationMap.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import CarouselDestinationRow from "@/components/CarouselDestinationRow.jsx";
import { MapIcon } from "lucide-react";
import useFetchDestinationBySlug from "@/api/useFetchDestinationBySlug.js";
import { useParams } from "react-router-dom";

const images = [
  "/src/assets/images/laweyan/laweyan1.jpg", // 0: utama kiri
  "/src/assets/images/laweyan/laweyan2.jpg", // 1: kanan atas kiri
  "/src/assets/images/laweyan/laweyan3.jpg", // 2: kanan atas kanan
  "/src/assets/images/laweyan/laweyan4.jpg", // 3: kanan bawah kiri
  "/src/assets/images/laweyan/laweyan5.jpg", // 4: kanan bawah kanan
];

const openingHours = {
  Senin: "08:00-20:00",
  Selasa: "08:00-20:00",
  Rabu: "08:00-20:00",
  Kamis: "08:00-20:00",
  Jumat: "08:00-20:00",
  Sabtu: "08:00-20:00",
  Minggu: "08:00-20:00",
};

const facilities = [
  "Parkir",
  "Toko Batik",
  "Museum Batik",
  "Kuliner",
  "Belajar Membatik",
  "Terdapat Bangku Taman untuk pengunjung bersantai",
];

const destinations = [
  {
    id: "1",
    name: "Kampung Batik Laweyan",
    latitude: -7.56988389999999,
    longitude: 110.7968942,
    description:
      "Kampung Batik Laweyan di Kota Solo adalah kawasan wisata batik yang telah ada sejak Kerajaan Pajang tahun 1546 M. Berlokasi di lahan seluas 24 hektar, kawasan ini terdiri dari tiga blok dan dihuni oleh ratusan pengrajin batik dengan berbagai motif dan harga. Selain menjadi sentra batik, Laweyan juga menyimpan kekayaan arsitektur Jawa kuno.",
  },
];

/**
 * Smooth scroll to a target element with offset (for sticky navbar)
 * @param {string} id - Element id
 * @param {number} offset - Negative offset in px (default -80)
 */
function scrollToWithOffset(id, offset = -60) {
  const target = document.getElementById(id);
  if (target) {
    const y = target.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

const DestinationDetail = () => {
  const { slug } = useParams();
  const { destination, loading, error } = useFetchDestinationBySlug(slug);

  return (
    <>
      <section className="max-container mx-auto w-full sm:w-10/12">
        <div
          id="general-info"
          className="grid h-[340px] grid-cols-2 gap-2 md:h-[300px]"
        >
          {/* Kiri: gambar utama */}
          <div className="col-span-1 row-span-1 h-full">
            <img
              src={images[0]}
              alt=""
              className="h-[300px] w-full object-cover"
            />
          </div>
          {/* Kanan: 4 grid (2x2) */}
          <div className="col-span-1 grid h-[300px] grid-cols-2 grid-rows-2 gap-2">
            <img
              src={images[1]}
              alt=""
              className="h-full w-full object-cover"
            />
            <img
              src={images[2]}
              alt=""
              className="h-full w-full object-cover"
            />
            <img
              src={images[3]}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="relative h-full w-full">
              <img
                src={images[4]}
                alt=""
                className="h-full w-full object-cover"
              />

              <button className="absolute right-2 bottom-2 rounded-lg bg-black/60 px-3 py-1 text-xs text-white">
                Lihat semua foto
              </button>
            </div>
          </div>
        </div>
        <div className="sticky top-0 z-10">
          <div className="rounded-none bg-white shadow-[0px_4px_10px_-4px_rgba(0,0,0,0.16)] sm:rounded-b-2xl">
            <Tabs defaultValue="general-info" className="w-full">
              <TabsList className="flex w-full flex-wrap items-center gap-1 rounded-none bg-white p-2 sm:rounded-b-2xl">
                <TabsTrigger
                  value="general-info"
                  className="min-w-[90px] flex-1 text-xs sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToWithOffset("general-info", -72);
                  }}
                >
                  Info Umum
                </TabsTrigger>
                <TabsTrigger
                  value="facilities"
                  className="min-w-[90px] flex-1 text-xs sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToWithOffset("facilities");
                  }}
                >
                  Fasilitas
                </TabsTrigger>

                <TabsTrigger
                  value="location"
                  className="min-w-[90px] flex-1 text-xs sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToWithOffset("location");
                  }}
                >
                  Lokasi
                </TabsTrigger>
                <TabsTrigger
                  value="opening-hours"
                  className="min-w-[90px] flex-1 text-xs sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToWithOffset("opening-hours");
                  }}
                >
                  Jam Buka
                </TabsTrigger>
                <TabsTrigger
                  value="gallery"
                  className="min-w-[90px] flex-1 text-xs sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToWithOffset("gallery");
                  }}
                >
                  Galeri
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {/* <div className="bg-neutral-bg p-1 sm:p-2"></div> */}
        </div>

        <div className="mt-4 mb-4 flex flex-col gap-4 rounded-none bg-white p-8 sm:rounded-2xl">
          <h1 className="text-4xl font-bold">Kampung Batik Loweyan</h1>
          <p className="text-neutral-grey flex items-center gap-2 text-base font-medium">
            <Location set="bold" className="text-neutral-grey" />
            Loweyan, Surakarta, Jawa Tengah
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge className="text-sm" variant="custom">
              Budaya
            </Badge>
            <Badge className="text-sm" variant="custom">
              Seni
            </Badge>
            <Badge className="text-sm" variant="custom">
              Kreativitas
            </Badge>
            <Separator orientation="vertical" className="mx-1 h-5" />
            <Badge className="text-sm" variant="custom_secondary">
              Kampung Batik
            </Badge>
          </div>
          <p className="text-neutral-black mt-4 text-xl font-bold">
            <span className="text-primary">Harga Tiket Masuk:</span> Rp25.000 -
            Rp50.000
          </p>

          <p className="text-neutral-black mt-4 text-base font-medium">
            Kampung Batik Laweyan di Kota Solo adalah kawasan wisata batik yang
            telah ada sejak Kerajaan Pajang tahun 1546 M. Berlokasi di lahan
            seluas 24 hektar, kawasan ini terdiri dari tiga blok dan dihuni oleh
            ratusan pengrajin batik dengan berbagai motif dan harga. Selain
            menjadi sentra batik, Laweyan juga menyimpan kekayaan arsitektur
            Jawa kuno.
          </p>
        </div>
        <div
          id="facilities"
          className="mt-4 mb-4 flex flex-col gap-4 rounded-none bg-white p-8 sm:rounded-2xl"
        >
          <h1 className="text-2xl font-bold">Fasilitas</h1>
          <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
            {facilities.map((label) => (
              <div
                key={label}
                className="bg-neutral-bg flex min-h-[36px] items-center gap-2 rounded-xl px-3 py-2"
              >
                <span
                  className="bg-neutral-grey flex items-center justify-center rounded-md"
                  style={{ width: 24, height: 24, minWidth: 24, minHeight: 24 }}
                >
                  {/* General icon */}
                  <i className="fa-solid fa-circle-info text-primary text-base"></i>
                </span>
                <span className="text-sm font-medium break-words text-neutral-800">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="mt-4 mb-4 flex flex-col gap-4 rounded-none bg-white p-8 sm:rounded-2xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="col-span-3 h-[calc(100vh-12rem)]">
            <h1 className="text-2xl font-bold">Lokasi</h1>
            <p className="text-neutral-black mt-4 mb-4 flex items-center gap-2 text-base font-medium">
              <Location set="bold" className="text-pr-blue-800 size-10" />
              Loweyan, Surakarta, Jawa Tengah Jl. Dr. Rajiman No.521, Laweyan,
              Kec. Laweyan, Kota Surakarta, Jawa Tengah 57148
            </p>
            <DestinationMap destinations={destinations} />
          </div>
          <div className="col-span-2">
            <h1 className="text-2xl font-bold">Jam Buka</h1>
          </div>
        </div>
      </div> */}

        <div className="mt-4 mb-4 grid grid-cols-1 gap-4 rounded-none lg:grid-cols-6">
          <div
            id="location"
            className="col-span-1 flex flex-col gap-4 rounded-2xl bg-white p-8 lg:col-span-4"
          >
            <h1 className="text-2xl font-bold">Lokasi</h1>
            <p className="text-neutral-black mt-4 mb-2 flex items-center gap-2 text-base font-medium">
              <Location set="bold" className="text-pr-blue-800 size-10" />
              Loweyan, Surakarta, Jawa Tengah Jl. Dr. Rajiman No.521, Laweyan,
              Kec. Laweyan, Kota Surakarta, Jawa Tengah 57148
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=-7.5698839,110.7968942"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pr-blue-600 hover:bg-pr-blue-600/90 mb-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow transition"
            >
              <MapIcon className="text-base text-white" />
              <span>Lihat di Google Maps</span>
            </a>
            <div className="z-0 h-[360px]">
              <DestinationMap destinations={destinations} />
            </div>
          </div>
          <div
            id="opening-hours"
            className="col-span-1 flex flex-col gap-4 rounded-2xl bg-white p-8 lg:col-span-2"
          >
            <h1 className="text-2xl font-bold">Jam Buka</h1>
            <div className="mt-2 flex flex-col gap-2">
              {Object.entries(openingHours).map(([day, time]) => (
                <div
                  key={day}
                  className="bg-pr-blue-50 flex items-center justify-between rounded-lg px-3 py-2"
                >
                  <span className="font-semibold text-neutral-800">{day}</span>
                  <span className="text-primary font-semibold">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="max-container mx-auto mt-10 mb-40 w-10/12">
        <div className="flex flex-col justify-center gap-6 sm:flex-row sm:items-center">
          <h1 className="text-center text-2xl font-bold sm:text-4xl">
            Tempat Wisata Serupa
          </h1>
        </div>
        <CarouselDestinationRow />
      </section>
    </>
  );
};

export default DestinationDetail;
