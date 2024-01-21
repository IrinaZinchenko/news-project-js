import './index.scss';
import './static/icons/svg-inons.svg';

import router from "./js/submodules/spa-router/index.js";

import { Main } from './js/pages/main/index.js';
// import { Post } from './js/pages/post/index.js';
import { Login } from './js/pages/auth/login/index.js';
import { Signup } from './js/pages/auth/singup/index.js';

const ROOT = document.querySelector('#root');

const routes = checkAuth() ? [
  { path: '/', view: Main },
] : [
  { path: '/log-in', view: Login },
  { path: '/sign-up', view: Signup },
  { path: '/*', view: Login },
];

init();

function init() {
  router.initRouter({ target: ROOT, routes: routes });
}

function checkAuth() {
  const auth = localStorage.getItem('token');

  return Boolean(auth);
}