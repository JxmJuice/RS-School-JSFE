import { UserModel } from '../../models/UserModel';

export class DataBase {
  private request: any;

  private database: any;

  user?: UserModel;

  constructor() {
    this.createDataBase();
  }

  private async createDataBase() {
    return new Promise((res, rej) => {
      this.request = indexedDB.open('JxmJuice', 2);
      this.request.onupgradeneeded = (event: any) => {
        this.database = <any>(event.target).result;
        this.database.createObjectStore('user', { keyPath: 'id' });
        res(this.request);
      };
      this.request.onsuccess = (event: IDBVersionChangeEvent) => {
        this.database = (<IDBOpenDBRequest>event.target).result;
        res(this.request);
      };
      this.request.onerror = (event: IDBVersionChangeEvent) => {
        rej(new Error('Bad Request'));
      };
    });
  }

  addInfo = (user: UserModel) => {
    this.user = user;
    this.database
      .transaction(['user'], 'readwrite')
      .objectStore('user')
      .add(user);
  };

  updateInfo(obj:UserModel) {
    const transaction = this.database.transaction(['user'], 'readwrite');
    const store = transaction.objectStore('user');
    const request = store.openCursor(obj.id);
    request.onsuccess = (event:any) => {
      const cursor = event.target.result;
      cursor.update(obj, obj.id);
    };
  }

  getInfo(): Promise<UserModel[]> {
    return new Promise((res) => {
      const transaction = this.database.transaction(['user'], 'readonly');
      const store = transaction.objectStore('user');
      const request = store.openCursor();
      const Users: UserModel[] = [];
      request.onsuccess = (event: any) => {
        if (event.target.result) {
          const cursor = event.target.result;
          Users.push(cursor.value);
          cursor.continue();
        }
      };
      transaction.oncomplete = () => {
        res(Users);
      };
    });
  }
}
