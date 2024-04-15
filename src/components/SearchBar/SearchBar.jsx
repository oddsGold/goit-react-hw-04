import React, {useState} from "react";
import searchBar from "./SearchBar.module.css"
import {toast} from "react-toastify";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({onSubmit}) => {

    const [searchItem, setSearchItem] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchItem.trim() === '') {
            toast.error('Text must be entered to search for images', {
                position: 'top-right',
            });
            return;
        }
        onSubmit(searchItem);
    }

    const handleChange = (e) => {
        setSearchItem(e.target.value);
    };

    return (
        <header className={searchBar.header}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchItem}
                    onChange={handleChange}
                />
                <button type="submit">
                    <FaSearch />
                </button>
            </form>
        </header>
    )
}

export default SearchBar;