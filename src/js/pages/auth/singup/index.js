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

  return elem;
}