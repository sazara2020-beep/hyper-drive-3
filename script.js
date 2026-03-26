const cars = [
    { name: 'Gunther Werks Turbo', img: 'Gunther-werks-turbo-3840x2160-25939.jpg', pr: 842, favorite: false, engine: '4.0L Air-Cooled Flat-Six', launched: '2023', stats: 'A bespoke carbon-fiber masterpiece.' },
    { name: 'Lamborghini Reventon', img: 'lamborghini-reventon-3840x2160-76.jpg', pr: 915, favorite: false, engine: '6.5L V12', launched: '2008', stats: 'Jet-inspired styling, only 20 produced.' },
    { name: 'Aston Martin AMR26', img: 'aston-martin-amr26-3840x2160-25911.jpg', pr: 980, favorite: false, engine: 'F1 Hybrid Unit', launched: '2026', stats: 'F1 technology for the streets.' },
    { name: 'Ferrari 499P 2026', img: 'ferrari-499p-2026-3840x2160-25931.jpg', pr: 988, favorite: false, engine: '3.0L V6 Hybrid', launched: '2026', stats: 'The future of endurance racing.' },
    { name: 'Ferrari Daytona SP3', img: 'ferrari-daytona-sp3-3840x2160-25770.jpeg', pr: 945, favorite: false, engine: '6.5L V12', launched: '2021', stats: 'Naturally aspirated art.' },
    { name: 'Ferrari 499P', img: 'ferrari-499p-3840x2160-25929.jpg', pr: 970, favorite: false, engine: '2.9L V6 Hybrid', launched: '2023', stats: 'The return to Le Mans dominance.' },
    { name: 'Manhart MH7 700', img: 'manhart-mh7-700-bmw-3840x2160-25963.jpg', pr: 890, favorite: false, engine: '4.4L Twin-Turbo V8', launched: '2022', stats: 'Executive performance tuned.' },
    { name: 'Bugatti Veyron GS', img: 'bugatti-veyron-grand-sport-roadster-5k-3840x2160-141.jpg', pr: 965, favorite: false, engine: '8.0L W16 Quad-Turbo', launched: '2009', stats: '1001 HP open-top legend.' },
    { name: 'Koenigsegg Jesko', img: 'forza-motorsport-8-koenigsegg-jesko-2023-games-xbox-series-3840x2160-8204.jpg', pr: 1040, favorite: false, engine: '5.0L Twin-Turbo V8', launched: '2021', stats: 'The ultimate speed record seeker.' }
];

let showingOnlyFavs = false;
let currentTuningCar = null;

// Initialize
function renderGarage(filterQuery = "", favoritesOnly = false) {
    const grid = document.getElementById('car-grid');
    grid.innerHTML = "";
    cars.forEach((car, index) => {
        const matchesSearch = car.name.toLowerCase().includes(filterQuery.toLowerCase());
        const matchesFav = !favoritesOnly || car.favorite;
        if (!matchesSearch || !matchesFav) return;

        const card = document.createElement('div');
        card.className = `car-card ${car.favorite ? 'is-favorite' : ''}`;
        card.innerHTML = `
            <div class="pr-badge">PR ${car.pr}</div>
            <div class="heart-icon ${car.favorite ? 'active' : ''}" onclick="toggleFavorite(event, ${index})">❤</div>
            <img src="${car.img}" onclick="showSpecs('${car.name}')">
            <div style="padding:15px" onclick="showSpecs('${car.name}')"><h3>${car.name}</h3></div>
        `;
        grid.appendChild(card);
    });
}

function showSpecs(name) {
    const car = cars.find(c => c.name === name);
    currentTuningCar = car;
    document.getElementById('modal-car-name').innerText = car.name;
    document.getElementById('modal-pr').innerText = car.pr;
    document.getElementById('modal-img').src = car.img;
    document.getElementById('mod-status').innerHTML = car.isModified ? '<span class="mod-tag">MODIFIED</span>' : '';
    document.getElementById('modal-car-stats').innerHTML = `
        <div class="spec-row"><strong>ENGINE:</strong> <span>${car.engine}</span></div>
        <div class="spec-row"><strong>LAUNCHED:</strong> <span>${car.launched}</span></div>
        <p style="color:#777; margin-top:15px; font-style:italic;">${car.stats}</p>
    `;
    document.getElementById('tune-btn').onclick = tuneCar;
    document.getElementById('spec-modal').style.display = 'block';
}

function tuneCar() {
    currentTuningCar.pr += 10;
    currentTuningCar.isModified = true;
    const prSpan = document.getElementById('modal-pr');
    prSpan.innerText = currentTuningCar.pr;
    prSpan.classList.remove('tuning-up');
    void prSpan.offsetWidth; // Reset animation
    prSpan.classList.add('tuning-up');
    document.getElementById('mod-status').innerHTML = '<span class="mod-tag">MODIFIED</span>';
    renderGarage();
}

function toggleFavorite(e, index) {
    e.stopPropagation();
    cars[index].favorite = !cars[index].favorite;
    renderGarage(document.getElementById('car-search').value, showingOnlyFavs);
}

function filterCars() { renderGarage(document.getElementById('car-search').value, showingOnlyFavs); }

function toggleFavFilter() {
    showingOnlyFavs = !showingOnlyFavs;
    document.getElementById('fav-filter').classList.toggle('active');
    renderGarage("", showingOnlyFavs);
}

function showPage(page) {
    document.getElementById('garage-page').style.display = (page === 'garage') ? 'block' : 'none';
    document.getElementById('compare-page').style.display = (page === 'compare') ? 'block' : 'none';
    document.getElementById('gallery-page').style.display = (page === 'gallery') ? 'block' : 'none';
    if(page === 'gallery') renderGallery();
    if(page === 'compare') setupCompare();
}

function renderGallery() {
    const g = document.getElementById('masonry-grid');
    g.innerHTML = "";
    cars.forEach(c => {
        g.innerHTML += `<div class="masonry-item" onclick="showSpecs('${c.name}')"><img src="${c.img}"></div>`;
    });
}

function closeModal() { document.getElementById('spec-modal').style.display = 'none'; }

// Run on start
renderGarage();