import router from '../../../submodules/spa-router/index.js';

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
      <a href="/sign-up" class="sign-up-btn">Зарегистрироваться</a>
    </form>
  `;

  elem.insertAdjacentHTML('afterbegin', loginTmp);

  const loginBtn = elem.querySelector('.log-in-btn');

  loginBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const form = elem.querySelector('.log-in-form');

    const formData = new FormData(form);

    const userName = formData.get('username');
    const password = formData.get('password');

    if (userName && password) {
      const user = await login(userName, password);

      if (user) {
        localStorage.setItem('token', user.token);
        router.navigate('/');
      } else {
        localStorage.clear();
      }
    }
  });

  return elem;
}

async function login(name, password) {
  const response = await fetch(`http://localhost:3001/users?name=${name}&password=${password}`);
  const user = await response.json();

  return user ? user[0] : undefined;
}