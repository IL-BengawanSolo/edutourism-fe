import React from "react";

/**
 * Renders a <picture> with WebP first, PNG/JPG fallback.
 * Falls back gracefully if WebP not supported or missing.
 */
export default function Picture({
  src,
  alt,
  className,
  loading = "lazy",
  decoding = "async",
  width,
  height,
  ...props
}) {
  const webpSrc =
    src?.endsWith(".svg") || src?.endsWith(".webp")
      ? null
      : src?.replace(/\.(png|jpe?g)$/i, ".webp");

  if (!webpSrc || webpSrc === src) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        width={width}
        height={height}
        {...props}
      />
    );
  }

  return (
    <img
      src={webpSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      width={width}
      height={height}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = src;
      }}
      {...props}
    />
  );
}
