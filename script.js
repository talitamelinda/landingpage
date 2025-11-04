// ===== SLIDER KELOMPOK =====
let sliders = document.querySelectorAll('.slider');
let dotsContainer = document.querySelector('.dots-container');
let nextBtn = document.querySelector('.nav.next');
let prevBtn = document.querySelector('.nav.prev');

let currentIndex = 0;
let autoPlayInterval;

function showSlider(index) {
  sliders.forEach((slider, i) => {
    slider.classList.remove('active');
    if (dotsContainer.children[i]) {
      dotsContainer.children[i].classList.remove('active');
    }
  });
  sliders[index].classList.add('active');
  if (dotsContainer.children[index]) {
    dotsContainer.children[index].classList.add('active');
  }
}

function nextSlider() {
  currentIndex = (currentIndex + 1) % sliders.length;
  showSlider(currentIndex);
}

function prevSlider() {
  currentIndex = (currentIndex - 1 + sliders.length) % sliders.length;
  showSlider(currentIndex);
}

nextBtn.addEventListener('click', () => { nextSlider(); resetAutoPlay(); });
prevBtn.addEventListener('click', () => { prevSlider(); resetAutoPlay(); });

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlider, 4000);
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

function createDots() {
  sliders.forEach((_, i) => {
    let dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      currentIndex = i;
      showSlider(currentIndex);
      resetAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });
  showSlider(currentIndex);
}

createDots();
startAutoPlay();

// ===== SCROLL KE DESTINASI =====
function scrollToDest() {
  document.getElementById("destinasi").scrollIntoView({behavior: "smooth"});
}

// ===== MODAL =====
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function submitOrder(e) {
  e.preventDefault();
  const nama = document.getElementById("orderName").value;
  const jumlah = document.getElementById("orderQty").value;
  const jenis = document.getElementById("orderType").value;
  alert(`Pesanan atas nama ${nama} (${jumlah} tiket ${jenis}) berhasil!`);
  closeModal();
}

// ===== FORM KONTAK =====
function sendMessage(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if(name && email && message) {
    alert(`Terima kasih ${name}, pesanmu sudah terkirim!`);
    e.target.reset();
  } else {
    alert("Harap isi semua field!");
  }
}

// ===== PROMO =====
function klaimPromo(promoName) {
  alert(`🎉 Kamu telah mengklaim promo: ${promoName}! Silakan tunjukkan bukti ini saat pemesanan tiket.`);
}

// ===== ANIMASI FADE-IN CARD & PROMO =====
const faders = document.querySelectorAll('.card, .price-card, .promosi-card');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ===== FADE IN HERO TABIK PUN =====
const heroText = document.querySelector('.hero h1');
if(heroText) {
  heroText.style.opacity = 0;
  heroText.style.transform = "translateY(30px)";
  setTimeout(() => {
    heroText.style.transition = "opacity 2s ease-in-out, transform 2s ease-in-out";
    heroText.style.opacity = 1;
    heroText.style.transform = "translateY(0)";
  }, 500);
}
