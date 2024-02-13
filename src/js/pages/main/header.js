import router from "../../submodules/spa-router/index.js";

export function createHeader(elem) {
  const headerTmp = createHeaderTmp();

  const header = document.createElement('header');
  header.classList.add('header');
  header.insertAdjacentHTML('afterbegin', headerTmp);

  initListeners(header);

  return header;
}

function createHeaderTmp() {
  const headerTmp = `
    <div class="log-out-btn-container">
      <button class="log-out-btn" type="button">Выйти</button>
    </div>`;

  return headerTmp;
}

function initListeners(header) {
  const logOutBnt = header.querySelector('.log-out-btn');

  logOutBnt.addEventListener('click', logout);
}

function logout() {
  localStorage.clear();
  router.navigate("/log-in");
}


