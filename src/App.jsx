import {useEffect, useState} from 'react'
import './App.css'
import "reset-css/reset.css";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
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
    const [ImageUrl, setImageUrl] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [totalImages, setTotalImages] = useState(0);

    useEffect(() => {
        if (images.length > 0) {
            const totalPages = Math.ceil(totalImages / perPage);
            setTotalPages(totalPages);
        }
    }, [images, totalImages, perPage]);

    const handleSearch = async (item) => {
        try {
            setLoading(true);
            const data = await searchPhoto(item, page, perPage);
            setTotalImages(data.total);
            await setPage(prevPage => prevPage + 1);
            setImages(prevImages => [...prevImages, ...data.results]);
            setLoading(false);
            setSearchQuery(item);
        }catch (error) {
            setError(true);
            setErrorMsg('Failed to fetch images');
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        try {
            setLoading(true);
            await setPage(prevPage => prevPage + 1);
            await handleSearch(searchQuery);
        } catch (error) {
            setError(true);
            setErrorMsg('Failed to fetch images');
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = async (item) => {
        setImages([]);
        setPage(1);
        await handleSearch(item);
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
            <ToastContainer/>
            <SearchBar onSubmit={handleSubmit}/>
            {images.length > 0 && <ImageGallery images={images} onImageClick={onImageClick}  />}
            {loading && <Loader />}
            {error && <ErrorMessage errorMsg={errorMsg} />}
            {images.length > 0 && !loading && page < totalPages && (
                <LoadMoreBtn onClick={handleLoadMore} />
            )}
            <ImageModal isOpen={modalIsOpen} imageUrl={ImageUrl} onClose={closeModal} />
        </div>
    )
}

export default App
