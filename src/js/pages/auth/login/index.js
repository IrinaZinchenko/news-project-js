export const Login = () => {
  const elem = document.createElement('div');
  elem.classList.add('log-in');

  // const users = [
  //   {
  //     id: 1,
  //     userName: 'Irina',
  //     password: '12345',
  //   },
  // ];

  // localStorage.setItem('users', JSON.stringify(users));

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

  loginBtn.addEventListener('click', (event) => {
    const form = elem.querySelector('.log-in-form');

    const formData = new FormData(form);

    const userName = formData.get('username');
    const password = formData.get('password');

    if (userName && password) {
      const usersJSON = localStorage.getItem('users');

      if (usersJSON) {
        const users = JSON.parse(usersJSON);

        const foundUser = users.find((user) => user.userName == userName && user.password == password);
        if (foundUser) {
          sessionStorage.setItem('auth', 'true');
        } else {
          sessionStorage.clear();
        }
      }
    } else {
      event.preventDefault();
    }
  });

  return elem;
}