import React from "react";
import imageCard from "./ImageCard.module.css";

const ImageCard = ({image, onImageClick}) => {
    const handleClick = () => {
        onImageClick(image.urls.regular);
    };

    return(
        <div>
            <img src={image.urls.small} alt={image.urls.small} onClick={handleClick} />
        </div>
    )
}

export default ImageCard;