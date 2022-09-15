function attachEvents() {

    document.querySelector('#btnLoad').addEventListener('click', load);
    document.querySelector('#btnCreate').addEventListener('click', create);
    document.querySelector('#phonebook').addEventListener('click', remove);
}
let url = 'http://localhost:3030/jsonstore/phonebook';
let phoneBook = document.querySelector('#phonebook');

function create() {
    let name = document.querySelector('#person');
    let number = document.querySelector('#phone');

    if (!name.value || !number.value) {
        return;
    };
    fetch(url, {
        method: 'POST',
        header: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            person: name.value.trim(),
            phone: number.value.trim()
        })
    })
        .then(res => res.json())
        .catch(err => alert(err.message));

    name.value = '';
    number.value = '';
};

function load() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            phoneBook.replaceChildren(); //зачистване на ul /махане на всички елементи
            Object.values(data).forEach(p => {
                let liElement = document.createElement('li');
                liElement.textContent = `${p.person}: ${p.phone}`;
                let btnDelete = document.createElement('button');
                btnDelete.textContent = 'Delete';
                btnDelete.setAttribute('id', p._id); //слагаме id като атрибут
                liElement.appendChild(btnDelete);
                phoneBook.appendChild(liElement);
            })
        })
};

function remove(e) {
    let currentId = e.target.id;
    if (e.target.textContent == 'Delete') {
        fetch(`${url}/${currentId}`, {
            method: 'DELETE'
        })
            .then(res => {
                load();
                return res.json()
            })
            .catch(err => alert(err.message))
    }
};

attachEvents();
