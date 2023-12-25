import { articlesData } from "../mock/data.js";

import { state } from "./state.js";

import { searchAndSort } from "./common.js";

import { renderPostsList, renderPost } from "./articles-list.js";

export function createFilter() {
  const main = document.querySelector('main');
  const filter = createFilterCildren();
  main.insertAdjacentHTML('afterbegin', filter);

  initListeners(main, articlesData);
}

function createFilterCildren() {
  const filterTmp = `<div class="filter">
  <div class="filter-wrapper">
    <h3 class="wrapper-title">Фильтр</h3>
    <div class="posts-search">
      <input type="text" class="search-input" placeholder="Поиск">
    </div>

    <div class="sort-and-create-news">
      <div class="posts-sorting">
        <div class="sorting-radio radio-active">
          <input type="radio" name="sort" id="new" value="new" checked>
          <label for="new">Новые</label>
        </div>

        <div class="sorting-radio">
          <input type="radio" name="sort" id="popular" value="popular">
          <label for="popular">Просматриваемые</label>
        </div>

        <div class="sorting-radio">
          <input type="radio" name="sort" id="rating" value="rating">
          <label for="rating">Высокий рейтинг</label>
        </div>

        <div class="sorting-radio">
          <input type="radio" name="sort" id="comment" value="comment">
          <label for="comment">Комментируемые</label>
        </div>
      </div>

      <button type="button" class="create-news-btn">Создать новость</button>
    </div>
  </div>
</div>

<div class="form hidden">
  <form>
    <h3 class="form-title">Создать новость</h3>

    <label for="title">
      <span>Заголовок</span>
      <input type="text" name="title" id="title">
    </label>

    <label for="text">
      <span>Текст статьи</span>
      <textarea name="text" id="text" rows="15"></textarea>
    </label>

    <label for="image">
      <span>URL изображения</span>
      <input type="text" name="image" id="image">
    </label>

    <input type="submit" value="Создать" class="submit"></input>
  </form>
</div>`;

  return filterTmp;
}

function initListeners(main, articlesData) {
  const searchInput = main.querySelector('.search-input');
  const postsSort = main.querySelector('.posts-sorting');
  const form = main.querySelector('form');
  const formDiv = main.querySelector('.form');
  const createNewsBnt = main.querySelector('.create-news-btn');

  searchInput.addEventListener('input', (event) => {
    state.searchStr = event.target.value;
    const searchedAndSortedPosts = searchAndSort(articlesData, state);
    renderPostsList(searchedAndSortedPosts);
  });

  postsSort.addEventListener('change', (event) => {
    const inputElem = event.target;
    const activeElem = postsSort.querySelector('.radio-active');

    activeElem.classList.remove('radio-active');
    inputElem.parentElement.classList.add('radio-active');

    state.sortType = inputElem.value;

    const searchedAndSortedPosts = searchAndSort(articlesData, state);
    renderPostsList(searchedAndSortedPosts);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const text = formData.get('text');
    const urlImage = formData.get('image');

    const sendPost = {
      "id": null,
      "timePublished": null,
      "isCorporative": false,
      "lang": "ru",
      "titleHtml": "",
      "editorVersion": "2.0",
      "postType": "article",
      "postLabels": [],
      "author": {
      },
      "statistics": {
        "commentsCount": 0,
        "favoritesCount": 0,
        "readingCount": 0,
        "score": 0,
        "votesCount": 0,
        "votesCountPlus": 0,
        "votesCountMinus": 0
      },
      "hubs": [],
      "flows": [],
      "relatedData": null,
      "leadData": {
        "textHtml": "",
        "imageUrl": "",
        "buttonTextHtml": "Читать далее",
        "image": {
          "url": "",
          "fit": "cover",
          "positionY": 0,
          "positionX": 0
        }
      },
      "status": "published",
      "plannedPublishTime": null,
      "checked": null,
      "format": null,
      "readingTime": 2,
      "complexity": "low"
    }

    const nowMs = Math.ceil(Date.now() / 1000);

    sendPost.id = nowMs;
    sendPost.timePublished = nowMs;
    sendPost.titleHtml = title;
    sendPost.author = state.author;
    sendPost.leadData.textHtml = text;
    sendPost.leadData.imageUrl = sendPost.leadData.image.url = urlImage;

    articlesData.push(sendPost);

    renderPost(sendPost, 'afterbegin');

    form.reset();
  });

  createNewsBnt.addEventListener('click', () => {
    formDiv.classList.toggle('hidden');
  });
}
