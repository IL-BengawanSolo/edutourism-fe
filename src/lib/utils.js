import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(value) {
  if (!value) return "0";
  return "Rp" + Number(value).toLocaleString("id-ID");
}

export function getPriceLabel(minPrice, maxPrice, short = false) {
  const min = Number(minPrice);
  const max = Number(maxPrice);
  const isFree =
    (min === 0 || !minPrice) &&
    (max === 0 || !maxPrice);

  // Fungsi untuk menyingkat harga menjadi K
  const toK = (val) => {
    const num = Number(val);
    if (isNaN(num)) return val;
    if (num >= 1000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
    return num;
  };

  if (isFree) {
    return "Gratis";
  } else if (minPrice && maxPrice && minPrice !== maxPrice) {
    if (short) {
      return `${toK(min)} - ${toK(max)}`;
    }
    return `${formatRupiah(minPrice)} - ${formatRupiah(maxPrice)}`;
  } else if (minPrice) {
    if (short) {
      return toK(min);
    }
    return formatRupiah(minPrice);
  } else {
    return "-";
  }
}