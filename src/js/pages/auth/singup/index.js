// Пока что это копия log-in

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

  signupBtn.addEventListener('click', (event) => {
    const form = elem.querySelector('.sign-up-form');

    const formData = new FormData(form);

    const userName = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (userName && password && confirmPassword) {
      const usersJSON = localStorage.getItem('users');

      if (usersJSON) {
        const users = JSON.parse(usersJSON);

        users.push({
          id: Date.now(),
          userName,
          password
        });

        localStorage.setItem('users', JSON.stringify(users));
      }
    } else {
      event.preventDefault();
    }
  });

  return elem;
}