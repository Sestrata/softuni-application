import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const cardTemplate = (c) => html`
    <li>
        <img src="./images/${c.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${onClick}>Show status code</button>
            <div class="status" style="display:none" id="${c.id}">
                <h4>Status Code: ${c.statusCode}</h4>
                <p>${c.statusMessage}</p>
            </div>
        </div>
    </li>`

function onClick(ev) {
    let cat = ev.target.parentNode;
    let result = cat.querySelector('.status').style.display;
    if (result == 'block') {
        cat.querySelector('.status').style.display = 'none';
    } else {
        cat.querySelector('.status').style.display = 'block';
    }
}

let result = cats.map(cardTemplate);
let main = document.getElementById('allCats');
render(result, main);
