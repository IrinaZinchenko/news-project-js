export const Login = () => {
  const elem = document.createElement('div');
  elem.classList.add('log-in');

  const loginTmp = `
    <form class="log-in-form">
      <div class="form-field">
        <label for="username">Имя пользователя</label>
        <input id="username" name="username" type="text" placeholder="Введите имя">
      </div>
      <div class="form-field">
        <label for="password">Пароль</label>
        <input id="password" name="password" type="password" placeholder="Введите пароль">
      </div>

      <a href="/" class="log-in-btn">Войти</a>
    </form>
  `;

  elem.insertAdjacentHTML('afterbegin', loginTmp);

  return elem;
}