import React from "react";
import imageGallery from "./ImageGallery.module.css"
import ImageCard from "../ImageCard/ImageCard.jsx";

const ImageGallery = ({images, onImageClick}) => {
    return(
        <ul className={imageGallery.list}>
            {images.map((image, index) => {
                return (
                    <li key={image.id}>
                        <ImageCard image={image} onImageClick={onImageClick}  />
                    </li>
                );
            })}
        </ul>
    )
}

export default ImageGallery;