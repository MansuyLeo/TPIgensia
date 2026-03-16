// fonction utilitaire pour injecter le HTML et marquer la page courante
function applyNavFooter(navHtml, footerHtml) {
  const navContainer = document.getElementById('site-nav');
  const footerContainer = document.getElementById('site-footer');

  if (navContainer) navContainer.innerHTML = navHtml;
  if (footerContainer) footerContainer.innerHTML = footerHtml;

  const current = window.location.pathname.split('/').pop() || 'index.html';
  const activeLink = navContainer?.querySelector(`a[href="${current}"]`);
  if (activeLink) activeLink.classList.add('active');
}

// main : on charge les blocs en mode dynamique sans fallback
async function loadPartials() {
  if (window.location.protocol === 'file:') {
    console.error('Mode file:// détecté : fetch ne fonctionnera pas. Lance un serveur local (python -m http.server).');
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
  }
}

// Avec ou sans DOMContentLoaded, on lance loadPartials au bon moment.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPartials);
} else {
  loadPartials();
}

