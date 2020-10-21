//* 1 Создание и рендер разметки по массиву данных и предоставленному шаблону.
//* 2 Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
//* 3 Открытие модального окна по клику на элементе галереи.
//* 4 Подмена значения атрибута src элемента img.lightbox__image.
//* 5 Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
//*6 Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
//* 7 Закрытие модального окна по клику на div.lightbox__overlay.
//* 8 Закрытие модального окна по нажатию клавиши ESC.
//? 9 Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".


import galleryItems from "./gallery-items.js";

// -------------- step [ 1.1 ] ---------------------
const dom_gallery = document.querySelector('.gallery.js-gallery');
// -------------- step [ 3.1 ] ---------------------
const dom_lightbox = document.querySelector('.lightbox.js-lightbox');
// -------------- step [ 4.1 ] ---------------------
const dom_lightboxImage = document.querySelector('.lightbox__image');
// -------------- step [ 1.2 ] ---------------------
galleryItems.forEach(({preview, original, description}) => {
  dom_gallery.insertAdjacentHTML('beforeend', 
  `<li class="gallery__item">
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
  </li>`
  )
});
// -------------- step [ 2 ] ---------------------
const currentImage = {};
dom_gallery.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName === "IMG") {
    currentImage.src = e.target.dataset.source;
    currentImage.alt = e.target.getAttribute('alt');
// -------------- step [ 3.2 ] ---------------------
    dom_lightbox.classList.toggle('is-open');
// -------------- step [ 4.2 ] ---------------------
    dom_lightboxImage.setAttribute('src', currentImage.src);
    dom_lightboxImage.setAttribute('alt', currentImage.alt);
// -------------- step [ 5.1 ] ---------------------
    closeLightbox();
  }
})
const closeLightbox = function() {
  const eventHandler = function(e) {
// -------------- step [ 7 + 8.2 ] ---------------------
    if (e.target.nodeName==='BUTTON' || e.target.classList.contains('lightbox__overlay') || e.keyCode === 27) {
// -------------- step [ 5.2 ] ---------------------      
      dom_lightbox.classList.toggle('is-open');
      dom_lightbox.removeEventListener('click', eventHandler);
// -------------- step [ 8.3 ] ---------------------       
      document.removeEventListener('keydown', eventHandler)
// -------------- step [ 6 ] ---------------------      
      dom_lightboxImage.setAttribute('src', '');
      dom_lightboxImage.setAttribute('alt', '');
    } 
  }
// -------------- step [ 5.3 ] ---------------------
  dom_lightbox.addEventListener('click', eventHandler);
// -------------- step [ 8.1 ] ---------------------   
  document.addEventListener('keydown', eventHandler)
}