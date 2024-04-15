import React from 'react';
import loadMoreBtn from "./LoadMoreBtn.module.css"

const LoadMoreBtn = ({ onClick }) => {
    return (
        <button onClick={onClick} className={loadMoreBtn["load-more-btn"]}>
            Load more
        </button>
    );
};

export default LoadMoreBtn;