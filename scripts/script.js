const placeList = document.querySelector(".places-list");
const template = document.querySelector('#cardlist-template').content.querySelector(".place-card");
const imgPopup = document.getElementById("popup__img");
const popupImg = new Popup(imgPopup);
const options = {
  baseUrl: 'https://praktikum.tk/cohort11',
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

/*
  Неплохая работа, класс Api создан, данные приходят с сервера, профиль пользователя сохраняется
  Но к организации обмена с сервером есть несколько замечаний:

  Надо исправить:
  + - передавать базовый адрес сервера и ключ авторизации как параметры конструктора класса Api
  + - в методе getUser нужна проверка res.ok
  + - запрос PATCH обновляет данные на сервере, так, что имя метода createUser
    неверно отражает его назначение. Назвать например updateUser
  + - у всех запросов к серверу должна быть обработка ошибок
  + - при сохранении профиля не запрашивать данные ещё раз, а использовать данные которые вернул сервер
  + - попап закрывать только если запрос выполнился успешно

*/

/*
  Отлично, все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/