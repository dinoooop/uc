import React from "react";

interface CropPreviewProps {
  imgUrl: string;
  crop: {
    x: number;      // in %
    y: number;      // in %
    width: number;  // in %
    height: number; // in %
  };
}

const CropPreview: React.FC<CropPreviewProps> = ({ imgUrl, crop }) => {
  return (
    <div
      className="crop-preview"
      style={{
        position: "relative",
        width: "300px", // desired preview size
        height: `${(crop.height / crop.width) * 300}px`, // keep aspect ratio
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src={imgUrl}
        alt="Cropped preview"
        style={{
          position: "absolute",
          top: `-${crop.y}%`,
          left: `-${crop.x}%`,
          width: `${100 / (crop.width / 100)}%`,   // scale image so that crop fits
          height: `${100 / (crop.height / 100)}%`, // scale accordingly
          maxWidth: "none",
          maxHeight: "none",
          objectFit: "none",
        }}
      />
    </div>
  );
};

export default CropPreview;
