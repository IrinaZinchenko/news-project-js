export function createFilter() {
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