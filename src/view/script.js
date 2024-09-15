let map = L.map('map', {
    center: [-6.887698002563706, -38.56015173326553],
    zoom: 15,
    minZoom: 14,
    maxZoom: 16
});

let houseIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2286/2286054.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50], 
});

let marker = L.marker([-6.887698002563706, -38.56015173326553], {
    draggable: true,
    icon: houseIcon
}).addTo(map);

map.locate();

map.on('locationfound', e => {
    marker.setLatLng(e.latlng);
    map.setView(e.latlng);
});

map.on('click', l => {
    marker.setLatLng(l.latlng);
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const button = document.getElementById('button');
button.addEventListener('click', () => {
    const lat = marker.getLatLng().lat;
    const lng = marker.getLatLng().lng;

    const nome = document.getElementById('nomeHotel').value;
    const cnpj = document.getElementById('cnpj').value;

    // Validação básica dos inputs
    if (!nome || !cnpj) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const coordinates = [lat, lng];
    const hotel = {
        nome,
        cnpj,
        "localizacao": {
            "type": "Point",
            coordinates
        }
    };

    fetch('http://localhost:3000/hotel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotel)
    }).then(() => {
        console.log('Hotel registrado com sucesso!');
        alert('Hotel registrado com sucesso!');
        listarHoteis();
    }).catch(error => {
        console.log('Erro ao registrar hotel:', error);
        alert('Erro ao registrar hotel. Consulte o console para mais detalhes.');
    });
});

function listarHoteis() {
    fetch('http://localhost:3000/hotel')
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data); // Verifica se os dados estão corretos
            displayHoteis(data);
        })
        .catch(e => {
            console.error('Erro ao buscar hotéis:', e);
        });
}


function displayHoteis (hotel) {
    const dados = document.getElementById('dados');
    dados.innerHTML = '';
    console.log(hotel);
    hotel.forEach(e => {
        const tr = document.createElement('tr');

        const id = document.createElement('td');

        const nome = document.createElement('td');

        const cnpj = document.createElement('td');

        const latitude = document.createElement('td');

        const longitude = document.createElement('td');

        const tdButtonEdit = document.createElement('td');
        const buttonEdit = document.createElement('button');
        const linkButtonEdit = document.createElement('a');
        const imgButtonEdit = document.createElement('img');

        const tdButtonDelete = document.createElement('td');
        const buttonDelete = document.createElement('button');
        const imgButtonDelete = document.createElement('img');

        linkButtonEdit.href = `./editHotel.html?id=${e.id}`

        imgButtonEdit.classList.add('IconEditDele');
        imgButtonEdit.id = 'icon-edit-hotel'
        imgButtonEdit.src = './icons/pen.png'

        imgButtonDelete.classList.add('IconEditDelete');
        buttonDelete.id = 'icon-delete-hotel'
        imgButtonDelete.src = './icons/delete.png'

        id.textContent = e.id;
        nome.textContent = e.nome;
        cnpj.textContent = e.cnpj;
        latitude.textContent = e.localizacao.coordinates[1];
        longitude.textContent = e.localizacao.coordinates[0];

        linkButtonEdit.appendChild(imgButtonEdit);
        buttonEdit.appendChild(linkButtonEdit);
        
        buttonDelete.appendChild(imgButtonDelete);

        buttonDelete.dataset.id = e.id;

        tdButtonDelete.appendChild(buttonDelete);
        tdButtonEdit.appendChild(buttonEdit);

        tr.appendChild(id);
        tr.appendChild(nome);
        tr.appendChild(cnpj);
        tr.appendChild(latitude);
        tr.appendChild(longitude);
        tr.appendChild(tdButtonEdit);
        tr.appendChild(tdButtonDelete);

        dados.appendChild(tr);
    });
}

document.getElementById('dados').addEventListener('click', (event) => {
    const button = event.target.closest('button');
    const id = button.dataset.id;
    fetch(`http://localhost:3000/hotel/${id}`, {
        method: 'DELETE'
    }).then(() => {
        listarHoteis();
    })
});

const buttonSearch = document.getElementById('buttonPesquisar');
buttonSearch.addEventListener('click', () => {
    const cnpj = document.getElementById('pesquisar').value;
    fetch(`http://localhost:3000/hotel/${cnpj}`).then(response => response.json()
    ).then(response => {
        displayHoteis([response]);
    }).catch(error  => {
        console.log(error);
    });
});

listarHoteis();
