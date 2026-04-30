'use strict';

/* ---- DONNÉES CÉRÉALES ---- */
const cerealsData = [
  {
    title: "Maïs jaune grain",
    price: "Dès 18 000 FCFA / sac 100kg",
    location: "Bonou · Adjohoun",
    badge: "Disponible",
    img: "https://images.pexels.com/photos/547264/pexels-photo-547264.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Sacs de maïs jaune",
    whatsapp: "2290162697666",
    productName: "Maïs jaune grain"
  },
  {
    title: "Riz local étuvé Ouémé",
    price: "Dès 45 000 FCFA / sac 100kg",
    location: "Dangbo · Adjohoun",
    badge: "Populaire",
    img: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Riz local étuvé",
    whatsapp: "2290162697666",
    productName: "Riz local étuvé Ouémé"
  },
  {
    title: "Sorgho rouge",
    price: "Dès 20 000 FCFA / sac 100kg",
    location: "Akpro-Missérété",
    badge: "Stock limité",
    img: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Sorgho rouge",
    whatsapp: "2290162697666",
    productName: "Sorgho rouge"
  },
  {
    title: "Petit Mil",
    price: "Dès 25 000 FCFA / sac 100kg",
    location: "Avrankou · Adjarra",
    badge: "Disponible",
    img: "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Champ de céréales",
    whatsapp: "2290162697666",
    productName: "Petit Mil"
  },
  {
    title: "Fonio décortiqué",
    price: "Dès 80 000 FCFA / sac 100kg",
    location: "Adjarra",
    badge: "Premium",
    img: "https://images.pexels.com/photos/618491/pexels-photo-618491.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Grains de fonio",
    whatsapp: "2290162697666",
    productName: "Fonio décortiqué"
  }
];

/* ---- RENDU CARTES CÉRÉALES ---- */
function renderCerealCards() {
  const grid = document.getElementById('cerealesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  cerealsData.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'cereal-card';
    card.style.animationDelay = `${i * 0.08}s`;

    card.innerHTML = `
      <div class="card-img">
        <img src="${c.img}" alt="${c.alt}" loading="lazy" />
        <span class="card-badge">${c.badge}</span>
      </div>
      <div class="card-info">
        <h3>${c.title}</h3>
        <div class="price">${c.price}</div>
        <div class="location">
          <svg viewBox="0 0 24 24" fill="#F9A825" width="14" height="14">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          ${c.location}
        </div>
        <button class="whatsapp-btn" data-produit="${c.productName}" data-tel="${c.whatsapp}">
          <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
            <path d="M12.032 2.016c-5.514 0-9.984 4.47-9.984 9.984 0 1.758.456 3.486 1.32 4.986L2 22.008l5.022-1.32c1.5.87 3.228 1.32 4.986 1.32 5.514 0 9.984-4.47 9.984-9.984S17.546 2.016 12.032 2.016z"/>
          </svg>
          Commander sur WhatsApp
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Event listeners WhatsApp cards
  grid.querySelectorAll('.whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const produit = btn.dataset.produit;
      const tel    = btn.dataset.tel;
      const msg    = `Bonjour AgriOuémé ! Je suis intéressé(e) par votre *${produit}*. Pouvez-vous me donner plus d'informations ?`;
      window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });
}

/* ---- FORMULAIRE ---- */
function initForm() {
  const form     = document.getElementById('postHarvestForm');
  const feedback = document.getElementById('formFeedback');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    const cereal   = document.getElementById('cerealType').value;
    const quantity = document.getElementById('quantity').value;
    const price    = document.getElementById('pricePerBag').value;
    const commune  = document.getElementById('commune').value;
    const whatsapp = document.getElementById('whatsappPhone').value.trim();
    const photo    = document.getElementById('photoUrl').value.trim() || 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80';

    // Validation
    if (!cereal || !quantity || !price || !commune || !whatsapp) {
      feedback.textContent = '⚠️ Veuillez remplir tous les champs obligatoires.';
      feedback.classList.add('error');
      return;
    }
    if (!/^[0-9]{9,13}$/.test(whatsapp.replace(/\s/g, ''))) {
      feedback.textContent = '⚠️ Numéro WhatsApp invalide. Format: 229XXXXXXXXX';
      feedback.classList.add('error');
      return;
    }

    // Sauvegarde localStorage
    const annonce = {
      id: Date.now(),
      cereal, quantity: parseInt(quantity), price: parseInt(price),
      commune, whatsapp, photo,
      date: new Date().toLocaleDateString('fr-BJ', { day: '2-digit', month: 'long', year: 'numeric' })
    };
    const annonces = JSON.parse(localStorage.getItem('agriOueme_annonces') || '[]');
    annonces.unshift(annonce);
    localStorage.setItem('agriOueme_annonces', JSON.stringify(annonces));

    // Succès
    feedback.innerHTML = `✅ Annonce publiée avec succès !<br><small>Les acheteurs vous contacteront au +${whatsapp} sur WhatsApp.</small>`;
    feedback.classList.add('success');
    form.reset();

    setTimeout(() => {
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }, 6000);
  });
}

/* ---- HEADER SCROLL ---- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---- BURGER MENU MOBILE ---- */
function initBurger() {
  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');
  if (!burger || !navMenu) return;

  function openMenu() {
    navMenu.classList.add('open');
    burger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    burger.classList.remove('active');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Ferme au clic sur un lien
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Ferme si clic en dehors du menu
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== burger) {
      closeMenu();
    }
  });

  // Ferme avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
  });
}

/* ---- SCROLL CTAs ---- */
function initScrollCTAs() {
  const scrollTo = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  document.getElementById('scrollToFormBtn')?.addEventListener('click', () => scrollTo('vendre'));
  document.getElementById('heroProducteurBtn')?.addEventListener('click', () => scrollTo('vendre'));
  document.getElementById('heroAcheteurBtn')?.addEventListener('click',   () => scrollTo('marche'));
}

/* ---- INTERSECTION OBSERVER (animations au scroll) ---- */
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.cereal-card, .step-card, .prix-card, .temoignage-card, .avantage-item'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });

  // Ajoute classe visible = rend visible
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderCerealCards();
  initForm();
  initHeaderScroll();
  initBurger();
  initScrollCTAs();
  initScrollAnimations();

  console.log('%cAgriOuémé V2 🌾 chargé', 'color:#1B5E20; font-weight:bold; font-size:14px;');
});
