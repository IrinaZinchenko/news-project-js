import './index.scss';
import './static/icons/svg-inons.svg';

import { articlesData } from "./mock/data.js";

const articlesList = document.querySelector('.articles-list');
const searchInput = document.querySelector('.posts-search__input');
const postsSort = document.querySelector('.posts-sorting');

const state = {
  searchStr: '',
  sortType: 'new',
};

init();

// Обработчики событий

searchInput.addEventListener('input', (event) => {
  state.searchStr = event.target.value;
  const searchedAndSortedPosts = searchAndSort(articlesData);
  renderPostsList(searchedAndSortedPosts);
});

postsSort.addEventListener('change', (event) => {
  const inputElem = event.target;
  const activeElem = postsSort.querySelector('.posts-sorting__radio-active');

  activeElem.classList.remove('posts-sorting__radio-active');
  inputElem.parentElement.classList.add('posts-sorting__radio-active');

  state.sortType = inputElem.value;

  const searchedAndSortedPosts = searchAndSort(articlesData);
  renderPostsList(searchedAndSortedPosts);
});

// Объявление функций

function init() {
  renderPostsList(sortPosts(articlesData, state.sortType));
}

function renderPostsList(posts) {
  while (articlesList.firstChild) {
    articlesList.removeChild(articlesList.lastChild);
  }

  posts.forEach((post) => {
    articlesList.insertAdjacentHTML('beforeend', createPostTmp(post));
  });
}

function createPostTmp(post) {
  const postTmp = `
    <article class="articles-list__item" id="${post.id}">
      <div class="article-snippet">
        <div class="article-snippet__meta">
          <div class="article-author-img">
            ${post.author.avatarUrl
      ? `<img src="${post.author.avatarUrl}" alt="${post.author.alias}">`
      : ''
    }
          </div>
          <div class="article-author-info">
            <a href="#!" class="article-author-name">
              <span>${post.author.alias}</span>
            </a>
            <span class="article-author-time">${post.timePublished}</span>
          </div>
        </div>

        <h2 class="article-snippet__title">
          <a href="#!" class="title-a">
            <span>${post.titleHtml}</span>
          </a>
        </h2>

        <div class="article-snippet__status">
          <div class="article-reading article-icons__icon">
            <svg height="24" width="24" class="article-icon-svg">
              <title>Время на прочтение</title>
              <use xlink:href="./static/icons/svg-inons.svg#scheduled"></use>
            </svg>
            <span>${post.readingTime} мин</span>
          </div>
          <div class="article-view article-icons__icon">
            <svg height="24" width="24px" class="article-icon-svg">
              <title>Количество просмотров</title>
              <use xlink:href="./static/icons/svg-inons.svg#counter-views"></use>
            </svg>
            <span>${formatViewCount(post.statistics.readingCount)}</span>
          </div>
        </div>

        <div class="article-snippet__hubs">
          <span>${post.hubs.map((obj) => makeHubLink(obj)).join(', ')}</span>
        </div>

        <div class="article-snippet__body">
          <div class="article-cover">
            ${post.leadData.image
      ? `<img src="${post.leadData.image.url}" alt="${post.leadData.image.fit}">`
      : ''
    }
          </div>
          <div class="article-text">
            <span>${post.leadData.textHtml}</span>
          </div>
          <a href="#!" class="article-read-more-button">Читать далее</a>
        </div>
      </div>

      <div class="article-icons">
        <div class="article-icons__icon">
          <svg height="24" width="24px" class="article-icon-svg">
            <title>Всего голосов ${post.statistics.votesCount}: ↑${post.statistics.votesCountPlus} и
              ↓${post.statistics.votesCountMinus}</title>
            <use xlink:href="./static/icons/svg-inons.svg#counter-rating"></use>
          </svg>
          <span>${post.statistics.score}</span>
        </div>
        <div class="article-icons__icon">
          <button type="button" class="article-icon-button">
            <svg height="24" width="24px" class="article-icon-svg">
              <title>Добавить в закладки</title>
              <use xlink:href="./static/icons/svg-inons.svg#counter-favorite"></use>
            </svg>
          </button>
          <span>${post.statistics.favoritesCount}</span>
        </div>
        <div class="article-icons__icon">
          <button type="button" class="article-icon-button">
            <svg height="24" width="24px" class="article-icon-svg">
              <title>Поделиться</title>
              <use xlink:href="./static/icons/svg-inons.svg#forward"></use>
            </svg>
          </button>
        </div>
        <div class="article-icons__icon">
          <a href="#!">
            <svg height="24" width="24px" class="article-icon-svg">
              <title>Комментарии</title>
              <use xlink:href="./static/icons/svg-inons.svg#counter-comments"></use>
            </svg>
          </a>
          <span>${post.statistics.commentsCount}</span>
        </div>
      </div>
    </article>
  `;

  return postTmp;
}

function formatViewCount(num) {
  if (num >= 1000 && num < 1000000) {
    num = (num / 1000).toFixed(1);
    if (num[num.length - 1] == 0) {
      num = (+num).toFixed(0);
    }
    num += 'K';
  }

  if (num >= 1000000) {
    num = (num / 1000000).toFixed(1);
    if (num[num.length - 1] == 0) {
      num = (+num).toFixed(0);
    }
    num += 'KK';
  }

  return num;
}

function makeHubLink(hub) {
  return `<a href="#!" class="article-snippet__hub-link">${hub.titleHtml}</a>`;
}

function sortPosts(posts, type) {
  let sortedPosts;

  switch (type) {
    case 'popular': {
      sortedPosts = posts.toSorted((a, b) => b.statistics.readingCount - a.statistics.readingCount);
      break;
    }

    case 'rating': {
      sortedPosts = posts.toSorted((a, b) => b.statistics.score - a.statistics.score);
      break;
    }

    case 'comment': {
      sortedPosts = posts.toSorted((a, b) => b.statistics.commentsCount - a.statistics.commentsCount);
      break;
    }

    default: {
      sortedPosts = posts.toSorted((a, b) => b.timePublishedt - a.timePublished);
      break;
    }
  }

  return sortedPosts;
}

function searchPosts(posts, searchStr) {
  const regExpSearch = new RegExp(searchStr, 'i');
  const searchedPosts = searchStr ? posts.filter((element) => regExpSearch.test(element.titleHtml)) : articlesData;

  return searchedPosts;
}

function searchAndSort(posts) {
  const searchedPosts = searchPosts(posts, state.searchStr);
  const sortedPosts = sortPosts(searchedPosts, state.sortType);

  return sortedPosts;
}