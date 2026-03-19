(async function() {
  
  const getEl = id => document.getElementById(id);

  const setHtml = (id, html) => getEl(id)?.insertAdjacentHTML('afterbegin', html);
  
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      updateThemeButton(true);
    }
  };

  const updateThemeButton = (isDark) => {
    const btn = getEl('theme-toggle');
    if (btn) {
      btn.textContent = isDark ? '☀️ Thème' : '🌙 Thème';
    }
  };

  
  const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark-theme');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {
      // localStorage peut échouer en mode privé - on ignore l'erreur
    }
    updateThemeButton(isDark);
  };

  // Attache l'événement au bouton de thème
  initTheme();
  const themeBtn = getEl('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Blague million d'euros (rickroll)
  const millionBlague = getEl('million-blague');
  const rickrollContainer = getEl('rickroll-container');
  if (millionBlague && rickrollContainer) {
    millionBlague.addEventListener('click', () => {
      // Masquer la blague et afficher le rickroll
      millionBlague.classList.add('hidden');
      rickrollContainer.classList.remove('hidden');
      rickrollContainer.classList.add('visible');

      // Créer la vidéo de manière sécurisée
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('width', '480');
      video.setAttribute('height', '270');
      video.classList.add('rickroll-video');

      const source = document.createElement('source');
      source.src = 'https://rickroll.it/rickroll.mp4';
      source.type = 'video/mp4';
      video.appendChild(source);

      // Créer le texte de manière sécurisée
      const textP = document.createElement('p');
      textP.classList.add('rickroll-text');
      textP.textContent = 'Jamais de million, mais toujours du style !';

      // Vider et remplir le conteneur
      rickrollContainer.innerHTML = '';
      rickrollContainer.appendChild(video);
      rickrollContainer.appendChild(textP);
    });
  }

  try {
    
    const [navHtml, footerHtml] = await Promise.all([
      fetch('nav.html').then(resp => resp.ok ? resp.text() : Promise.reject('nav non chargé')),
      fetch('footer.html').then(resp => resp.ok ? resp.text() : Promise.reject('footer non chargé'))
    ]);

    
    setHtml('site-nav', navHtml);
    setHtml('site-footer', footerHtml);

  
    const currentPage = new URL(window.location.href).pathname.split('/').pop() || 'index.html';
    getEl('site-nav')?.querySelector(`a[href="${currentPage}"]`)?.classList.add('active');
  } catch (err) {
    // Erreur capturée silencieusement
  }
})();

