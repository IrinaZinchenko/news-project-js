import { createFilter } from "./filter.js";
import { createArticlesList } from "./articles-list.js";

import { sortPosts } from "./common.js";

import { articlesData } from "../../../mock/data.js";
import { state } from "../../state/index.js";

export const Main = () => {
  const wrapper = document.createDocumentFragment();

  const posts = sortPosts(articlesData, state.sortType);
  const articlesList = createArticlesList(posts);

  const main = document.createElement('main');
  main.append(articlesList);

  const filter = createFilter(articlesList);
  main.prepend(filter);

  wrapper.append(main);

  return wrapper;
}