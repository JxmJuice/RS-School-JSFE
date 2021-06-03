import { UserModel } from '../../models/UserModel';
import { PopUp } from '../../shared/popUp/popUp';
import { Header } from '../header/header';
import database from '../../shared/database';
import { hashFunc } from '../../shared/hash';
import './popUpRegister.scss';

export class PopUpRegister extends PopUp {
  private inputAvatar: HTMLElement | null;

  private inputFirstName: HTMLInputElement;

  private inputLastName: HTMLInputElement;

  private inputEmail: HTMLInputElement;

  private registerForm: HTMLFormElement | null;

  private header: Header;

  private userAvatar?: string;

  constructor(header: Header) {
    super();
    this.header = header;
    if (this.element.firstElementChild) {
      this.element.firstElementChild.innerHTML = `
      <div class="popUp__wrapper">
        <h2 class='form-register__title'>Register new Player</h2>
        <form id="formRegister" class="form-register">
          <div class="form-register__input_wrapper">
            <label class="label">
              <input required minlength = "3" maxlength = "30" type='text' pattern="[A-Za-zА-Яа-яЁё0-9]{3,30}" placeholder="Name" autocomplete="off" id="inputFirstName">
            </label>

            <label class="label">
              <input required minlength = "3" maxlength = "30" type='text' pattern="[A-Za-zА-Яа-яЁё0-9]{3,30}" placeholder="Last name" autocomplete="off" id='inputLastName'>
            </label>

            <label class="label">
              <input required type='email' placeholder="Email" id='inputEmail'>
            </label>
          </div>
          <input type='file' id='inputAvatar'>
          <div class="form-register__btnWrapper">
            <button id='buttonAdd'>Register</button>
            <div id='buttonCancel'>Cancel</div>
          </div>
        </form>
      </div>
    `;
    }
    this.inputAvatar = this.element.querySelector('#inputAvatar');
    this.registerForm = this.element.querySelector('#formRegister');
    this.inputFirstName = <HTMLInputElement>(
      this.registerForm?.querySelector('#inputFirstName')
    );
    this.inputLastName = <HTMLInputElement>(
      this.registerForm?.querySelector('#inputLastName')
    );
    this.inputEmail = <HTMLInputElement>(
      this.registerForm?.querySelector('#inputEmail')
    );
    if (this.inputAvatar) {
      this.inputAvatar.addEventListener('change', (event) => this.changeAvatar.call(this, event));
    }
    if (this.registerForm) {
      this.registerForm.addEventListener('submit', (event) => this.formRegisterSubmit(event));
    }
    this.inputFirstName.addEventListener('input', () => this.isValidFirstName());
    this.inputLastName.addEventListener('input', () => this.isValidLastName());
    this.inputEmail.addEventListener('input', () => this.isValidEmail());
  }

  showPopUp(elem: HTMLElement) {
    document.body.appendChild(this.element);
    setTimeout(() => this.element.classList.remove('popUp_delay'), 0);
    document
      ?.querySelector('#buttonCancel')
      ?.addEventListener('click', (event) => {
        this.resetValidateClass();
        if (this.registerForm) {
          this.registerForm.reset();
        }
        this.closePopUp(event, true);
      });
  }

  private changeAvatar(event: EventTarget | Event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const { files } = target;
    const avatar = this.inputAvatar;
    if (files) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        if (avatar) {
          this.userAvatar = <string>reader.result;
          avatar.style.backgroundImage = `url(${reader.result})`;
        }
      };
    }
  }

  private formRegisterSubmit(event: Event) {
    event.preventDefault();
    if (this.inputFirstName && this.inputLastName && this.inputEmail) {
      const user:UserModel = {
        firstName: this.inputFirstName?.value,
        lastName: this.inputLastName.value,
        email: this.inputEmail.value,
        avatar: this.userAvatar || '',
        score: 0,
        id: <string>(hashFunc(this.inputFirstName?.value + this.inputLastName.value) as unknown),
      };
      console.log(user);
      database.addInfo(user);
    }
    if (this.registerForm) {
      this.registerForm.reset();
    }
    this.closePopUp(event, true);
    this.header.HeaderLogin(this.userAvatar);
  }

  private isValidLastName() {
    if (this.inputLastName) {
      this.inputLastName.checkValidity();
      if (!this.inputLastName.value) {
        this.inputLastName.setCustomValidity('Это поле не может быть пустым');
        if (this.inputLastName.parentElement) {
          this.addInvalidClass(this.inputLastName.parentElement);
        }
        this.inputLastName.reportValidity();
        return;
      }
      if (!Number.isNaN(parseInt(this.inputLastName.value))) {
        this.inputLastName.setCustomValidity(
          'Фамилия не может начинаться с цифры',
        );
        if (this.inputLastName.parentElement) {
          this.addInvalidClass(this.inputLastName.parentElement);
        }
        this.inputLastName.reportValidity();
        return;
      }
      if (this.inputLastName?.validity.tooShort) {
        this.inputLastName.setCustomValidity(
          'Фамилия должна быть длиной более 3х символов',
        );
        if (this.inputLastName.parentElement) {
          this.addInvalidClass(this.inputLastName.parentElement);
        }
        this.inputLastName.reportValidity();
        return;
      }
      if (this.inputLastName.validity.patternMismatch) {
        this.inputLastName.setCustomValidity(
          'Фамилия должна содержать только символы русского/латинского алфавитов и цифры',
        );
        if (this.inputLastName.parentElement) {
          this.addInvalidClass(this.inputLastName.parentElement);
        }
        this.inputLastName.reportValidity();
        return;
      }

      this.inputLastName.setCustomValidity('');

      if (this.inputLastName.parentElement) {
        this.addValidClass(this.inputLastName.parentElement);
      }
    }
  }

  private isValidEmail() {
    if (this.inputEmail) {
      if (!this.inputEmail.validity.valid) {
        if (this.inputEmail.parentElement) {
          this.addInvalidClass(this.inputEmail.parentElement);
        }
        this.inputEmail.reportValidity();
      } else if (this.inputEmail.parentElement) {
        this.addValidClass(this.inputEmail.parentElement);
      }
    }
  }

  private isValidFirstName() {
    if (this.inputFirstName) {
      this.inputFirstName.checkValidity();
      if (!this.inputFirstName.value) {
        this.inputFirstName.setCustomValidity('Это поле не может быть пустым');
        if (this.inputFirstName.parentElement) {
          this.addInvalidClass(this.inputFirstName.parentElement);
        }
        this.inputFirstName.reportValidity();
        return;
      }
      if (!Number.isNaN(parseInt(this.inputFirstName.value))) {
        this.inputFirstName.setCustomValidity(
          'Имя не может начинаться с цифры',
        );
        if (this.inputFirstName.parentElement) {
          this.addInvalidClass(this.inputFirstName.parentElement);
        }
        this.inputFirstName.reportValidity();
        return;
      }
      if (this.inputFirstName?.validity.tooShort) {
        this.inputFirstName.setCustomValidity(
          'Имя должно быть длиной более 3х символов',
        );
        if (this.inputFirstName.parentElement) {
          this.addInvalidClass(this.inputFirstName.parentElement);
        }
        this.inputFirstName.reportValidity();
        return;
      }
      if (this.inputFirstName.validity.patternMismatch) {
        this.inputFirstName.setCustomValidity(
          'Имя должно содержать только символы русского/латинского алфавитов и цифры',
        );
        if (this.inputFirstName.parentElement) {
          this.addInvalidClass(this.inputFirstName.parentElement);
        }
        this.inputFirstName.reportValidity();
        return;
      }

      this.inputFirstName.setCustomValidity('');

      if (this.inputFirstName.parentElement) {
        this.addValidClass(this.inputFirstName.parentElement);
      }
    }
  }

  private addInvalidClass(element: HTMLElement) {
    element.classList.remove('label_valid');
    element.classList.add('label_invalid');
  }

  private addValidClass(element: HTMLElement) {
    element.classList.add('label_valid');
    element.classList.remove('label_invalid');
  }

  private resetValidateClass() {
    this.inputFirstName?.parentElement?.classList.remove('label_valid');
    this.inputLastName?.parentElement?.classList.remove('label_valid');
    this.inputEmail?.parentElement?.classList.remove('label_valid');

    this.inputFirstName?.parentElement?.classList.remove('label_invalid');
    this.inputLastName?.parentElement?.classList.remove('label_invalid');
    this.inputEmail?.parentElement?.classList.remove('label_invalid');
  }
}
