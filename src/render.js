import { refs } from './refs.js';
export function galleryImage(search) {
  const gallaryImageResult = search.map(
    ({
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return ` <a class="list" href=${largeImageURL}><div class="photo-card">
  <img src=" ${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b> &#128077 ${likes}</b>
    </p>
    <p class="info-item">
      <b> &#128065 ${views}</b>
    </p>
    <p class="info-item">
      <b> &#128172 ${comments}</b>
    </p>
    <p class="info-item">
      <b> 📥  ${downloads}</b>
    </p>
  </div>
</div></a>`;
    }
  );
  refs.divGallery.insertAdjacentHTML('beforeend', gallaryImageResult.join(''));
}
