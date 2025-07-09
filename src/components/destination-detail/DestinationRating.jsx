import React from "react";
import { Star, StarHalf, Star as StarOutline } from "lucide-react"; // optional icon library

const reviews = [
  {
    name: "Arya Wijaya",
    rating: 4,
    comment:
      "Sangat menyenangkan, bertemu dengan warga yang ramah, pilihan batik dengan beragam pilihan jenis dan harga, tempat makan yang lengkap, dan suasana kampung di tengah kota yang masih terjaga keasliannya.",
  },
  {
    name: "Boy",
    rating: 4,
    comment:
      "Salah satu tempat wisata yang ada di daerah Laweyan. Tempatnya lumayan estetik dan htmnya free. Namun, tempat parkirnya sempit dan kurang tertata.",
  },
  {
    name: "Belsan",
    rating: 5,
    comment:
      "Suka bgt vibenyayaa kaya adem gituuuu, tiap sudutnya bener2 estetik bgt cocok buat suka foto 📸 banyak cafe lokal, resto, dan batik shop. Kalo ke solo lagi, ak mau balik kesiniiii🙈",
  },
];

const renderStars = (count) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= count ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>,
    );
  }
  return stars;
};

const DestinationRating = () => {
  return (
    <section className="max-container mx-auto mt-10 w-full sm:w-10/12">
      <div className="flex flex-col gap-10 rounded-lg bg-white p-6 shadow-md sm:flex-row sm:gap-4">
        {/* Overview */}
        <div className="w-full rounded-xl bg-[#f3f6ff] p-6 sm:w-1/3">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Overview</h3>
          <div className="flex items-center gap-2 text-5xl font-bold text-gray-900">
            4,8
          </div>
          <div className="mt-2 mb-4 flex">{renderStars(4)}</div>

          <div className="space-y-2 text-sm">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span>{star}</span>
                <div className="h-2 w-40 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full ${
                      star === 5 ? "w-[80%]" : star === 4 ? "w-[20%]" : "w-[0%]"
                    } bg-yellow-400`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Review */}
        <div className="w-full sm:w-2/3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">All Review</h3>
            <button className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
              Add Review
            </button>
          </div>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index}>
                <h4 className="font-bold text-gray-800">{review.name}</h4>
                <div className="mt-1 mb-2 flex">
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationRating;
