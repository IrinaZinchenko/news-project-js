import './index.scss';
import './static/icons/svg-inons.svg';

import { createFilter } from "./js/filter.js";

import { articlesData } from "./mock/data.js";

const ROOT = document.querySelector('#root');

const articlesList = document.querySelector('.articles-list');
// const searchInput = document.querySelector('.search-input');
// const postsSort = document.querySelector('.posts-sorting');
// const form = document.querySelector('form');
// const formDiv = document.querySelector('.form');
// const createNewsBnt = document.querySelector('.create-news-btn');

// const state = {
//   searchStr: '',
//   sortType: 'new',
//   author: {
//     "id": 1,
//     "alias": "IrinaZinchenko",
//     "fullname": null,
//     "avatarUrl": "https://media.licdn.com/dms/image/D5603AQHDxDCvS5dkAQ/profile-displayphoto-shrink_200_200/0/1677754660657?e=2147483647&v=beta&t=W25ZsGFoV2TZ2LkSXfAQNnfe-bHe_hkPM28nIQZ5ljQ",
//     "speciality": null
//   }
// };

init();

// Обработчики событий

// searchInput.addEventListener('input', (event) => {
//   state.searchStr = event.target.value;
//   const searchedAndSortedPosts = searchAndSort(articlesData);
//   renderPostsList(searchedAndSortedPosts);
// });

// postsSort.addEventListener('change', (event) => {
//   const inputElem = event.target;
//   const activeElem = postsSort.querySelector('.radio-active');

//   activeElem.classList.remove('radio-active');
//   inputElem.parentElement.classList.add('radio-active');

//   state.sortType = inputElem.value;

//   const searchedAndSortedPosts = searchAndSort(articlesData);
//   renderPostsList(searchedAndSortedPosts);
// });

// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const formData = new FormData(form);

//   const title = formData.get('title');
//   const text = formData.get('text');
//   const urlImage = formData.get('image');

//   const sendPost = {
//     "id": null,
//     "timePublished": null,
//     "isCorporative": false,
//     "lang": "ru",
//     "titleHtml": "",
//     "editorVersion": "2.0",
//     "postType": "article",
//     "postLabels": [],
//     "author": {
//     },
//     "statistics": {
//       "commentsCount": 0,
//       "favoritesCount": 0,
//       "readingCount": 0,
//       "score": 0,
//       "votesCount": 0,
//       "votesCountPlus": 0,
//       "votesCountMinus": 0
//     },
//     "hubs": [],
//     "flows": [],
//     "relatedData": null,
//     "leadData": {
//       "textHtml": "",
//       "imageUrl": "",
//       "buttonTextHtml": "Читать далее",
//       "image": {
//         "url": "",
//         "fit": "cover",
//         "positionY": 0,
//         "positionX": 0
//       }
//     },
//     "status": "published",
//     "plannedPublishTime": null,
//     "checked": null,
//     "format": null,
//     "readingTime": 2,
//     "complexity": "low"
//   }

//   const nowMs = Math.ceil(Date.now() / 1000);

//   sendPost.id = nowMs;
//   sendPost.timePublished = nowMs;
//   sendPost.titleHtml = title;
//   sendPost.author = state.author;
//   sendPost.leadData.textHtml = text;
//   sendPost.leadData.imageUrl = sendPost.leadData.image.url = urlImage;

//   articlesData.push(sendPost);

//   renderPost(sendPost, 'afterbegin');

//   form.reset();
// });

// createNewsBnt.addEventListener('click', () => {
//   formDiv.classList.toggle('hidden');
// });

// Объявление функций

function init() {
  createFilter();

  // ROOT.appendChild(filter);

  renderPostsList(sortPosts(articlesData, state.sortType));
}

// function renderPostsList(posts) {
//   while (articlesList.firstChild) {
//     articlesList.removeChild(articlesList.lastChild);
//   }

//   posts.forEach((post) => {
//     renderPost(post, 'beforeend')
//   });
// }

// function renderPost(post, position) {
//   const postTmp = createPostTmp(post);
//   articlesList.insertAdjacentHTML(position, postTmp);
// }

// function createPostTmp(post) {
//   const postTmp = `
//     <article class="article" id="${post.id}">
//       <div class="article-author">
//         <div class="author-img">
//           ${post.author.avatarUrl
//       ? `<img src="${post.author.avatarUrl}" alt="${post.author.alias}">`
//       : `<img src="https://icon-library.com/images/avatar-icon-png/avatar-icon-png-15.jpg" alt="No photo">`
//     }
//         </div>
//         <div class="author-info">
//           <a href="#!" class="author-name">
//             <span>${post.author.alias}</span>
//           </a>
//           <span class="published-time">${post.timePublished}</span>
//         </div>
//       </div>

//       <h2 class="article-title">
//         <a href="#!">
//           <span>${post.titleHtml}</span>
//         </a>
//       </h2>

//       <div class="article-status">
//         <div class="icon">
//           <svg height="24" width="24">
//             <title>Время на прочтение</title>
//             <use xlink:href="./static/icons/svg-inons.svg#scheduled"></use>
//           </svg>
//           <span>${post.readingTime} мин</span>
//         </div>
//         <div class="icon">
//           <svg height="24" width="24px">
//             <title>Количество просмотров</title>
//             <use xlink:href="./static/icons/svg-inons.svg#counter-views"></use>
//           </svg>
//           <span>${formatViewCount(post.statistics.readingCount)}</span>
//         </div>
//       </div>

//       <div class="article-hubs">
//         <span>${post.hubs.map((obj) => makeHubLink(obj)).join(', ')}</span>
//       </div>

//       <div class="article-body">
//         <div class="cover">
//           ${post.leadData.image
//       ? `<img src="${post.leadData.image.url}" alt="${post.leadData.image.fit}">`
//       : ''
//     }
//         </div>
//         <div class="text">
//           <span>${post.leadData.textHtml}</span>
//         </div>
//         <a href="#!" class="read-more-button">Читать далее</a>
//       </div>

//       <div class="article-icons">
//         <div class="icon">
//           <svg height="24" width="24px">
//             <title>Всего голосов ${post.statistics.votesCount}: ↑${post.statistics.votesCountPlus} и
//               ↓${post.statistics.votesCountMinus}</title>
//             <use xlink:href="./static/icons/svg-inons.svg#counter-rating"></use>
//           </svg>
//           <span>${post.statistics.score}</span>
//         </div>
//         <div class="icon">
//           <button type="button" class="icon-button">
//             <svg height="24" width="24px">
//               <title>Добавить в закладки</title>
//               <use xlink:href="./static/icons/svg-inons.svg#counter-favorite"></use>
//             </svg>
//           </button>
//           <span>${post.statistics.favoritesCount}</span>
//         </div>
//         <div class="icon">
//           <button type="button" class="icon-button">
//             <svg height="24" width="24px">
//               <title>Поделиться</title>
//               <use xlink:href="./static/icons/svg-inons.svg#forward"></use>
//             </svg>
//           </button>
//         </div>
//         <div class="icon">
//           <a href="#!">
//             <svg height="24" width="24px">
//               <title>Комментарии</title>
//               <use xlink:href="./static/icons/svg-inons.svg#counter-comments"></use>
//             </svg>
//           </a>
//           <span>${post.statistics.commentsCount}</span>
//         </div>
//       </div>
//     </article>
//   `;

//   return postTmp;
// }

// function formatViewCount(num) {
//   if (num >= 1000 && num < 1000000) {
//     num = (num / 1000).toFixed(1);
//     if (num[num.length - 1] == 0) {
//       num = (+num).toFixed(0);
//     }
//     num += 'K';
//   }

//   if (num >= 1000000) {
//     num = (num / 1000000).toFixed(1);
//     if (num[num.length - 1] == 0) {
//       num = (+num).toFixed(0);
//     }
//     num += 'KK';
//   }

//   return num;
// }

// function makeHubLink(hub) {
//   return `<a href="#!" class="hub-link">${hub.titleHtml}</a>`;
// }

