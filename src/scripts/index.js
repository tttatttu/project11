'use strict';

import '../pages/index.css';

import {Api} from './Api.js'
import {Card} from './Card.js'
import {CardList} from './CardList.js'
import {FormValidator} from './FormValidator.js'
import {Popup} from './Popup.js'
import {UserInfo} from './UserInfo.js'

(function () {

  const placeList = document.querySelector(".places-list");
  const template = document.querySelector('#cardlist-template').content.querySelector(".place-card");
  const imgPopup = document.getElementById("popup__img");
  const popupImg = new Popup(imgPopup);

  const serverUrl = NODE_ENV === 'development' ? 'http://nomoreparties.co/cohort11' : 'https://nomoreparties.co/cohort11';
  const options = {
    baseUrl: serverUrl,
    headers: {
      authorization: '97003477-34f8-401f-bc72-5e2a641b9a11',
      'Content-Type': 'application/json',
    }
  };
  const api = new Api(options);
  const editPopup = document.getElementById("popup__edit");
  const editButton = document.querySelector(".user-info__edit");
  const addPopup = document.getElementById("popup__add");
  const userButton = document.querySelector(".user-info__button");
  const popupEdit = new Popup(editPopup);
  const popupAdd = new Popup(addPopup);
  const createCard = (...arg) => new Card(...arg).render();
  const cardList = new CardList(placeList, createCard, popupImg, template, api);
  const userName = document.querySelector(".user-info__name");
  const userAbout = document.querySelector(".user-info__job");
  const userInfo = new UserInfo(userName, userAbout, api);
  const errorMessages = {
    empty: "Это обязательное поле",
    wrongLength: "Должно быть от 2 до 30 символов",
    wrongUrl: "Здесь должна быть ссылка",
  };
  const formValidatorAdd = new FormValidator(popupAdd.form, errorMessages);
  const formValidatorEdit = new FormValidator(popupEdit.form, errorMessages);


  api.getCards()
    .then((items) => {
      items.forEach((item) => {
        cardList.addCard(item)
      })
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });

  api.getUser()
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
    })
    .catch(err => console.log(err));

  popupAdd.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = popupAdd.form.querySelector("#name");
    const link = popupAdd.form.querySelector("#link");

    cardList.addCard({name, link});
    
    popupAdd.closePopup();
  });

  userButton.addEventListener('click', () => {
    formValidatorAdd.button.setAttribute('disabled', true);
    formValidatorAdd.resetForm();
    formValidatorAdd.resetError();
    formValidatorAdd.setEventListeners();

    popupAdd.openPopup();
  });

  popupEdit.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameNew = popupEdit.form.name.value;
    const aboutNew = popupEdit.form.job.value;

    api.updateUser({name: nameNew, about: aboutNew})
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);

        popupEdit.closePopup();
      })
      .catch(err => console.log(err)); 
  });

  editButton.addEventListener('click', () => {

    formValidatorEdit.button.removeAttribute("disabled");

    userInfo.updateUserInfo(popupEdit.form);

    formValidatorEdit.resetError();
    formValidatorEdit.setEventListeners();
    popupEdit.openPopup();
  });

})();
