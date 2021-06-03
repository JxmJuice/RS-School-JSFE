import { RouterOption } from '../../models/routerOptionModel';
import { Routes } from '../../models/routesModel';

export class Router {
  private routes: Routes[] = [];

  private mode: string | null = null;

  private root = '/';

  private current = '';

  constructor(options: RouterOption) {
    this.mode = 'hash';
    if (options.mode) this.mode = options.mode;
    if (options.root) this.root = options.root;
    window.addEventListener('hashchange', this.interval.bind(this), false);
  }

  add = (path: string, cb: CallableFunction) => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = (path: string) => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = () => {
    this.routes = [];
    return this;
  };

  clearSlashes = (path: string) => path.toString().replace(/\/$/, '').replace(/^\//, '');

  getFragment = () => {
    let fragment = '';
    const match = window.location.hash.match(/#(.*)$/);
    fragment = match ? match[1] : '';
    return this.clearSlashes(fragment);
  };

  navigate = (path = '') => {
    window.location.href = `${window.location.href.replace(
      /#(.*)$/,
      '',
    )}#${path}`;
    return this;
  };

  interval() {
    if (this.current === this.getFragment()) return;

    this.current = this.getFragment();
    const currentPath: string = this.current;
    this.routes.forEach((route) => {
      if (currentPath === this.clearSlashes(route.path)) {
        if (document.body.firstElementChild?.nextElementSibling) {
          document.body.firstElementChild.nextElementSibling.innerHTML = '';
        }
        route.cb();
      }
      return false;
    });
  }

  checkAfterReloadPage = () => {
    this.interval();
  };
}
