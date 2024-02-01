import router from '../../../submodules/spa-router/index.js';
import { login } from '../login/index.js';

export const Signup = () => {
  const elem = document.createElement('div');
  elem.classList.add('sign-up');

  const signupTmp = `
    <form class="sign-up-form">
      <div class="form-field">
        <label for="username">Имя пользователя</label>
        <input id="username" name="username" type="text" placeholder="Введите имя">
      </div>

      <div class="form-field">
        <label for="password">Пароль</label>
        <input id="password" name="password" type="password" placeholder="Введите пароль">
      </div>

      <div class="form-field">
        <label for="confirm-password">Подтверждение пароля</label>
        <input id="confirm-password" name="confirm-password" type="password" placeholder="Введите пароль">
      </div>

      <a href="/log-in" class="sign-up-btn">Зарегистрироваться</a>
    </form>
  `;

  elem.insertAdjacentHTML('afterbegin', signupTmp);

  const signupBtn = elem.querySelector('.sign-up-btn');

  signupBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const form = elem.querySelector('.sign-up-form');

    const formData = new FormData(form);

    const userName = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (!userName || !password || !confirmPassword) {
      return;
    }

    const newUser = {
      "id": String(Date.now()),
      "alias": `${userName}`,
      "name": `${password}`,
      "password": `${password}`,
      "token": `${createToken()}`,
      "avatarUrl": null,
      "speciality": null
    }

    const createdUser = await createUser(newUser);
    const loginUser = await login(createdUser.name, createdUser.password);

    if (loginUser) {
      localStorage.setItem('token', loginUser.token);
      router.navigate('/');
    } else {
      localStorage.clear();
    }
  });

  return elem;
}

async function createUser(newUser) {
  console.log(newUser)
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    body: JSON.stringify(newUser)
  });

  const user = await response.json();
  console.log(user);

  return user;
}

function createToken() {
  return Math.random().toString(36).substr(2);
}