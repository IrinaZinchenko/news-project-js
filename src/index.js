import './index.scss';
import './static/icons/svg-inons.svg';

import router from "./js/submodules/index.js";

import { Main } from './js/pages/main/index.js';
// import { Post } from './js/pages/post/index.js';
import { Login } from './js/pages/auth/login/index.js';
import { Signup } from './js/pages/auth/singup/index.js';

const ROOT = document.querySelector('#root');

const routes = [
  { path: '/', view: Main },
  { path: '/log-in', view: Login },
  { path: '/sign-up', view: Signup },
];

init();

function init() {
  router.initRouter({ target: ROOT, routes: routes });
}