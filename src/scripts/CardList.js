'use strict';

export class CardList { // для хранения и отрисовки карточки

  constructor(container, createCard, popupImg, template, api) {
    this._container = container;
    this._createCard = createCard;
    this.popupImg = popupImg;
    this.template = template;
    this.api = api;
  }

  addCard(item) {//для добавления карточки в список, принимает на вход экземпляр карточки;
    
    const card = this._createCard(item, this.popupImg, this.template, this.api);
    
    this._container.append(card);
  }
}