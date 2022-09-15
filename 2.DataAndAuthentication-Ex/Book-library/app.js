let loadBookBtn = document.querySelector('#loadBooks');
let url = 'http://localhost:3030/jsonstore/collections/books';
let tbodyEl = document.getElementsByTagName('tbody')[0];
let formEl = document.getElementsByTagName('form')[0];

formElement.addEventListener('submit', function (e) {
    e.preventDefault();
})

loadBookBtn.addEventListener('click', loadBooks);
async function loadBooks() {
    try {
        let response = await fetch(url);
        if (response.status != 200) {
            throw new Error('Problem loading data.');
        }
        let data = await response.json();
        let entries = Object.entries(data);
        tbodyEl.innerHTML = '';

        for (let [key, { author, title }] of entries) {
            let trElement = document.createElement('tr');
            let titleTdElement = document.createElement('td');
            titleTdElement.textContent = title;
            let authorTdElement = document.createElement('td');
            authorTdElement.textContent = author;

            trElement.appendChild(titleTdElement);
            trElement.appendChild(authorTdElement);

            let newTdElement = document.createElement('td');
            let editBtn = document.createElement('button');
            let deleteBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            deleteBtn.textContent = 'Delete';
            newTdElement.appendChild(editBtn);
            newTdElement.appendChild(deleteBtn);

            trElement.appendChild(newTdElement);
            tbodyEl.appendChild(trElement);

            editBtn.addEventListener('click', edti);
            function edit(e) {
            }

            deleteBtn.addEventListener('click', remove);
            function remove(e) {
                e.preventDefault();
                fetch(`${url}/${key}`, {
                    method: 'DELETE'
                })
                trElement.remove();
            }
        }
    } catch (error) {

    }
}
