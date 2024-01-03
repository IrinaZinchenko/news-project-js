export const Login = () => {
  const elem = document.createElement('div');
  elem.classList.add('log-in');

  const loginTmp = `
    <form>
      <input id="username" type="text" placeholder="Введите имя">
      <input id="password" type="password" placeholder="Введите пароль">

      <a href="/">Войти</a>
    </form>
  `;

  elem.insertAdjacentHTML('afterbegin', loginTmp);

  return elem;
}