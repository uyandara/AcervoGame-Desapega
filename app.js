// Dados Iniciais (Simulação de Anúncios da Região)
let products = [
    {
        id: 1,
        title: "iPhone 11 64GB Preto - Perfeito Estado",
        price: 1850,
        category: "Eletrônicos",
        location: "Umarizal",
        condition: "Usado",
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500",
        phone: "91999998888",
        date: "Hoje, 14:20"
    },
    {
        id: 2,
        title: "Bicicleta Aro 29 Alumínio 21 Marchas",
        price: 750,
        category: "Esportes",
        location: "Marco",
        condition: "Usado",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500",
        phone: "91988887777",
        date: "Hoje, 11:05"
    },
    {
        id: 3,
        title: "Apartamento 2 quartos com suíte em Nazaré",
        price: 240000,
        category: "Imóveis",
        location: "Nazaré",
        condition: "Usado",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
        phone: "91977776666",
        date: "Ontem, 18:45"
    },
    {
        id: 4,
        title: "Capinha de Celular Diversas - Ananindeua",
        price: 25,
        category: "Eletrônicos",
        location: "Ananindeua",
        condition: "Novo",
        image: "https://images.unsplash.com/photo-1541877944-ac82a091518a?w=500",
        phone: "91966665555",
        date: "Ontem, 09:12"
    }
];

// Elementos do DOM
const grid = document.getElementById("product-grid");
const searchText = document.getElementById("search-text");
const filterCategory = document.getElementById("filter-category");
const sidebarLocation = document.getElementById("sidebar-location");
const headerLocation = document.getElementById("header-location");
const priceMin = document.getElementById("price-min");
const priceMax = document.getElementById("price-max");

// Modal Elements
const modalPost = document.getElementById("modal-post");
const btnOpenPost = document.getElementById("btn-open-post");
const btnClosePost = document.getElementById("close-post");
const formPost = document.getElementById("form-post");

// Renderizar Anúncios
function renderProducts(items) {
    grid.innerHTML = "";
    document.getElementById("results-count").innerText = `${items.length} anúncios encontrados`;

    if (items.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Nenhum produto encontrado na região selecionada.</p>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" class="card-img" alt="${product.title}">
            <div class="card-body">
                <div class="card-title">${product.title}</div>
                <div class="card-price">R$ ${product.price.toLocaleString('pt-BR')}</div>
                <div class="card-info">
                    <span>${product.location}</span>
                    <span>${product.date}</span>
                </div>
            </div>
            <a href="https://wa.me/55${product.phone}?text=Olá!%20Vi%20seu%20anúncio%20'${encodeURIComponent(product.title)}'%20no%20Desapega%20Belém." 
               target="_blank" class="btn-contact-wa">
                <i class="fa-brands fa-whatsapp"></i> Falar com Vendedor
            </a>
        `;
        grid.appendChild(card);
    });
}

// Aplicar Filtros Gerais
function applyFilters() {
    const textQuery = searchText.value.toLowerCase();
    const selectedCat = filterCategory.value;
    const selectedLoc = sidebarLocation.value !== "all" ? sidebarLocation.value : headerLocation.value;
    const minP = parseFloat(priceMin.value) || 0;
    const maxP = parseFloat(priceMax.value) || Infinity;

    const filtered = products.filter(item => {
        const matchesText = item.title.toLowerCase().includes(textQuery);
        const matchesCat = selectedCat === "all" || item.category === selectedCat;
        const matchesLoc = selectedLoc === "all" || item.location === selectedLoc;
        const matchesPrice = item.price >= minP && item.price <= maxP;

        return matchesText && matchesCat && matchesLoc && matchesPrice;
    });

    renderProducts(filtered);
}

// Event Listeners
document.getElementById("btn-search").addEventListener("click", applyFilters);
document.getElementById("btn-apply-filters").addEventListener("click", applyFilters);
headerLocation.addEventListener("change", () => {
    sidebarLocation.value = headerLocation.value;
    applyFilters();
});

// Controls do Modal de Postagem
btnOpenPost.onclick = () => modalPost.style.display = "flex";
btnClosePost.onclick = () => modalPost.style.display = "none";
window.onclick = (e) => { if (e.target == modalPost) modalPost.style.display = "none"; };

// Submeter Novo Anúncio
formPost.onsubmit = (e) => {
    e.preventDefault();
    const newProduct = {
        id: Date.now(),
        title: document.getElementById("post-title").value,
        price: parseFloat(document.getElementById("post-price").value),
        category: document.getElementById("post-category").value,
        location: document.getElementById("post-location").value,
        condition: document.getElementById("post-condition").value,
        image: document.getElementById("post-image").value,
        phone: document.getElementById("post-phone").value.replace(/\D/g, ''),
        date: "Hoje"
    };

    products.unshift(newProduct);
    renderProducts(products);
    modalPost.style.display = "none";
    formPost.reset();
    alert("Anúncio publicado com sucesso!");
};

// Inicialização
renderProducts(products);
