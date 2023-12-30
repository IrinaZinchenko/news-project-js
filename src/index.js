import './index.scss';
import './static/icons/svg-inons.svg';

import { createFilter } from './js/pages/main/filter.js';

// import { articlesData } from "./mock/data.js";

// import { renderPostsList } from "./js/articles-list.js";

// import { state } from "./js/state.js";

// import { sortPosts } from "./js/common.js";

import router from "./js/submodules/index.js";

import { Main } from './js/pages/main/index.js';
import { Post } from './js/pages/post/index.js';

export const ROOT = document.querySelector('#root');

const routes = [{ path: '/', view: Main }, { path: '/post', view: Post }];
init();

function init() {
  router.initRouter({ target: ROOT, routes: routes });
  createFilter();

  // renderPostsList(sortPosts(articlesData, state.sortType));
}