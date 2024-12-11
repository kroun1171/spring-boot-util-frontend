import React, { useState, useEffect } from "react";

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  // Function to fetch the random image URL
  const fetchRandomImage = async () => {
    try {
      const response = await fetch(
        "https://random.imagecdn.app/v1/image?width=500&height=150&category=buildings&format=json"
      );
      const data = await response.json();
      setImageUrl(data.url); // Set the image URL from the response
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };

  // Fetch a random image when the component mounts
  useEffect(() => {
    fetchRandomImage();
  }, []);

  return (
    <div>
      <h2>Random Image Generator</h2>
      <button className="btn btn-primary" onClick={fetchRandomImage}>
        Get New Image
      </button>
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt="Random Building" width="500" height="150" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default RandomImage;
