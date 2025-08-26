import React from "react";

const ImageModal = ({ previewImage, setPreviewImage }) => {
  if (!previewImage) return null;

  return (
    <div className="image-modal-backdrop" onClick={() => setPreviewImage(null)}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setPreviewImage(null)} className="close-button">
          ×
        </button>
        <img
          alt="Preview"
          src={previewImage}
          style={{ maxWidth: "85vw", maxHeight: "90vh", borderRadius: "10px" }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
