import React, { useEffect, useState } from 'react';
import './App.css';
import "reset-css/reset.css";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import { searchPhoto } from './components/Api/Api.js';
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";

function App() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const data = await searchPhoto(searchQuery, page, perPage);
                    const totalPages = Math.ceil(data.total / perPage);
                    setTotalPages(totalPages);
                    if (data.results.length === 0) {
                        setError(true);
                        setErrorMsg('No images found');
                        setImages([]);
                    } else {
                        setError(false);
                        if (page === 1) {
                            setImages(data.results);
                        } else {
                            setImages(prevImages => [...prevImages, ...data.results]);
                        }
                    }
                    setLoading(false);
                } catch (error) {
                    setError(true);
                    setErrorMsg('Failed to fetch images');
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [searchQuery, page, perPage]);

    const handleSearch = async (item) => {
        setSearchQuery(item);
        setPage(1);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const openModal = (imageUrl) => {
        setImageUrl(imageUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const onImageClick = (imageUrl) => {
        openModal(imageUrl);
    };

    return (
        <div className="gallery">
            <ToastContainer />
            <SearchBar onSubmit={handleSearch} />
            <ImageGallery images={images} onImageClick={onImageClick} />
            {loading && <Loader />}
            {error && <ErrorMessage errorMsg={errorMsg} />}
            {images.length > 0 && !loading && page < totalPages && (
                <LoadMoreBtn onClick={handleLoadMore} />
            )}
            <ImageModal isOpen={modalIsOpen} imageUrl={imageUrl} onClose={closeModal} />
        </div>
    );
}

export default App;