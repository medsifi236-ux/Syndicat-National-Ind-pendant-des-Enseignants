﻿const SITE_LANGUAGE = (typeof window !== 'undefined' && /\/fr(?:\/|$)/.test(window.location.pathname || '')) ? 'fr' : 'ar';
const STORAGE_KEY = `snide-${SITE_LANGUAGE}-state-v2`;

const basePagesAr = {
  home: {
    title: 'البوابة الرقمية',
    intro: 'النقابة الوطنية المستقلة، منصة للدفاع عن الحقوق والتمثيل والمواطنة المهنية.',
    image: '/images/1791560822981.jpg',
    body: ''
  },
  about: {
    title: 'من نحن',
    intro: 'نقابة مستقلة تخدم حقوق وحماية المهنيين في قطاع التعليم.',
    image: '/images/1791560866769.jpg',
    body: 'تعزز النقابة المشاركة والشفافية والدفاع عن الحقوق المهنية عبر الحوار مع المؤسسات والجهات المعنية في القطاع.\n\nتركز النقابة على الديمقراطية والعدالة الاجتماعية وتعزيز جودة التعليم.'
  },
  activities: {
    title: 'الأنشطة',
    intro: 'مبادرات تدريبية ودعوية وتوعوية لدعم الظروف المهنية والاجتماعية.',
    image: '/images/1791560857798.jpg',
    body: 'تشمل الأنشطة التدريب المهني، المؤتمرات، اللقاءات التوعوية، ومتابعة الملفات المؤسسية.\n\nتسعى النقابة إلى حماية وتمثيل ومواكبة المتغيرات في قطاع التعليم.',
    highlights: [
      { title: 'التدريب المهني', description: 'ورش عمل وبرامج لتعزيز المهارات التربوية والمهنية.' },
      { title: 'المؤتمرات النقابية', description: 'لقاءات ومناقشات حول قضايا التعليم وحقوق العاملين.' },
      { title: 'التنسيق المؤسستي', description: 'حوارات منتظمة مع الجهات المعنية والهيئات الرسمية.' }
    ]
  },
  news: {
    title: 'الأخبار',
    intro: 'آخر الأخبار والتحديثات حول قضايا النقابة والقطاع المهني.',
    image: '/images/1791560906515.jpg',
    body: 'تتابع النقابة الملفات المؤسسية والاجتماعية عبر منشوراتها، بلاغاتها ونقاطها الإعلامية.\n\nتهدف إلى تقديم محتوى موثوق وشفاف ومفيد لكل المهتمين.'
  },
  contact: {
    title: 'تواصل',
    intro: 'نرحب بطلبات التعاون والمعلومات والمشاركة.',
    image: '/images/1791560839218.jpg',
    body: 'العنوان: المقر الرسمي للنقابة\nالهاتف: +966 000 000 000\nالبريد الإلكتروني: contact@syndicat-enseignants.org\n\nنرحب بأي طلب معلومات أو تعاون.'
  }
};

const basePagesFr = {
  home: {
    title: 'Portail numérique',
    intro: 'Syndicat national indépendant, plateforme de défense des droits, de la représentation et de la citoyenneté professionnelle.',
    image: '/images/1791560822981.jpg',
    body: ''
  },
  about: {
    title: 'À propos',
    intro: 'Un syndicat indépendant au service des droits et de la protection des professionnels de l’éducation.',
    image: '/images/1791560866769.jpg',
    body: 'Le syndicat encourage la participation, la transparence et la défense des droits professionnels à travers le dialogue avec les institutions et les acteurs du secteur.\n\nIl promeut la démocratie, l’équité, la justice sociale et le renforcement de la qualité de l’éducation.'
  },
  activities: {
    title: 'Activités',
    intro: 'Des initiatives de formation, de plaidoyer et de sensibilisation pour renforcer les conditions professionnelles et sociales.',
    image: '/images/1791560857798.jpg',
    body: 'Les activités comprennent la formation professionnelle, les conférences, les rencontres de sensibilisation et le suivi des dossiers institutionnels.\n\nLe syndicat poursuit une mission de protection, de représentation et de mobilisation citoyenne dans le secteur de l’éducation.',
    highlights: [
      { title: 'Formation professionnelle', description: 'Ateliers et programmes de renforcement des compétences pédagogiques et professionnelles.' },
      { title: 'Conférences syndicales', description: 'Rencontres, débats et outils d’information sur les questions de l’éducation et des droits.' },
      { title: 'Coordination institutionnelle', description: 'Un dialogue régulier avec les institutions et les acteurs publics concernés.' }
    ]
  },
  news: {
    title: 'Actualités',
    intro: 'Les dernières informations et mises à jour sur les dossiers syndicaux et professionnels du secteur.',
    image: '/images/1791560906515.jpg',
    body: 'Le syndicat suit les dossiers institutionnels et socioprofessionnels à travers ses publications, ses communiqués et ses points d’information.\n\nL’objectif est de fournir un contenu fiable, transparent et utile à l’ensemble des acteurs concernés.'
  },
  contact: {
    title: 'Contact',
    intro: 'Nous sommes à votre disposition pour les demandes de collaboration, d’information et de participation.',
    image: '/images/1791560839218.jpg',
    body: 'Adresse : Siège officiel du syndicat\nTéléphone : +966 000 000 000\nE-mail : contact@syndicat-enseignants.org\n\nNous restons ouverts à toute demande d’information et de dialogue.'
  }
};

const defaultState = {
  currentLanguage: 'ar',
  ar: {
    theme: {
      topbar: '#1d3a2f',
      accent: '#d4a71f',
      accentDark: '#1d7a52',
      bg: '#f7f4ef',
      text: '#2a2a2a'
    },
    heroImage: '/images/1791560822981.jpg',
    logoImage: '/images/logo.png',
    cards: [
      { label: 'الديمقراطية', image: '/images/1791560826477.jpg' },
      { label: 'العدالة', image: '/images/1791560829900.jpg' },
      { label: 'المساواة', image: '/images/1791560832990.jpg' },
      { label: 'الحماية الاجتماعية', image: '/images/1791560836281.jpg' }
    ],
    pages: basePagesAr,
    articles: [],
    editors: []
  },
  fr: {
    theme: {
      topbar: '#1d3a2f',
      accent: '#d4a71f',
      accentDark: '#1d7a52',
      bg: '#f7f4ef',
      text: '#2a2a2a'
    },
    heroImage: '/images/1791560822981.jpg',
    logoImage: '/images/logo.png',
    cards: [
      { label: 'Démocratie', image: '/images/1791560826477.jpg' },
      { label: 'Justice', image: '/images/1791560829900.jpg' },
      { label: 'Égalité', image: '/images/1791560832990.jpg' },
      { label: 'Protection sociale', image: '/images/1791560836281.jpg' }
    ],
    pages: basePagesFr,
    articles: [],
    editors: []
  }
};

const state = loadState();

function getValidLanguage(value) {
  return value === 'fr' ? 'fr' : 'ar';
}

function getStorageKeyForLanguage(lang) {
  const validLang = getValidLanguage(lang);
  return `snide-${validLang}-state-v2`;
}

function loadState() {
  try {
    const merged = structuredClone(defaultState);
    const savedAr = JSON.parse(localStorage.getItem(getStorageKeyForLanguage('ar')) || 'null');
    const savedFr = JSON.parse(localStorage.getItem(getStorageKeyForLanguage('fr')) || 'null');
    merged.currentLanguage = getValidLanguage(SITE_LANGUAGE);

    if (!savedAr && !savedFr) return merged;

    ['ar', 'fr'].forEach((lang) => {
      const saved = lang === 'fr' ? (savedFr || {}) : (savedAr || {});
      const source = saved || {};
      merged[lang] = {
        ...defaultState[lang],
        ...source,
        theme: {
          ...defaultState[lang].theme,
          ...(source.theme || {})
        },
        cards: Array.isArray(source.cards) && source.cards.length ? source.cards : defaultState[lang].cards,
        pages: {
          ...defaultState[lang].pages,
          ...(source.pages || {})
        },
        articles: Array.isArray(source.articles) ? source.articles : defaultState[lang].articles,
        editors: Array.isArray(source.editors) ? source.editors : defaultState[lang].editors,
        heroImage: source.heroImage || defaultState[lang].heroImage,
        logoImage: source.logoImage || defaultState[lang].logoImage
      };
    });

    return merged;
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function saveState() {
  const nextKey = getStorageKeyForLanguage(currentLanguage());
  localStorage.setItem(nextKey, JSON.stringify(state));
}

function currentLanguage() {
  return getValidLanguage(state.currentLanguage);
}

function currentLangState() {
  return state[currentLanguage()] || state.ar;
}

function currentPageKey() {
  const page = document.body.dataset.page || 'home';
  return Object.prototype.hasOwnProperty.call(defaultState.ar.pages, page) ? page : 'home';
}

function getLanguageRootPath(language) {
  const lang = getValidLanguage(language);
  return lang === 'fr' ? 'fr/' : '';
}

function getPageData(lang = currentLanguage(), pageKey = currentPageKey()) {
  return (state[lang]?.pages?.[pageKey]) || defaultState[lang].pages[pageKey] || defaultState.ar.pages[pageKey];
}

function setLanguage(lang) {
  state.currentLanguage = getValidLanguage(lang);
  saveState();
  applyTheme();
  renderPageContent();
  renderArticles();
  renderEditors();
  setThemeFormValues();
  setPageFormValues();
  updateLanguageToggleUi();
}

function updateLanguageToggleUi() {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;
  const activeLang = currentLanguage();
  toggle.setAttribute('aria-label', activeLang === 'ar' ? 'التبديل إلى الفرنسية' : 'Retourner à l’arabe');
  toggle.dataset.lang = activeLang;
  toggle.classList.toggle('is-fr', activeLang === 'fr');
  toggle.classList.toggle('is-ar', activeLang === 'ar');
  toggle.textContent = activeLang === 'ar' ? 'AR / FR' : 'FR / AR';
}

function getLanguageTargetPath() {
  const currentPath = window.location.pathname || '';
  const inFrFolder = currentPath.includes('/fr/') || currentPath.endsWith('/fr');
  const page = currentPageKey();
  const pageFile = page === 'home' ? 'index.html' : `${page}.html`;
  return inFrFolder ? `../${pageFile}` : `fr/${pageFile}`;
}

function bindLanguageToggle() {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const nextTarget = getLanguageTargetPath();
    window.location.href = nextTarget;
  });
  updateLanguageToggleUi();

  const languagePill = document.querySelector('.lang-pill');
  if (languagePill) {
    languagePill.addEventListener('click', () => {
      window.location.href = getLanguageTargetPath();
    });
  }
}

function applyTheme() {
  const theme = currentLangState().theme;
  const root = document.documentElement;
  root.style.setProperty('--bg-topbar', theme.topbar);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-dark', theme.accentDark);
  root.style.setProperty('--bg-body', theme.bg);
  root.style.setProperty('--text-dark', theme.text);

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundImage = `linear-gradient(90deg, rgba(22, 66, 52, 0.62), rgba(212, 167, 31, 0.45)), url('${currentLangState().heroImage || defaultState.ar.heroImage}')`;
  }

  const brandLogo = document.querySelector('.brand-logo');
  if (brandLogo) {
    brandLogo.src = currentLangState().logoImage || defaultState.ar.logoImage;
  }

  const cards = document.querySelectorAll('.theme-card');
  cards.forEach((card, index) => {
    const item = currentLangState().cards[index];
    if (item && item.image) {
      card.querySelector('.card-visual')?.style.setProperty('background-image', `url('${item.image}')`);
      const label = card.querySelector('span');
      if (label) label.textContent = item.label || label.textContent;
    }
  });
}

function renderArticles() {
  const list = document.getElementById('articles-list');
  if (!list) return;

  const articles = currentLangState().articles;
  if (!articles.length) {
    list.innerHTML = currentLanguage() === 'ar' ? '<div class="empty-state">لا توجد مقالات حالياً.</div>' : '<div class="empty-state">Aucun article pour le moment.</div>';
    return;
  }

  list.innerHTML = articles.map(article => `
    <article class="article-card">
      <img src="${article.image}" alt="${article.title}" />
      <div class="article-content">
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <span>${article.content}</span>
      </div>
    </article>
  `).join('');
}

function renderEditors() {
  const list = document.getElementById('editors-list');
  if (!list) return;

  const editors = currentLangState().editors;
  if (!editors.length) {
    list.innerHTML = currentLanguage() === 'ar' ? '<div class="empty-state">لا يوجد محررون مسجلون.</div>' : '<div class="empty-state">Aucun rédacteur enregistré.</div>';
    return;
  }

  list.innerHTML = editors.map(editor => `
    <div class="editor-card">
      <h4>${editor.name}</h4>
      <p>${editor.role}</p>
      <small>${editor.email}</small>
    </div>
  `).join('');
}

function renderPageContent() {
  const pageRoot = document.querySelector('[data-page-content]');
  if (!pageRoot) return;

  const lang = currentLanguage();
  const pageKey = currentPageKey();
  const pageData = getPageData(lang, pageKey);
  const paragraphs = (pageData.body || '').split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const contentMarkup = paragraphs.map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`).join('');
  const extraCards = Array.isArray(pageData.highlights) && pageData.highlights.length
    ? pageData.highlights.map((item) => `
        <div class="page-highlight-card">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `).join('')
    : '';

  const editorMarkup = pageKey === 'about' && currentLangState().editors.length
    ? `
      <div class="subpage-grid compact-grid">
        ${currentLangState().editors.map((editor) => `
          <article class="editor-card">
            <h4>${editor.name}</h4>
            <p>${editor.role}</p>
            <small>${editor.email}</small>
          </article>
        `).join('')}
      </div>
    `
    : pageKey === 'about'
      ? (lang === 'ar' ? '<div class="empty-state">لا يوجد محررون مسجلون.</div>' : '<div class="empty-state">Aucun rédacteur enregistré pour le moment.</div>')
      : '';

  const articleMarkup = pageKey === 'news'
    ? `
      <div class="subpage-grid">
        ${(currentLangState().articles.length ? currentLangState().articles : [{ title: lang === 'ar' ? 'لا توجد مقالات حالياً' : 'Aucun article pour le moment', summary: lang === 'ar' ? 'ستظهر المقالات بعد إضافتها من إدارة الموقع.' : 'Les articles apparaîtront ici après leur ajout depuis la gestion du site.', image: pageData.image }]).map((article) => `
          <article class="article-card">
            <img src="${article.image || pageData.image}" alt="${article.title}" />
            <div class="article-content">
              <h3>${article.title}</h3>
              <p>${article.summary || (lang === 'ar' ? 'سيتم إضافة المحتوى قريباً.' : 'Le contenu de cet article sera ajouté prochainement.')}</p>
              <span>${article.content || (lang === 'ar' ? 'سيتم تحديث هذه المنطقة من لوحة الإدارة.' : 'Cette section sera mise à jour depuis le panneau d’administration.')}</span>
            </div>
          </article>
        `).join('')}
      </div>
    `
    : '';

  const contactMarkup = pageKey === 'contact'
    ? `
      <div class="contact-box">
        <div class="contact-item"><strong>${lang === 'ar' ? 'العنوان' : 'Adresse'} :</strong> <span>${lang === 'ar' ? 'المقر الرسمي للنقابة' : 'Siège officiel du syndicat'}</span></div>
        <div class="contact-item"><strong>${lang === 'ar' ? 'الهاتف' : 'Téléphone'} :</strong> <span>+966 000 000 000</span></div>
        <div class="contact-item"><strong>${lang === 'ar' ? 'البريد الإلكتروني' : 'E-mail'} :</strong> <span>contact@syndicat-enseignants.org</span></div>
      </div>
    `
    : '';

  pageRoot.innerHTML = `
    <section class="subpage-hero" style="background-image: linear-gradient(90deg, rgba(16, 40, 30, 0.76), rgba(214, 164, 38, 0.42)), url('${pageData.image || defaultState.ar.pages.about.image}');">
      <div class="subpage-hero-inner">
        <span class="subpage-kicker">${lang === 'ar' ? 'البوابة الرقمية' : 'Portail numérique'}</span>
        <h1>${pageData.title}</h1>
        <p>${pageData.intro}</p>
      </div>
    </section>

    <section class="subpage-body">
      <div class="page-content-card">
        ${contentMarkup || (lang === 'ar' ? '<p>سيتم إضافة محتوى هذه الصفحة من إدارة الموقع.</p>' : '<p>Le contenu de cette page sera ajouté depuis la gestion du site.</p>')}
      </div>

      ${extraCards ? `<div class="highlight-grid">${extraCards}</div>` : ''}
      ${editorMarkup}
      ${articleMarkup}
      ${contactMarkup}
    </section>
  `;
}

function renderHomePageContent() {
  if (currentPageKey() !== 'home') return;
  const page = getPageData(currentLanguage(), 'home');
  const title = document.querySelector('#about-title');
  const intro = document.querySelector('.section-summary');
  const tagline = document.querySelector('.tagline');
  if (title) title.textContent = page.title || '';
  if (intro) intro.textContent = page.intro || '';
  if (tagline) tagline.textContent = page.body || '';
}

function getAdminCopy() {
  return currentLanguage() === 'ar'
    ? {
        title: 'دخول إدارة الموقع',
        description: 'أدخل كلمة مرور الإدارة للمتابعة.',
        password: 'كلمة المرور',
        submit: 'دخول',
        cancel: 'إلغاء',
        logout: 'تسجيل الخروج',
        invalid: 'تعذر تسجيل الدخول. تحقق من كلمة المرور ثم أعد المحاولة.',
        network: 'تعذر الاتصال بالخادم. تحقق من تشغيل الموقع ثم حاول مجدداً.',
        server: 'تعذر التحقق من الدخول. أعد تشغيل الخادم من start-web-server.bat.'
      }
    : {
        title: 'Connexion à l’administration',
        description: 'Saisissez le mot de passe d’administration pour continuer.',
        password: 'Mot de passe',
        submit: 'Se connecter',
        cancel: 'Annuler',
        logout: 'Déconnexion',
        invalid: 'Connexion impossible. Vérifiez le mot de passe puis réessayez.',
        network: 'Impossible de joindre le serveur. Vérifiez qu’il est démarré puis réessayez.',
        server: 'Vérification impossible. Redémarrez le serveur avec start-web-server.bat.'
      };
}

function showAdminLogin(errorMessage = '') {
  const existing = document.getElementById('admin-auth-modal');
  if (existing) existing.remove();

  const copy = getAdminCopy();
  const modal = document.createElement('div');
  modal.id = 'admin-auth-modal';
  modal.className = 'admin-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'admin-auth-title');
  modal.innerHTML = `
    <form class="admin-auth-panel" id="admin-auth-form">
      <h2 id="admin-auth-title">${copy.title}</h2>
      <p>${copy.description}</p>
      <label for="admin-auth-password">${copy.password}</label>
      <input id="admin-auth-password" name="password" type="password" autocomplete="current-password" required />
      <p class="admin-auth-error" id="admin-auth-error" role="alert">${errorMessage}</p>
      <div class="admin-auth-actions">
        <button class="primary-btn" type="submit">${copy.submit}</button>
        <button class="close-btn" type="button" id="admin-auth-cancel">${copy.cancel}</button>
      </div>
    </form>
  `;
  document.body.append(modal);

  const form = modal.querySelector('#admin-auth-form');
  const passwordInput = modal.querySelector('#admin-auth-password');
  passwordInput.focus();
  modal.querySelector('#admin-auth-cancel').addEventListener('click', () => {
    modal.remove();
    document.getElementById('admin-open-btn')?.focus();
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('[type="submit"]');
    const error = modal.querySelector('#admin-auth-error');
    submitButton.disabled = true;
    error.textContent = '';

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password: passwordInput.value })
      });
      if (!response.ok) {
        const result = await response.json();
        error.textContent = result.error || copy.invalid;
        return;
      }

      modal.remove();
      await openAdminPanel();
    } catch (requestError) {
      console.error('Admin login failed:', requestError);
      error.textContent = copy.network;
    } finally {
      if (submitButton.isConnected) submitButton.disabled = false;
    }
  });
}

async function openAdminPanel() {
  let response;
  try {
    response = await fetch('/api/admin/session', { credentials: 'same-origin' });
  } catch (error) {
    console.error('Admin session check failed:', error);
    showAdminLogin(getAdminCopy().network);
    return;
  }

  if (!response.ok) {
    showAdminLogin(getAdminCopy().server);
    return;
  }

  const session = await response.json();
  if (!session.authenticated) {
    showAdminLogin();
    return;
  }

  const modal = document.getElementById('admin-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  setPageFormValues();
  setThemeFormValues();
}

function closeAdminPanel() {
  const modal = document.getElementById('admin-modal');
  if (!modal) return;
  if (modal.contains(document.activeElement)) {
    document.getElementById('admin-open-btn')?.focus();
  }
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

async function ensureAdminSession() {
  try {
    const response = await fetch('/api/admin/session', { credentials: 'same-origin' });
    if (!response.ok) {
      showAdminLogin(getAdminCopy().server);
      return false;
    }

    const session = await response.json();
    if (session.authenticated) return true;
    showAdminLogin();
    return false;
  } catch (error) {
    console.error('Admin permission check failed:', error);
    showAdminLogin(getAdminCopy().network);
    return false;
  }
}

async function logoutAdmin() {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'same-origin'
    });
    if (!response.ok) throw new Error(`Logout failed with status ${response.status}`);
    closeAdminPanel();
  } catch (error) {
    console.error('Admin logout failed:', error);
    showAdminLogin(getAdminCopy().network);
  }
}

function bindTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const panels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;
      tabButtons.forEach((item) => item.classList.toggle('active', item === button));
      panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === tab));
    });
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.size) return resolve('');
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Échec de lecture du fichier'));
    reader.readAsDataURL(file);
  });
}

async function handleThemeSubmit(event) {
  const form = event.currentTarget;
  event.preventDefault();
  if (!await ensureAdminSession()) return;
  const formData = new FormData(form);
  const langState = currentLangState();
  langState.theme = {
    ...langState.theme,
    accent: formData.get('accent') || langState.theme.accent,
    accentDark: formData.get('accentDark') || langState.theme.accentDark,
    bg: formData.get('bg') || langState.theme.bg,
    text: formData.get('text') || langState.theme.text,
    topbar: formData.get('topbar') || langState.theme.topbar
  };
  saveState();
  applyTheme();
  closeAdminPanel();
}

async function handleMediaSubmit(event) {
  const form = event.currentTarget;
  event.preventDefault();
  if (!await ensureAdminSession()) return;
  const formData = new FormData(form);
  const langState = currentLangState();

  const heroFile = formData.get('heroImage');
  const logoFile = formData.get('logoImage');
  const cardOneFile = formData.get('cardOneImage');
  const cardTwoFile = formData.get('cardTwoImage');

  if (heroFile && heroFile.size) langState.heroImage = await readFileAsDataUrl(heroFile);
  if (logoFile && logoFile.size) langState.logoImage = await readFileAsDataUrl(logoFile);
  if (cardOneFile && cardOneFile.size) langState.cards[0].image = await readFileAsDataUrl(cardOneFile);
  if (cardTwoFile && cardTwoFile.size) langState.cards[1].image = await readFileAsDataUrl(cardTwoFile);

  saveState();
  applyTheme();
  renderPageContent();
  closeAdminPanel();
}

async function handleArticleSubmit(event) {
  const form = event.currentTarget;
  event.preventDefault();
  if (!await ensureAdminSession()) return;
  const formData = new FormData(form);
  const article = {
    id: Date.now(),
    title: String(formData.get('title') || '').trim(),
    summary: String(formData.get('summary') || '').trim(),
    content: String(formData.get('content') || '').trim(),
    image: await readFileAsDataUrl(formData.get('articleImage')) || getPageData(currentLanguage(), 'news').image
  };

  if (!article.title || !article.summary || !article.content) return;

  currentLangState().articles.unshift(article);
  saveState();
  renderArticles();
  renderPageContent();
  form.reset();
  closeAdminPanel();
}

async function handleEditorSubmit(event) {
  const form = event.currentTarget;
  event.preventDefault();
  if (!await ensureAdminSession()) return;
  const formData = new FormData(form);
  const editor = {
    id: Date.now(),
    name: String(formData.get('name') || '').trim(),
    role: String(formData.get('role') || '').trim(),
    email: String(formData.get('email') || '').trim()
  };

  if (!editor.name || !editor.role || !editor.email) return;

  currentLangState().editors.push(editor);
  saveState();
  renderEditors();
  renderPageContent();
  form.reset();
  closeAdminPanel();
}

async function handlePageSubmit(event) {
  const form = event.currentTarget;
  event.preventDefault();
  if (!await ensureAdminSession()) return;
  const formData = new FormData(form);
  const lang = currentLanguage();
  const key = String(formData.get('pageKey') || currentPageKey());
  const defaultPage = defaultState[lang].pages[key];
  if (!defaultPage) return;
  const imageFile = formData.get('pageImage');
  const image = imageFile && imageFile.size ? await readFileAsDataUrl(imageFile) : (state[lang].pages[key]?.image || defaultPage.image || '/images/1791560822981.jpg');

  state[lang].pages[key] = {
    ...(state[lang].pages[key] || defaultState[lang].pages[key]),
    title: String(formData.get('pageTitle') || '').trim(),
    intro: String(formData.get('pageIntro') || '').trim(),
    body: String(formData.get('pageBody') || '').trim(),
    image
  };

  const highlightsInput = formData.get('pageHighlights');
  if (typeof highlightsInput === 'string') {
    state[lang].pages[key].highlights = highlightsInput
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf('|');
        return {
          title: (separatorIndex === -1 ? line : line.slice(0, separatorIndex)).trim(),
          description: separatorIndex === -1 ? '' : line.slice(separatorIndex + 1).trim()
        };
      });
  }

  saveState();
  renderPageContent();
  renderHomePageContent();
  closeAdminPanel();
}

function setThemeFormValues() {
  const themeForm = document.getElementById('theme-form');
  if (!themeForm) return;
  const fields = themeForm.elements;
  const theme = currentLangState().theme;
  fields.accent.value = theme.accent;
  fields.accentDark.value = theme.accentDark;
  fields.bg.value = theme.bg;
  fields.text.value = theme.text;
  fields.topbar.value = theme.topbar;
}

function setPageFormValues() {
  const pageForm = document.getElementById('page-form');
  if (!pageForm) return;
  const select = pageForm.elements.pageKey;
  const titleInput = pageForm.elements.pageTitle;
  const introInput = pageForm.elements.pageIntro;
  const bodyInput = pageForm.elements.pageBody;
  const currentKey = currentPageKey();
  const selectedPage = getPageData(currentLanguage(), currentKey);
  const copy = currentLanguage() === 'ar'
    ? {
        highlights: 'محاور الصفحة (عنوان | وصف، سطر لكل محور)',
        help: 'اكتب عنوان كل محور ثم | ثم وصفه. اترك الحقل فارغاً لإزالة المحاور.',
        save: 'حفظ التعديلات'
      }
    : {
        highlights: 'Sections de la page (titre | description, une ligne par section)',
        help: 'Saisissez un titre, puis |, puis sa description. Laissez vide pour supprimer les sections.',
        save: 'Enregistrer les modifications'
      };

  let highlightsInput = pageForm.elements.pageHighlights;
  if (!highlightsInput) {
    const label = document.createElement('label');
    label.textContent = copy.highlights;
    highlightsInput = document.createElement('textarea');
    highlightsInput.name = 'pageHighlights';
    highlightsInput.rows = 5;
    highlightsInput.setAttribute('aria-describedby', 'page-highlights-help');
    label.append(highlightsInput);
    const help = document.createElement('small');
    help.id = 'page-highlights-help';
    help.className = 'field-help';
    help.textContent = copy.help;
    label.append(help);
    pageForm.insertBefore(label, pageForm.querySelector('[name="pageImage"]')?.closest('label') || pageForm.querySelector('[type="submit"]'));
  }

  const submitButton = pageForm.querySelector('[type="submit"]');
  if (submitButton) submitButton.textContent = copy.save;
  highlightsInput.closest('label').firstChild.textContent = copy.highlights;
  highlightsInput.nextElementSibling.textContent = copy.help;

  const pages = defaultState[currentLanguage()].pages;
  const keys = Object.keys(pages);
  select.innerHTML = keys.map((key) => `<option value="${key}">${pages[key].title}</option>`).join('');
  select.value = currentKey;

  if (titleInput) titleInput.value = selectedPage.title || '';
  if (introInput) introInput.value = selectedPage.intro || '';
  if (bodyInput) bodyInput.value = selectedPage.body || '';
  highlightsInput.value = (selectedPage.highlights || []).map((item) => `${item.title} | ${item.description}`).join('\n');
}

function bindEvents() {
  document.getElementById('admin-open-btn')?.addEventListener('click', openAdminPanel);
  document.getElementById('admin-close-btn')?.addEventListener('click', closeAdminPanel);
  const adminHeader = document.querySelector('.admin-header');
  if (adminHeader && !document.getElementById('admin-logout-btn')) {
    const logoutButton = document.createElement('button');
    logoutButton.type = 'button';
    logoutButton.id = 'admin-logout-btn';
    logoutButton.className = 'admin-logout-btn';
    logoutButton.textContent = getAdminCopy().logout;
    logoutButton.addEventListener('click', logoutAdmin);
    adminHeader.insertBefore(logoutButton, document.getElementById('admin-close-btn'));
  }
  document.getElementById('admin-modal')?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeAdminPanel();
  });

  document.getElementById('theme-form')?.addEventListener('submit', handleThemeSubmit);
  document.getElementById('media-form')?.addEventListener('submit', handleMediaSubmit);
  document.getElementById('article-form')?.addEventListener('submit', handleArticleSubmit);
  document.getElementById('editor-form')?.addEventListener('submit', handleEditorSubmit);
  document.getElementById('page-form')?.addEventListener('submit', handlePageSubmit);

  document.querySelector('#page-form select[name="pageKey"]')?.addEventListener('change', (event) => {
    const pageKey = event.target.value;
    const page = getPageData(currentLanguage(), pageKey);
    const form = document.getElementById('page-form');
    if (!form) return;
    form.elements.pageTitle.value = page.title || '';
    form.elements.pageIntro.value = page.intro || '';
    form.elements.pageBody.value = page.body || '';
    form.elements.pageHighlights.value = (page.highlights || []).map((item) => `${item.title} | ${item.description}`).join('\n');
  });

  bindTabs();
  bindLanguageToggle();
}

function init() {
  bindEvents();
  setThemeFormValues();
  setPageFormValues();
  applyTheme();
  renderPageContent();
  renderHomePageContent();
  renderArticles();
  renderEditors();
  updateLanguageToggleUi();
}

init();
