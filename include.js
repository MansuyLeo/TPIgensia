const fallbackNav = `
<ul>
  <li><a href="index.html">Accueil</a></li>
  <li><a href="cv.html">CV</a></li>
  <li><a href="portfolio.html">Portfolio</a></li>
  <li><a href="price.html">Prix</a></li>
  <li><a href="contact.html">Contact</a></li>
  <li><a href="bootstrap.html">Bootstrap</a></li>
</ul>
`;

const fallbackFooter = `<p>© 2026 Mansuy Léo</p>`;

function applyNavFooter(navHtml, footerHtml) {
  const navContainer = document.getElementById('site-nav');
  const footerContainer = document.getElementById('site-footer');

  if (navContainer) navContainer.innerHTML = navHtml;
  if (footerContainer) footerContainer.innerHTML = footerHtml;

  const current = window.location.pathname.split('/').pop() || 'index.html';
  const activeLink = navContainer?.querySelector(`a[href="${current}"]`);
  if (activeLink) activeLink.classList.add('active');
}

async function loadPartials() {
  if (window.location.protocol === 'file:') {
    console.warn('Navigation et footer chargés en mode file:// (fallback).');
    applyNavFooter(fallbackNav, fallbackFooter);
    return;
  }

  try {
    const [navRes, footerRes] = await Promise.all([
      fetch('nav.html'),
      fetch('footer.html')
    ]);

    if (!navRes.ok || !footerRes.ok) {
      throw new Error('Impossible de charger le menu ou le footer');
    }

    const [navHtml, footerHtml] = await Promise.all([navRes.text(), footerRes.text()]);
    applyNavFooter(navHtml, footerHtml);
  } catch (error) {
    console.error('Erreur include.js:', error);
    applyNavFooter(fallbackNav, fallbackFooter);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPartials);
} else {
  loadPartials();
}
