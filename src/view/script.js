let map = L.map('map', {
    center: [-6.887698002563706, -38.56015173326553],
    zoom: 12,
    minZoom: 6,
    maxZoom: 18
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

    console.log(lat);
    

    const nome = document.getElementById('nomeHotel').value;
    const cnpj = document.getElementById('cnpj').value;
    const tipo = document.getElementById('tipo').value;
    console.log(tipo);

    // Validação básica dos inputs
    if (!nome || !cnpj || !tipo) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const coordinates = [lng, lat];
    const hotel = {
        nome,
        cnpj,
        "localizacao": {
            "type": "Point",
            coordinates
        },
        tipo,
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

        const tipo = document.createElement('td');

        const latitude = document.createElement('td');

        const longitude = document.createElement('td');

        const tdButtonEdit = document.createElement('td');
        const buttonEdit = document.createElement('button');
        const linkButtonEdit = document.createElement('a');
        const imgButtonEdit = document.createElement('img');

        const tdButtonDelete = document.createElement('td');
        const buttonDelete = document.createElement('button');
        const imgButtonDelete = document.createElement('img');

        linkButtonEdit.href = `./editHotel.html?_id=${e._id}`

        imgButtonEdit.classList.add('IconEditDele');
        imgButtonEdit.id = 'icon-edit-hotel'
        imgButtonEdit.src = './icons/pen.png'

        imgButtonDelete.classList.add('IconEditDelete');
        buttonDelete.id = 'icon-delete-hotel'
        imgButtonDelete.src = './icons/delete.png'

        id.textContent = e._id;
        nome.textContent = e.nome;
        cnpj.textContent = e.cnpj;
        tipo.textContent = e.tipo;
        latitude.textContent = e.localizacao.coordinates[1];
        longitude.textContent = e.localizacao.coordinates[0];

        linkButtonEdit.appendChild(imgButtonEdit);
        buttonEdit.appendChild(linkButtonEdit);
        
        buttonDelete.appendChild(imgButtonDelete);

        buttonDelete.dataset._id = e._id;

        buttonDelete.className = 'buttonDelete'
        tdButtonDelete.appendChild(buttonDelete);
        buttonEdit.className = 'buttonEdit'
        tdButtonEdit.appendChild(buttonEdit);

        tr.appendChild(id);
        tr.appendChild(nome);
        tr.appendChild(cnpj);
        tr.appendChild(tipo);
        tr.appendChild(latitude);
        tr.appendChild(longitude);
        tr.appendChild(tdButtonEdit);
        tr.appendChild(tdButtonDelete);

        dados.appendChild(tr);
    });
}

document.getElementById('dados').addEventListener('click', (event) => {
    const button = event.target.closest('button');
    console.log(button);
    const _id = button.dataset._id;
    console.log(_id);
    
    fetch(`http://localhost:3000/hotel/${_id}`, {
        method: 'DELETE'
    }).then(() => {
        listarHoteis();
    })
});

const buttonSearch = document.getElementById('buttonPesquisar');
buttonSearch.addEventListener('click', () => {
    const nome = document.getElementById('pesquisar').value;
    fetch("http://localhost:3000/search?search=" + nome)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                displayHoteis(data);
            } else {
                displayHoteis([data]);
            }
        })
        .catch(error => {
            console.log(error);
        });
});


listarHoteis();

// function handleSearch(){
//     fetch("http://localhost:3000/product-search?search=" + searchText, {
//       method: "GET",
//       headers: {
//         "authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     })
//     .then((res) => res.json())
//     .then((data: []) => {setProducts([...data]); console.log(products)})
// }

