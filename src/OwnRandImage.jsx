import React, { useState, useEffect } from 'react';

const OwnRandImage = () => {
  const [url, setUrl] = useState("");

  const fetchData = async () => {
    try {
      const api = await fetch("https://random.imagecdn.app/v1/image?width=500&height=150&category=buildings&format=json");
      const data = await api.json();
      setUrl(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 2000); // Fetch every 2 seconds
    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div>
      {url && <img src={url} alt="Random Building" width="500" height="150" />}
    </div>
  );
}

export default OwnRandImage;
