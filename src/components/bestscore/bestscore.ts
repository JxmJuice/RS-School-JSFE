import { UserModel } from '../../models/UserModel';
import database from '../../shared/database';
import { BaseComponent } from '../base-component';
import './bestscore.scss';

export class BestScore extends BaseComponent {
  constructor() {
    super('section', ['bestscore']);
  }

  async createPage() {
    const users: UserModel[] = await database.getInfo();
    users.sort((i, j) => j.score - i.score);
    for (let i = 0; i < 10 && (typeof users[i] !== 'undefined'); i++) {
      this.element.insertAdjacentElement(
        'beforeend',
        this.makeUser(users[i]),
      );
    }
    document.body.querySelector('main')?.appendChild(this.element);
  }

  private makeUser(obj: UserModel): HTMLElement {
    const user = document.createElement('li');
    user.classList.add('bestscore__user');
    user.innerHTML = `
            <div class="bestscore__avatar" style="background-image: url(${
  obj.avatar || './avatar-register.png'
})"></div>
            <div class="bestscore__inform">
              <div class="bestscore__inform_name">${obj.firstName} ${
  obj.lastName
}</div>
              <div class="bestscore__inform_email">${obj.email}</div>
            </div>
            <div class="bestscore__score">${obj.score}</div>
              `;
    return user;
  }
}
