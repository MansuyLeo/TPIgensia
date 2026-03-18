(async function() {
  // Empêche l'utilisation de Fetch en mode file:// (ne fonctionne qu'avec un serveur HTTP)
  if (window.location.protocol === 'file:') {
    console.error('Mode file:// : fetch ne fonctionne pas. Lance un serveur local (python -m http.server).');
    return;
  }

  // Récupère rapidement un élément par son id
  const getEl = id => document.getElementById(id);

  // Injecte le HTML à l'intérieur d'un conteneur sans remplacer des nœuds parents
  const setHtml = (id, html) => getEl(id)?.insertAdjacentHTML('afterbegin', html);

  try {
    // Chargement parallèle simultané de nav et footer
    const [navHtml, footerHtml] = await Promise.all([
      fetch('nav.html').then(resp => resp.ok ? resp.text() : Promise.reject('nav non chargé')),
      fetch('footer.html').then(resp => resp.ok ? resp.text() : Promise.reject('footer non chargé'))
    ]);

    // Injection HTML dans les conteneurs destinés
    setHtml('site-nav', navHtml);
    setHtml('site-footer', footerHtml);

    // Détermine la page actuelle pour marquer le lien actif dans le menu
    const currentPage = new URL(window.location.href).pathname.split('/').pop() || 'index.html';
    getEl('site-nav')?.querySelector(`a[href="${currentPage}"]`)?.classList.add('active');
  } catch (err) {
    // Erreur affichée dans la console pour débogage
    console.error('include.js:', err);
  }
})();

