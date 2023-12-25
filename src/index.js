import './index.scss';
import './static/icons/svg-inons.svg';

import { createFilter } from "./js/filter.js";

import { articlesData } from "./mock/data.js";

import { renderPostsList } from "./js/articles-list.js";

import { state } from "./js/state.js";

import { sortPosts } from "./js/common.js";

const ROOT = document.querySelector('#root');

init();

function init() {
  createFilter();

  renderPostsList(sortPosts(articlesData, state.sortType));
}