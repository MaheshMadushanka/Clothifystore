import React, { useState, useEffect } from 'react';
import firstPhoto from '../../../../public/image/firstPhoto.png';
import secondPhoto from '../../../../public/image/secondPhoto.png';
import thirdPhoto from '../../../../public/image/thirdPhoto.png';
import "./PhotoLabel.css"

const PhotoLabel = () => {
  const photoArray = [firstPhoto, secondPhoto, thirdPhoto]; 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photoArray.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, [photoArray.length]);

  return (
    <div id='lbl1'>
      <label>
        <img
          src={photoArray[currentIndex]}
          alt="Slideshow"
        />
      </label>
    </div>
  );
};

export default PhotoLabel;
