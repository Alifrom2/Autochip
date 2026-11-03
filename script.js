const products = [
  { 
    id: 1, 
    brand: 'bmw', 
    name: 'BMW 320d F30', 
    desc: 'Stage 1 — прирост мощности и экономия топлива', 
    specs: ['+48 л.с.', '+90 Нм', 'Diesel'], 
    price: 8900, 
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', 
    badge: 'ХИТ' 
  },
  { 
    id: 2, 
    brand: 'bmw', 
    name: 'BMW X5 G05', 
    desc: 'Stage 2 — максимальная динамика для 3.0d', 
    specs: ['+75 л.с.', '+140 Нм', 'Diesel'], 
    price: 14900, 
    img: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=600&q=80', 
    badge: 'STAGE 2' 
  },
  { 
    id: 3, 
    brand: 'audi', 
    name: 'Audi A4 B9 2.0 TFSI', 
    desc: 'Stage 1 — бензиновый тюнинг с запасом', 
    specs: ['+55 л.с.', '+80 Нм', 'Petrol'], 
    price: 9900, 
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', // Исправлена ссылка на картинку
    badge: 'STAGE 1' 
  },
  { 
    id: 4, 
    brand: 'vw', 
    name: 'VW Golf GTI MK7', 
    desc: 'Stage 1 — классика тюнинга', 
    specs: ['+60 л.с.', '+90 Нм', 'Petrol'], 
    price: 8500, 
    img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80', 
    badge: 'ХИТ' 
  },
  { 
    id: 5, 
    brand: 'mercedes', 
    name: 'Mercedes C200 W205', 
    desc: 'Stage 1 — комфортный прирост мощности', 
    specs: ['+45 л.с.', '+70 Нм', 'Petrol'], 
    price: 9500, 
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', 
    badge: '' 
  },
  { 
    id: 6, 
    brand: 'toyota', 
    name: 'Toyota Camry V70', 
    desc: 'Stage 1 — динамика для бизнес-седана', 
    specs: ['+35 л.с.', '+50 Нм', 'Petrol'], 
    price: 7900, 
    img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', 
    badge: '' 
  }
];

// ================= РЕНДЕР КАТАЛОГА =================
const catalogGrid = document.getElementById('catalogGrid');
const filters = document.getElementById('filters');

function renderProducts(filter = 'all') {
  if (!catalogGrid) return;
  
  catalogGrid.innerHTML = '';
  
  const filtered = filter === 'all' 
    ? products 
    : products.filter(p => p.brand === filter);

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="product__img" style="background-image: url('${p.img}')">
        ${p.badge ? `<span class="product__badge">${p.badge}</span>` : ''}
      </div>
      <div class="product__body">
        <div class="product__brand">${p.brand}</div>
        <h3 class="product__title">${p.name}</h3>
        <p class="product__desc">${p.desc}</p>
        <div class="product__specs">
          ${p.specs.map(s => `<span>${s}</span>`).join('')}
        </div>
        <div class="product__bottom">
          <div class="product__price"><small>от</small> ${p.price.toLocaleString('ru-RU')} ₽</div>
          <button class="product__buy" data-modal="callback">Купить</button>
        </div>
      </div>
    `;
    catalogGrid.appendChild(card);
  });
}

// Инициализация каталога
renderProducts();

// ================= ФИЛЬТРАЦИЯ =================
if (filters) {
  filters.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter')) {
      document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts(e.target.dataset.filter);
    }
  });
}

// ================= БУРГЕР-МЕНЮ =================
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') nav.classList.remove('open');
  });
}

// ================= FAQ (АККОРДЕОН) =================
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('active');
  });
});

// ================= МОДАЛЬНОЕ ОКНО =================
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-modal]');
  if (trigger && modal) {
    modal.classList.add('open');
  }
});

if (modalClose && modal) {
  modalClose.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

// ================= ОБРАБОТКА ФОРМ =================
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    orderForm.reset();
  });
}

const callbackForm = document.getElementById('callbackForm');
if (callbackForm) {
  callbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Мы вам перезвоним.');
    callbackForm.reset();
    if (modal) modal.classList.remove('open');
  });
}