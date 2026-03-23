import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const loaderEl = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});



export function createGallery(images) {
    const markup = images
        .map((img) =>
            `
      <li class="gallery-item">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <div class="info">
          <p>Likes: ${img.likes}</p>
          <p>Views: ${img.views}</p>
          <p>Comments: ${img.comments}</p>
          <p>Downloads: ${img.downloads}</p>
        </div>
      </li>`
        )
        .join("")
    
    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
};



export function clearGallery() {
    galleryEl.innerHTML = "";
};

export function showLoader() {
    loaderEl.classList.remove("hidden");
};

export function hideLoader() {
    loaderEl.classList.add("hidden");
};

export function showLoadMoreButton() {
    btnLoadMore.classList.remove('hidden');
};

export function hideLoadMoreButton() {
    btnLoadMore.classList.add('hidden');
};