export function sortPosts(posts, type) {
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

export function searchPosts(posts, searchStr) {
  const regExpSearch = new RegExp(searchStr, 'i');
  const searchedPosts = searchStr ? posts.filter((element) => regExpSearch.test(element.titleHtml)) : posts;

  return searchedPosts;
}

export function searchAndSort(posts, state) {
  const searchedPosts = searchPosts(posts, state.searchStr);
  const sortedPosts = sortPosts(searchedPosts, state.sortType);

  return sortedPosts;
}