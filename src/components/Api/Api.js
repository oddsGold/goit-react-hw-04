import axios from "axios";

const ACCESS_KEY = '4kxVO0i3L9nR4e1rOjoLZkn-NsnJP8uE4IJinxwCN6E';

const INSTANCE = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`
    }
});

export const searchPhoto = async (query, page, perPage) => {
    try {
        const response = await INSTANCE.get(`/search/photos?query=${query}&page=${page}&per_page=${perPage}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to search photos');
    }
};