import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._imageTitle = this._popup.querySelector('.popup__image-title');
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._imageTitle.textContent = name;
    this._popup.classList.add('popup_darker');
    super.open();
  }
}
