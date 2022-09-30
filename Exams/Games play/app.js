import { logout } from "./services/user.js";
import { render, setNavBar, page } from "./util.js";
import { allGamesView } from "./views/allGamesView.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";

const main = document.querySelector('main');

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/allGames', allGamesView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page.start();

setNavBar();

function renderMain(template) {
    setNavBar();
    return render(template, main);
}

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.setNavBar = setNavBar;
    next();
}

const logoutBtn = document.querySelectorAll('nav a')[2];
logoutBtn.addEventListener('click', async () => {
    await logout();
    page.redirect('/');
});
