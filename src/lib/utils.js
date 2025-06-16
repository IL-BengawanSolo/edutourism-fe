import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(value) {
  if (!value) return "0";
  return "Rp" + Number(value).toLocaleString("id-ID");
}

export function getPriceLabel(minPrice, maxPrice) {
  const min = Number(minPrice);
  const max = Number(maxPrice);
  const isFree =
    (min === 0 || !minPrice) &&
    (max === 0 || !maxPrice);

  if (isFree) {
    return "Gratis";
  } else if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `${formatRupiah(minPrice)} - ${formatRupiah(maxPrice)}`;
  } else if (minPrice) {
    return formatRupiah(minPrice);
  } else {
    return "-";
  }
}