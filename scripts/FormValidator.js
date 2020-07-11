class FormValidator {
  constructor(form, errorMessages) {
    this.form = form;
    this.errorMessages = errorMessages;
    this.button = form.querySelector(".popup__button");
  }

  checkinputsValidity = (input) => { 
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.empty);
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.wrongLength);
      return false;
    }

    if(input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(this.errorMessages.wrongUrl);
      return false;
    }

    return input.checkValidity();
  }

  isFieldValid = (input) => {
    const errorElem = this.form.querySelector(`#${input.id}-error`);
    const valid = this.checkinputsValidity(input);
    errorElem.textContent = input.validationMessage;

    return valid;
  }

  setSubmitButtonState(button, state) { 
    if (state) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true);
    }
  }

  resetError() {

    const errors = this.form.querySelectorAll(".error");

    errors.forEach((error) => {
      if (error.textContent !== "") {
        error.textContent = "";
      }
    });
    
  }

  resetForm() {
    this.form.reset();
  }

  setEventListeners() { 

    this.form.addEventListener('input', (event) => {
      const submit = this.form.querySelector('.button');
      const [...inputs] = this.form.querySelectorAll('.popup__input');

      this.isFieldValid(event.target);

      this.setSubmitButtonState(submit, inputs.every(this.checkinputsValidity));
    });

  }
}