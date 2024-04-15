import React from 'react';
import Modal from 'react-modal';
import './ImageModal.css';

const ImageModal = ({isOpen, imageUrl, onClose}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Image Modal"
            ariaHideApp={false}
            className="modal"
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick={true}
        >
            <img src={imageUrl} alt="Regular Image" />
        </Modal>
    );
};

export default ImageModal;