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

  return <img ref={imgRef} src={src} alt={alt} style={style} className={className} />;
};

export default AutoSizeResponsiveAsset;
