/**
 * script.js — La Parrilla · Menú Digital
 *
 * Responsabilidades:
 *  1. Scroll Reveal (IntersectionObserver)
 *  2. Filtro de categorías del menú
 *  3. Menú hamburguesa (móvil)
 *  4. Toggle de idioma ES ↔ EN
 *  5. Año dinámico en el footer
 *  6. Cerrar menú móvil al hacer clic en un enlace
 */
 
/* ─────────────────────────────────────────────
   UTILIDAD: ejecutar cuando el DOM esté listo
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
 
  initScrollReveal();
  initMenuFilter();
  initHamburger();
  initLanguageToggle();
  initFooterYear();
 
});
 
/* ─────────────────────────────────────────────
   1. SCROLL REVEAL — IntersectionObserver
   Agrega la clase .visible cuando el elemento
   entra en el viewport, activando la transición CSS.
───────────────────────────────────────────── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
 
  if (!revealEls.length) return;
 
  // Opciones: dispara cuando el 12% del elemento sea visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Dejar de observar una vez revelado (performance)
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
 
  revealEls.forEach((el) => observer.observe(el));
}
 
/* ─────────────────────────────────────────────
   2. FILTRO DE CATEGORÍAS DEL MENÚ
   Muestra / oculta tarjetas según data-cat.
   Anima la transición con opacity + scale vía CSS.
───────────────────────────────────────────── */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards  = document.querySelectorAll('.menu-card');
 
  if (!filterBtns.length || !menuCards.length) return;
 
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.cat;
 
      // Actualizar estado ARIA y clase activa
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
 
      // Mostrar / ocultar tarjetas
      menuCards.forEach((card) => {
        const match = selected === 'all' || card.dataset.cat === selected;
 
        if (match) {
          card.classList.remove('hidden');
          // Animar re-entrada con reveal
          card.classList.remove('visible');
          // Pequeño retraso para que la transición sea visible
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.add('visible');
            });
          });
        } else {
          card.classList.add('hidden');
          card.classList.remove('visible');
        }
      });
    });
  });
}
 
/* ─────────────────────────────────────────────
   3. MENÚ HAMBURGUESA (móvil)
   Alterna la clase .open en el nav y el botón.
───────────────────────────────────────────── */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
 
  if (!hamburger || !mobileNav) return;
 
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
 
  // Cerrar al hacer clic en cualquier enlace del nav móvil
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
 
  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    if (
      mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}
 
/* ─────────────────────────────────────────────
   4. TOGGLE DE IDIOMA ES ↔ EN
   Diccionario plano: clave → { es, en }
   Aplica a todos los elementos con data-i18n="clave".
───────────────────────────────────────────── */
 
// Diccionario de traducciones
const translations = {
  /* ── Navegación ── */
  'nav.menu':       { es: 'Menú',      en: 'Menu' },
  'nav.gallery':    { es: 'Galería',   en: 'Gallery' },
  'nav.location':   { es: 'Ubicación', en: 'Location' },
 
  /* ── Hero ── */
  'hero.eyebrow': { es: 'Auténtica Cocina Mexicana',   en: 'Authentic Mexican Cuisine' },
  'hero.title1':  { es: 'Sabores que',                 en: 'Flavors that' },
  'hero.title2':  { es: 'encenden el alma',            en: 'ignite the soul' },
  'hero.desc':    {
    es: 'Parrilladas, tacos y especialidades preparadas con fuego real y pasión genuina.',
    en: 'Grilled meats, tacos, and specialties made with real fire and genuine passion.',
  },
  'hero.cta1': { es: 'Ver Menú',      en: 'See Menu' },
  'hero.cta2': { es: 'Hacer Pedido',  en: 'Order Now' },
 
  /* ── Menú ── */
  'menu.eyebrow': { es: 'Nuestra Carta', en: 'Our Menu' },
  'menu.title':   { es: 'Menú',          en: 'Menu' },
 
  /* ── Categorías ── */
  'cat.all':           { es: 'Todo',           en: 'All' },
  'cat.snacks':        { es: 'Snacks',          en: 'Snacks' },
  'cat.tacos':         { es: 'Tacos',           en: 'Tacos' },
  'cat.parrillada':    { es: 'Parrillada',      en: 'Grill' },
  'cat.especialidades':{ es: 'Especialidades',  en: 'Specialties' },
  'cat.micheladas':    { es: 'Micheladas',      en: 'Micheladas' },
  'cat.bebidas':       { es: 'Bebidas',         en: 'Drinks' },
  'cat.postres':       { es: 'Postres',         en: 'Desserts' },
 
  /* ── Snacks ── */
  'snacks.dedos':        { es: 'Dedos de queso',       en: 'Cheese Sticks' },
  'snacks.dedos.desc':   { es: 'Empanizados y dorados, rellenos de queso fundido.', en: 'Breaded and golden, filled with melted cheese.' },
  'snacks.aros':         { es: 'Aros de cebolla',      en: 'Onion Rings' },
  'snacks.aros.desc':    { es: 'Crujientes y perfectamente sazonados.',              en: 'Crispy and perfectly seasoned.' },
  'snacks.papas':        { es: 'Papas a la francesa',  en: 'French Fries' },
  'snacks.papas.desc':   { es: 'Doradas y esponjosas por dentro.',                  en: 'Golden and fluffy on the inside.' },
  'snacks.gajo':         { es: 'Papas gajo',           en: 'Wedge Fries' },
  'snacks.gajo.desc':    { es: 'En gajos crujientes con toque de especias.',        en: 'Crispy wedges with a hint of spice.' },
  'snacks.boneless':     { es: 'Boneless',             en: 'Boneless Wings' },
  'snacks.boneless.desc':{ es: 'Trozos de pollo deshuesado bañados en salsa BBQ.',  en: 'Boneless chicken pieces drenched in BBQ sauce.' },
  'snacks.nuggets':      { es: 'Nuggets',              en: 'Chicken Nuggets' },
  'snacks.nuggets.desc': { es: 'Bocados de pollo empanizados y fritos.',            en: 'Breaded and fried chicken bites.' },
 
  /* ── Tacos ── */
  'tacos.chistorra':       { es: 'Taco de Chistorra',         en: 'Chistorra Taco' },
  'tacos.chistorra.desc':  { es: 'Embutido español a la parrilla, sabor ahumado.',  en: 'Spanish sausage on the grill, smoky flavor.' },
  'tacos.chorizo':         { es: 'Taco de Chorizo Argentino', en: 'Argentine Chorizo Taco' },
  'tacos.chorizo.desc':    { es: 'Chorizo jugoso al carbón, estilo sudamericano.',  en: 'Juicy charcoal chorizo, South American style.' },
  'tacos.arrachera':       { es: 'Taco de Arrachera',         en: 'Arrachera Taco' },
  'tacos.arrachera.desc':  { es: 'Corte premium marinado y asado al punto.',        en: 'Premium cut, marinated and grilled to perfection.' },
  'tacos.aguja':           { es: 'Taco de Aguja Norteña',     en: 'Northern Aguja Taco' },
  'tacos.aguja.desc':      { es: 'Carne norteña tierna, tradicional del norte de México.', en: 'Tender northern beef, a northern Mexican tradition.' },
  'tacos.costilla':        { es: 'Taco de Costilla',          en: 'Short Rib Taco' },
  'tacos.costilla.desc':   { es: 'Costilla de res a las brasas, jugosa y ahumada.',en: 'Beef short rib over embers, juicy and smoky.' },
  'tacos.bistec':          { es: 'Taco de Bistec',            en: 'Bistec Taco' },
  'tacos.bistec.desc':     { es: 'Bistec fino asado a la perfección.',              en: 'Fine beef steak grilled to perfection.' },
  'tacos.picana':          { es: 'Taco de Picaña',            en: 'Picanha Taco' },
  'tacos.picana.desc':     { es: 'Corte brasileño de gran sabor, asado al carbón.',en: 'Brazilian cut with great flavor, charcoal grilled.' },
 
  /* ── Parrillada ── */
  'parr.individual': { es: 'Parrillada Individual',   en: 'Solo Grill' },
  'parr.dos':        { es: 'Parrillada 2 Personas',   en: 'Grill for 2' },
  'parr.cuatro':     { es: 'Parrillada 4 Personas',   en: 'Grill for 4' },
  'parr.incluye':    {
    es: 'Incluye: aguja, bistec, chistorra, chorizo y costilla.',
    en: 'Includes: aguja, bistec, chistorra, chorizo, and short rib.',
  },
 
  /* ── Especialidades ── */
  'esp.hambur':       { es: 'Hamburguesas',           en: 'Burgers' },
  'esp.hambur.desc':  { es: '+$10 agrega papas a la francesa.', en: '+$10 add french fries.' },
  'esp.alitas':       { es: 'Alitas fritas / carbón', en: 'Fried / Grilled Wings' },
  'esp.alitas.desc':  { es: '+$10 agrega papas. Fritas o al carbón a tu elección.', en: '+$10 add fries. Fried or charcoal grilled, your choice.' },
 
  /* ── Micheladas ── */
  'mich.una':       { es: 'Michelada 1x',  en: 'Michelada ×1' },
  'mich.una.desc':  { es: 'Una michelada preparada a tu gusto.', en: 'One michelada made to your taste.' },
  'mich.tres':      { es: 'Micheladas 3x', en: 'Micheladas ×3' },
  'mich.tres.desc': { es: 'Paquete de tres micheladas. ¡La mejor opción!', en: 'Pack of three micheladas. Best value!' },
 
  /* ── Bebidas ── */
  'beb.refresco':       { es: 'Refresco 600ml',    en: 'Soda 600ml' },
  'beb.refresco.desc':  { es: 'Variedad de refrescos fríos.', en: 'Assorted cold sodas.' },
  'beb.sangria':        { es: 'Sangría preparada', en: 'Prepared Sangria' },
  'beb.sangria.desc':   { es: 'Sangría fresca con toque de limón y chamoy.', en: 'Fresh sangria with lime and chamoy.' },
 
  /* ── Postres ── */
  'post.flan':      { es: 'Flan napolitano', en: 'Neapolitan Flan' },
  'post.flan.desc': { es: 'Suave y cremoso con caramelo artesanal.', en: 'Smooth and creamy with artisan caramel.' },
  'post.pay':       { es: 'Pay de limón',   en: 'Key Lime Pie' },
  'post.pay.desc':  { es: 'Cítrico, fresco y con base de galleta crujiente.', en: 'Citrusy, fresh, with a crispy cookie crust.' },
 
  /* ── Galería ── */
  'gallery.eyebrow':    { es: 'Nuestros Platillos',    en: 'Our Dishes' },
  'gallery.title':      { es: 'Galería',               en: 'Gallery' },
  'gallery.micheladas': { es: 'Micheladas',             en: 'Micheladas' },
  'gallery.tacos':      { es: 'Tacos a la Parrilla',   en: 'Grilled Tacos' },
 
  /* ── Ubicación ── */
  'loc.eyebrow': { es: 'Encuéntranos', en: 'Find Us' },
  'loc.title':   { es: 'Ubicación',    en: 'Location' },
 
  /* ── Contacto ── */
  'contact.call': { es: 'Llamar', en: 'Call' },
 
  /* ── Footer ── */
  'footer.tagline': { es: 'Fuego, sabor y tradición mexicana.', en: 'Fire, flavor, and Mexican tradition.' },
  'footer.call':    { es: 'Llamar',                             en: 'Call us' },
  'footer.rights':  { es: 'Todos los derechos reservados.',     en: 'All rights reserved.' },
};
 
// Estado actual del idioma
let currentLang = 'es';
 
function initLanguageToggle() {
  const btn   = document.getElementById('langToggle');
  const label = document.getElementById('langLabel');
 
  if (!btn || !label) return;
 
  btn.addEventListener('click', () => {
    // Alternar idioma
    currentLang = currentLang === 'es' ? 'en' : 'es';
    label.textContent = currentLang === 'es' ? 'EN' : 'ES';
 
    // Aplicar traducciones a todos los elementos etiquetados
    applyTranslations(currentLang);
  });
}
 
/**
 * Recorre todos los elementos con data-i18n y actualiza su textContent.
 * @param {string} lang — 'es' o 'en'
 */
function applyTranslations(lang) {
  const tagged = document.querySelectorAll('[data-i18n]');
 
  tagged.forEach((el) => {
    const key  = el.dataset.i18n;
    const dict = translations[key];
 
    if (dict && dict[lang] !== undefined) {
      el.textContent = dict[lang];
    }
  });
}
 
/* ─────────────────────────────────────────────
   5. AÑO DINÁMICO EN EL FOOTER
───────────────────────────────────────────── */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
 