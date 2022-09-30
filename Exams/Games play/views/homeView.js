import { get } from "../services/api.js";
import { html } from "../util.js";

const template = (games) => html`
<section id="welcome-world">
    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">
    <div id="home-page">
        <h1>Latest Games</h1>
        ${games.length > 0
        ? games.map(gameTemplate)
        : html `<p class="no-articles">No games yet</p>`}
    </div>
</section>`

const gameTemplate = (game) => html`
<div class="game">
    <div class="image-wrap">
        <img src="${game.imageUrl}">
    </div>
    <h3>${game.title}</h3>
    <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
        <a href="/details/${game._id}" class="btn details-btn">Details</a>
    </div>
</div>
`
export async function homeView(ctx) {
    const games = await get('/data/games?sortBy=_createdOn%20desc&distinct=category');
    ctx.render(template(games));
}
