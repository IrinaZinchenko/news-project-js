import { state } from "../../state/index.js";

import { createHeader } from "./header.js";
import { createFilter } from "./filter.js";
import { createArticlesList } from "./articles-list.js";
import { sortPosts } from "./common.js";

export const Main = async () => {
  const wrapper = document.createDocumentFragment();

  const postData = await getPosts();
  state.posts = postData;

  const posts = sortPosts(state.posts, state.sortType);
  const articlesList = createArticlesList(posts);

  const header = createHeader();

  const main = document.createElement('main');
  main.append(articlesList);

  const filter = createFilter(articlesList);
  main.prepend(filter);

  wrapper.append(header, main);

  return wrapper;
}

async function getPosts() {
  const response = await fetch('http://localhost:3001/posts');
  const posts = await response.json();

  return posts;
}