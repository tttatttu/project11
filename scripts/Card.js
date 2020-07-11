class Card { // создает карточку

  constructor(item, popupImg, template, api) {
    this.item = item;
    this.popupImg = popupImg;
    this.template = template;
    this.api = api;
  }

  _like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  _remove = (event) => {
    event.stopPropagation();

    this._card.remove();
  }

  _renderImagePopup = () => {
    const link = this._card.querySelector(".place-card__image").style.backgroundImage.slice(5, -2);

    this.popupImg.popup.querySelector(".popup__images").src = `${link}`;

    this.popupImg.openPopup();
  }

  render() { // создает DOM - элемент карточки

    this._card = this.template.cloneNode(true);
    this._card.querySelector(".place-card__name").textContent = this.item.name;
    this._card.querySelector(".place-card__image").style.backgroundImage = `url(${this.item.link})`;
    
    this.addEventListeners();
    
    return this._card;
  }

  addEventListeners() {
    this._card.querySelector(".place-card__like-icon").addEventListener("click", this._like);
    this._card.querySelector(".place-card__image").addEventListener('click', this._renderImagePopup);
    this._card.querySelector(".place-card__delete-icon").addEventListener("click", this._remove);
  }
}
