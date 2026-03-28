const cars = [
    { name: 'Gunther Werks Turbo', img: 'Gunther-werks-turbo-3840x2160-25939.jpg', pr: 842, favorite: false, engine: '4.0L Air-Cooled Flat-Six', launched: '2023', stats: 'A carbon-fiber masterpiece honoring the air-cooled 911 legacy.' },
    { name: 'Lamborghini Reventon', img: 'lamborghini-reventon-3840x2160-76.jpg', pr: 915, favorite: false, engine: '6.5L V12', launched: '2008', stats: 'Jet-inspired styling with pure V12 aggression. 20 produced.' },
    { name: 'Aston Martin AMR26', img: 'aston-martin-amr26-3840x2160-25911.jpg', pr: 980, favorite: false, engine: 'F1 Hybrid Unit', launched: '2026', stats: 'Extreme aerodynamics built with Formula 1 engineering.' },
    { name: 'Ferrari 499P 2026', img: 'ferrari-499p-2026-3840x2160-25931.jpg', pr: 988, favorite: false, engine: '3.0L V6 Hybrid', launched: '2026', stats: 'The evolution of Ferraris Le Mans winning Hypercar.' },
    { name: 'Ferrari Daytona SP3', img: 'ferrari-daytona-sp3-3840x2160-25770.jpeg', pr: 945, favorite: false, engine: '6.5L V12', launched: '2021', stats: 'Naturally aspirated V12 art celebrating vintage racing.' },
    { name: 'Ferrari 499P', img: 'ferrari-499p-3840x2160-25929.jpg', pr: 970, favorite: false, engine: '2.9L V6 Hybrid', launched: '2023', stats: 'The return of Ferrari to the top class of endurance racing.' },
    { name: 'Manhart MH7 700', img: 'manhart-mh7-700-bmw-3840x2160-25963.jpg', pr: 890, favorite: false, engine: '4.4L Twin-Turbo V8', launched: '2022', stats: 'Executive BMW sedan tuned into a 700HP powerhouse.' },
    { name: 'Bugatti Veyron GS', img: 'bugatti-veyron-grand-sport-roadster-5k-3840x2160-141.jpg', pr: 965, favorite: false, engine: '8.0L W16 Quad-Turbo', launched: '2009', stats: 'Open-top luxury with quad-turbo W16 performance.' },
    { name: 'Koenigsegg Jesko', img: 'forza-motorsport-8-koenigsegg-jesko-2023-games-xbox-series-3840x2160-8204.jpg', pr: 1040, favorite: false, engine: '5.0L Twin-Turbo V8', launched: '2021', stats: 'Features the Light Speed Transmission and 1600 HP.' }
];

const prototypes = [
    { name: 'Rolls-Royce Vision 100', img: 'rr vision 100.jpg', pr: 'CONCEPT' },
    { name: 'Polestar Synergy', img: 'not valid.jpeg', pr: 'CONCEPT' },
    { name: 'Lamborghini Lanzador', img: 'lambo lazandor.jpg', pr: 'CONCEPT' },
    { name: 'Hyundai N Vision 74', img: 'hyundai N vision 74.jpg', pr: 'CONCEPT' },
    { name: 'BMW i Vision Dee', img: 'bmw i vision dee.jpeg', pr: 'CONCEPT' }
];

let showingOnlyFavs = false;

function renderGarage(filterQuery = "", favoritesOnly = false) {
    const grid = document.getElementById('car-grid');
    grid.innerHTML = "";
    cars.forEach((car, index) => {
        const matchesSearch = car.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
                             car.engine.toLowerCase().includes(filterQuery.toLowerCase());
        const matchesFav = !favoritesOnly || car.favorite;
        if (!matchesSearch || !matchesFav) return;
        const card = document.createElement('div');
        card.className = `car-card ${car.favorite ? 'is-favorite' : ''}`;
        card.innerHTML = `
            <div class="pr-badge">PR ${car.pr}</div>
            <div class="heart-icon ${car.favorite ? 'active' : ''}" onclick="toggleFavorite(event, ${index})">❤</div>
            <img src="${car.img}" onclick="showSpecs('${car.name}')">
            <div style="padding:15px" onclick="showSpecs('${car.name}')"><h3>${car.name}</h3></div>`;
        grid.appendChild(card);
    });
}

function renderPrototypes() {
    const grid = document.getElementById('proto-grid');
    grid.innerHTML = "";
    prototypes.forEach(p => {
        grid.innerHTML += `
            <div class="car-card">
                <div class="pr-badge">${p.pr}</div>
                <img src="${p.img}">
                <div style="padding:15px"><h3>${p.name}</h3></div>
            </div>`;
    });
}

function showSpecs(name) {
    const car = cars.find(c => c.name === name);
    if(!car) return;
    document.getElementById('modal-car-name').innerText = car.name;
    document.getElementById('modal-pr').innerText = car.pr;
    document.getElementById('modal-img').src = car.img;
    document.getElementById('modal-car-stats').innerHTML = `
        <div class="spec-row"><strong>ENGINE:</strong> <span>${car.engine}</span></div>
        <div class="spec-row"><strong>LAUNCHED:</strong> <span>${car.launched}</span></div>
        <p style="color:#777; margin-top:20px; font-style:italic;">${car.stats}</p>`;
    document.getElementById('spec-modal').style.display = 'block';
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
    document.getElementById('prototypes-page').style.display = (page === 'prototypes') ? 'block' : 'none';
    if(page === 'gallery') renderGallery();
    if(page === 'compare') setupCompare();
    if(page === 'prototypes') renderPrototypes();
}

function renderGallery() {
    const g = document.getElementById('masonry-grid');
    g.innerHTML = "";
    cars.forEach(c => {
        g.innerHTML += `<div class="masonry-item" onclick="showSpecs('${c.name}')"><img src="${c.img}"></div>`;
    });
}

function setupCompare() {
    const s1 = document.getElementById('select-1');
    const s2 = document.getElementById('select-2');
    s1.innerHTML = s2.innerHTML = "";
    cars.forEach((c, i) => { 
        s1.innerHTML += `<option value="${i}">${c.name}</option>`; 
        s2.innerHTML += `<option value="${i}">${c.name}</option>`; 
    });
    s2.selectedIndex = 1;
    updateComparison();
}

function updateComparison() {
    const c1 = cars[document.getElementById('select-1').value];
    const c2 = cars[document.getElementById('select-2').value];
    const d1 = document.getElementById('display-1'); 
    const d2 = document.getElementById('display-2');
    d1.innerHTML = `<img src="${c1.img}" style="width:100%"><h3>${c1.name}</h3><h2 style="color:var(--nfs-orange)">PR ${c1.pr}</h2>`;
    d2.innerHTML = `<img src="${c2.img}" style="width:100%"><h3>${c2.name}</h3><h2 style="color:var(--nfs-orange)">PR ${c2.pr}</h2>`;
}

function startRace() {
    updateComparison(); // Simple race logic for now
}

function closeModal() { document.getElementById('spec-modal').style.display = 'none'; }

renderGarage();

//bruhhhhhhhhhhhhhhhhhhh
function showPage(page) {
    if (page === 'prototypes') {
        const code = prompt("ENTER ACCESS CODE TO VIEW CLASSIFIED PROTOTYPES:");
        
        // You can change '1234' to any secret code you want!
        if (code === 'A') { 
            alert("ACCESS GRANTED. LOADING FUTURE CONCEPTS...");
        } else {
            alert("ACCESS DENIED. CLASSIFIED DATA ONLY.");
            return; // Stops the function here so the page doesn't open
        }
    }

    // Your existing page-switching logic
    document.getElementById('garage-page').style.display = (page === 'garage') ? 'block' : 'none';
    document.getElementById('compare-page').style.display = (page === 'compare') ? 'block' : 'none';
    document.getElementById('gallery-page').style.display = (page === 'gallery') ? 'block' : 'none';
    document.getElementById('prototypes-page').style.display = (page === 'prototypes') ? 'block' : 'none';

    if(page === 'gallery') renderGallery();
    if(page === 'compare') setupCompare();
    if(page === 'prototypes') renderPrototypes();
}
