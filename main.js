// Basic hero slider + cart quantity controls + mobile nav toggle

// Slider
const slides = document.querySelectorAll('.slide');
let current = 0;
function showSlide(i) {
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
}
function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}
if (slides.length) {
  showSlide(0);
  setInterval(nextSlide, 4500);
}

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.style.display === 'flex';
    links.style.display = isOpen ? 'none' : 'flex';
  });
}

// Quantity controls and cart total calc
function recalcTotal() {
  const rows = document.querySelectorAll('.cart-item');
  let total = 0;
  rows.forEach(row => {
    const price = parseFloat(row.dataset.price || '0');
    const qtyInput = row.querySelector('.qty input');
    const qty = parseInt(qtyInput.value || '1', 10);
    const line = row.querySelector('.line-total');
    const lineTotal = price * qty;
    if (line) line.textContent = `$${lineTotal.toFixed(2)}`;
    total += lineTotal;
  });
  const totalEl = document.querySelector('.cart-total');
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

document.querySelectorAll('.qty').forEach(wrap => {
  const minus = wrap.querySelector('[data-act="minus"]');
  const plus = wrap.querySelector('[data-act="plus"]');
  const input = wrap.querySelector('input');

  function clamp() {
    let v = parseInt(input.value || '1', 10);
    if (isNaN(v) || v < 1) v = 1;
    if (v > 99) v = 99;
    input.value = v;
    recalcTotal();
  }

  minus?.addEventListener('click', () => {
    input.value = Math.max(1, parseInt(input.value || '1', 10) - 1);
    clamp();
  });
  plus?.addEventListener('click', () => {
    input.value = Math.min(99, parseInt(input.value || '1', 10) + 1);
    clamp();
  });
  input?.addEventListener('input', clamp);
});

recalcTotal();

// Back to top smooth scroll
document.querySelectorAll('a[href="#top"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
