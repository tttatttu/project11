class Popup {

  constructor(popup) {
    this.popup = popup;
    this.form = popup.querySelector(".popup__form");
  }

  openPopup = () => {
    this.addListeners();
    this.popup.classList.add("popup_is-opened");
  }

  closePopup = () => {
    this.removeListeners();
    this.popup.classList.remove("popup_is-opened");
  }


  addListeners =() => {
    this.popup.querySelector(".popup__close").addEventListener("click", this.closePopup);
  }

  removeListeners() {
    this.popup.querySelector('.popup__close').removeEventListener("click", this.closePopup);
  }
}
