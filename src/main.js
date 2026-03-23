import iziToast from "izitoast";     
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from "./js/render-functions.js";      

const formEl = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');      

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

formEl.addEventListener('submit', async e => {
    e.preventDefault();

    hideLoadMoreButton();
    clearGallery();     

    const formData = new FormData(e.target);
    const value = formData.get('search-text').trim();

    if (!value) {
        iziToast.error({
            message: 'Please enter a search term',
        });
        return;
    }  

    currentQuery = value;
    currentPage = 1;
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage); 
        hideLoader();

        if (data.hits.length === 0) {
            iziToast.info({
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            return;
        }
      
        totalHits = data.totalHits;
        createGallery(data.hits);

        if (totalHits > currentPage * 15) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            });
        }
    } catch (error) {
        hideLoader();
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
        });
        console.error(error);
    }
});

loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;

    hideLoadMoreButton(); 
    showLoader();
  
    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        hideLoader();
        createGallery(data.hits);
    
        const { height } = document
            .querySelector('.gallery a')
            .getBoundingClientRect();
        window.scrollBy({
            top: height * 2,
            behavior: 'smooth'
        });

        if (currentPage * 15 < totalHits) {
            showLoadMoreButton(); 
        } else {
            hideLoadMoreButton(); 
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            });
        }
    } catch (error) {
        hideLoader();
        iziToast.error({ message: 'Something went wrong. Try again later.' });
        console.error(error);
    }
});