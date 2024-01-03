export function createArticlesList(posts) {
  const articlesListElem = document.createElement('div');
  articlesListElem.classList.add('articles-list');

  renderPostsList(posts, articlesListElem);

  return articlesListElem;
}

export function renderPostsList(posts, elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.lastChild);
  }

  posts.forEach((post) => {
    renderPost(post, 'beforeend', elem);
  });
}

export function renderPost(post, position, elem) {
  const postTmp = createPostTmp(post);
  elem.insertAdjacentHTML(position, postTmp);
}

function createPostTmp(post) {
  const postTmp = `
    <article class="article" id="${post.id}">
      <div class="article-author">
        <div class="author-img">
          ${post.author.avatarUrl
      ? `<img src="${post.author.avatarUrl}" alt="${post.author.alias}">`
      : `<img src="https://icon-library.com/images/avatar-icon-png/avatar-icon-png-15.jpg" alt="No photo">`
    }
        </div>
        <div class="author-info">
          <a href="#!" class="author-name">
            <span>${post.author.alias}</span>
          </a>
          <span class="published-time">${post.timePublished}</span>
        </div>
      </div>

      <h2 class="article-title">
        <a href="#!">
          <span>${post.titleHtml}</span>
        </a>
      </h2>

      <div class="article-status">
        <div class="icon">
          <svg height="24" width="24">
            <title>Время на прочтение</title>
            <use xlink:href="./static/icons/svg-inons.svg#scheduled"></use>
          </svg>
          <span>${post.readingTime} мин</span>
        </div>
        <div class="icon">
          <svg height="24" width="24px">
            <title>Количество просмотров</title>
            <use xlink:href="./static/icons/svg-inons.svg#counter-views"></use>
          </svg>
          <span>${formatViewCount(post.statistics.readingCount)}</span>
        </div>
      </div>

      <div class="article-hubs">
        <span>${post.hubs.map((obj) => makeHubLink(obj)).join(', ')}</span>
      </div>

      <div class="article-body">
        <div class="cover">
          ${post.leadData.imageUrl
      ? `<img src="${post.leadData.image.url}" alt="${post.leadData.image.fit}">`
      : ''
    }
        </div>
        <div class="text">
          <span>${post.leadData.textHtml}</span>
        </div>
        <a href="#!" class="read-more-button">Читать далее</a>
      </div>

      <div class="article-icons">
        <div class="icon">
          <svg height="24" width="24px">
            <title>Всего голосов ${post.statistics.votesCount}: ↑${post.statistics.votesCountPlus} и
              ↓${post.statistics.votesCountMinus}</title>
            <use xlink:href="./static/icons/svg-inons.svg#counter-rating"></use>
          </svg>
          <span>${post.statistics.score}</span>
        </div>
        <div class="icon">
          <button type="button" class="icon-button">
            <svg height="24" width="24px">
              <title>Добавить в закладки</title>
              <use xlink:href="./static/icons/svg-inons.svg#counter-favorite"></use>
            </svg>
          </button>
          <span>${post.statistics.favoritesCount}</span>
        </div>
        <div class="icon">
          <button type="button" class="icon-button">
            <svg height="24" width="24px">
              <title>Поделиться</title>
              <use xlink:href="./static/icons/svg-inons.svg#forward"></use>
            </svg>
          </button>
        </div>
        <div class="icon">
          <a href="#!">
            <svg height="24" width="24px">
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
  return `<a href="#!" class="hub-link">${hub.titleHtml}</a>`;
}