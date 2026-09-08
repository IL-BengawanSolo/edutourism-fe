import React, { useEffect, useRef, useState } from "react";

const calcPercent = (value, base) =>
  typeof value === "number" ? (value / base) * 100 : null;

const AutoSizeResponsiveAsset = ({
  src,
  alt,
  top,
  bottom,
  left,
  right,
  className = "",
}) => {
  const imgRef = useRef(null);
  const [size, setSize] = useState({ width: null, height: null });

  useEffect(() => {
    const handleLoad = () => {
      if (imgRef.current) {
        const { naturalWidth, naturalHeight } = imgRef.current;
        setSize({ width: naturalWidth, height: naturalHeight });
      }
    };

    const img = imgRef.current;
    if (img && img.complete) {
      handleLoad(); // already loaded
    } else if (img) {
      img.addEventListener("load", handleLoad);
    }

    return () => {
      if (img) {
        img.removeEventListener("load", handleLoad);
      }
    };
  }, [src]);

  // const vw = calcPercent(size.width, 1440);
  const vh = calcPercent(size.height, 900);
  const topPercent = calcPercent(top, 900);
  const bottomPercent = calcPercent(bottom, 900);
  const leftPercent = calcPercent(left, 1440);
  const rightPercent = calcPercent(right, 1440);

  const style = {
    // position: "absolute",
    // width: vw ? `${vw}vw` : undefined,
    height: vh ? `${vh}vh` : undefined,
    top: topPercent !== null ? `${topPercent}%` : undefined,
    bottom: bottomPercent !== null ? `${bottomPercent}%` : undefined,
    left: leftPercent !== null ? `${leftPercent}%` : undefined,
    right: rightPercent !== null ? `${rightPercent}%` : undefined,
  };

  const isDecorative = alt?.startsWith("cloud") || alt?.startsWith("path");
  const webpSrc =
    src?.endsWith(".svg") || src?.endsWith(".webp")
      ? null
      : src?.replace(/\.(png|jpe?g)$/i, ".webp");
  const altText = isDecorative ? "" : alt;

  // Use eager for hero above-the-fold assets for LCP, lazy would delay
  // Hero assets are decorative but part of initial viewport
  const isHero = className?.includes("absolute");

  if (webpSrc && webpSrc !== src) {
    return (
      <img
        ref={imgRef}
        src={webpSrc}
        alt={altText}
        style={style}
        className={className}
        loading={isHero ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={isHero ? "high" : "auto"}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = src;
        }}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={altText}
      style={style}
      className={className}
      loading={isHero ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={isHero ? "high" : "auto"}
    />
  );
};

export default AutoSizeResponsiveAsset;
