function solve() {

    let infoEl = document.querySelector('.info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    let busStop = {
        next: 'depot'
    }

    function depart() {
        departBtn.disabled = true;
        let url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                busStop = JSON.parse(JSON.stringify(data)); //за да няма референция м/у busStop и data
                infoEl.textContent = `Next stop ${busStop.name}`
            })
            .catch(error => console.log(error));
        arriveBtn.disabled = false;
    }

    function arrive() {
        infoEl.textContent = `Arriving at ${busStop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
