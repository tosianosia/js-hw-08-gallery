const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  lightboxContainer: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.js-lightbox div'),
  lightboxImageEl: document.querySelector('.js-lightbox img'),
  closeLightboxBtnEl: document.querySelector('[data-action="close-lightbox"]'),
};
let imagesSrcArray = [];

refs.galleryContainer.innerHTML = createGalleryItemsMarkup(galleryItems);

refs.galleryContainer.addEventListener('click', onGalleryContainerClick);
refs.lightboxOverlay.addEventListener('click', onCloseModal);
refs.closeLightboxBtnEl.addEventListener('click', onCloseModal);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `;
    })
    .join('');
}

function onGalleryContainerClick(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  evt.preventDefault();
  const lightboxImageSrc = evt.target.dataset.source;
  const lightboxImageDescr = evt.target.alt;

  refs.lightboxImageEl.src = lightboxImageSrc;
  refs.lightboxImageEl.alt = lightboxImageDescr;
  onOpenModal();
  imagesSrcArray = galleryItems.map(image => image.original);
}

function onOpenModal() {
  window.addEventListener('keydown', onKeyPress);
  refs.lightboxContainer.classList.add('is-open');
}

function onCloseModal() {
  window.removeEventListener('keydown', onKeyPress);
  refs.lightboxContainer.classList.remove('is-open');

  refs.lightboxImageEl.src = '';
  refs.lightboxImageEl.alt = '';
}

function onKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const LEFT_KEY_CODE = 'ArrowLeft';
  const RIGHT_KEY_CODE = 'ArrowRight';

  if (evt.code === ESC_KEY_CODE) {
    onCloseModal();
  } else if (evt.code === LEFT_KEY_CODE) {
    onLeftKeyPress();
  } else if (evt.code === RIGHT_KEY_CODE) {
    onRightKeyPress();
  }
}

function onLeftKeyPress() {
  const indexOfCurrentImg = imagesSrcArray.indexOf(refs.lightboxImageEl.src);

  refs.lightboxImageEl.src =
    indexOfCurrentImg === 0
      ? imagesSrcArray[imagesSrcArray.length - 1]
      : imagesSrcArray[indexOfCurrentImg - 1];
}

function onRightKeyPress() {
  const indexOfCurrentImg = imagesSrcArray.indexOf(refs.lightboxImageEl.src);

  refs.lightboxImageEl.src =
    indexOfCurrentImg === imagesSrcArray.length - 1
      ? imagesSrcArray[0]
      : imagesSrcArray[indexOfCurrentImg + 1];
}
