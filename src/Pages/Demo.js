import React from "react";
import { useState } from "react";

const Demo = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Uploaded"
            // style={{ maxWidth: "300px" }}
            className="w-20 h-20"
          />
        )}
      </div>
    </div>
  );
};

export default Demo;
