'use strict';

export class UserInfo {
  constructor(person, about, api) {
    this.person = person;
    this.about = about;
    this.api = api;
  }

  setUserInfo = (nameApi, aboutApi) => { // обновлять данные внутри экземпляра класса

    this.person.textContent = nameApi;
    this.about.textContent = aboutApi;
  }

  updateUserInfo = (form) => { //чтобы отображать эти данные на странице

    const {name, job} = form.elements;

    name.value = this.person.textContent;
    job.value = this.about.textContent;

  }
}