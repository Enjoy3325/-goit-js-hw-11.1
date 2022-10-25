import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryImage } from './render.js';
import Notiflix from 'notiflix';
import { refs } from './refs.js';
import NewsApiService from './new-service';
import './css/styles.css';
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const newsApiService = new NewsApiService();
// Listeners
refs.searchForm.addEventListener('submit', onSearch);
refs.buttonLoadMore.addEventListener('click', onLoadMoreClick);

// Sabmit function search bar
async function onSearch(e) {
  e.preventDefault();
  clearCards();

  console.log(e.target.elements.searchQuery.value);
  newsApiService.query = e.target.elements.searchQuery.value;

  if (newsApiService.query === '') {
    return Notiflix.Notify.info('Enter in the field what you want to find!');
  }
  // onClickDiseabledBtnSubmit();
  newsApiService.resetPage();
  // HTTP request was sent
  try {
    // Calling up pictures
    const resultFetch = await newsApiService.fetchHits();

    if (resultFetch.data.hits.length === 0) {
      refs.buttonLoadMore.classList.add('is-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.info(
      `Hooray! We found ${resultFetch.data.totalHits} images.`
    );

    galleryImage(resultFetch.data.hits);
    lightbox.refresh();
    refs.buttonLoadMore.classList.remove('is-hidden');
    if (resultFetch.data.totalHits <= 40) {
      refs.buttonLoadMore.classList.add('is-hidden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {}
}

// Button "Load more" function to show more pictures
async function onLoadMoreClick() {
  newsApiService.incrementPage();
  try {
    const resultClik = await newsApiService.fetchHits();
    if (
      newsApiService.per_page * newsApiService.page >
      resultClik.data.totalHits
    ) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      refs.buttonLoadMore.classList.add('is-hidden');
    }

    galleryImage(resultClik.data.hits);
    // Gallery lightbox
    lightbox.refresh();
    onScroll();
  } catch (error) {}
}
// Clear input field, markup
function clearCards() {
  refs.divGallery.innerHTML = '';
}
// Scrolling the page
function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
