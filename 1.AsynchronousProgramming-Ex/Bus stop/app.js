function getInfo() {
    let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
    let inputEl = document.getElementById('stopId');
    let ulEls = document.getElementById('buses');
    let divEl = document.getElementById('stopName');

    fetch(`${baseUrl}/${inputEl.value}`)
        .then(response => response.json())
        .then(data => {
            let buses = data.buses;
            let name = data.name;

            divEl.textContent = name;
            ulEls.innerHTML = '';
            Object.keys(buses).forEach(bus => {
                let liEl = document.createElement('li');
                liEl.textContent = `Bus ${bus} arrive in ${buses[bus]} minutes`;
                ulEls.appendChild(liEl);
            })
        })
        .catch(err => {
            divEl.textContent = 'Error';
            ulEls.textContent = '';
        })
}
