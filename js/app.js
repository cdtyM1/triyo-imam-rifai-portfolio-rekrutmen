/* Render Works + Modal */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const worksGrid = $('#worksGrid');
  const modal = $('#workModal');
  const modalOverlay = $('[data-close-modal]', modal);
  const closeBtns = $$('[data-close-modal]', modal);

  const modalCategory = $('#modalCategory');
  const modalTitle = $('#modalTitle');
  const modalImg = $('#modalImg');
  const modalDesc = $('#modalDesc');
  const modalTools = $('#modalTools');
  const modalHighlights = $('#modalHighlights');
  const modalCta = $('#modalCta');

  const setModalOpen = (open) => {
    modal.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const escClose = (e) => {
    if (e.key === 'Escape') setModalOpen(false);
  };

  const renderWorks = (works) => {
    if (!worksGrid) return;
    worksGrid.innerHTML = '';

    works.forEach((w) => {
      const card = document.createElement('div');
      card.className = 'work-card';
      card.setAttribute('role', 'listitem');

      const cat = document.createElement('div');
      cat.className = 'work-card__meta';
      cat.innerHTML = `<span class="work-card__cat">${escapeHtml(w.category)}</span>`;

      const thumb = document.createElement('div');
      thumb.className = 'work-card__thumb';
      thumb.innerHTML = `<img src="${w.image}" alt="Thumbnail ${escapeAttr(w.title)}" />`;

      const title = document.createElement('h3');
      title.className = 'work-card__title';
      title.textContent = w.title;

      const desc = document.createElement('p');
      desc.className = 'work-card__desc';
      desc.textContent = w.shortDesc;

      const actions = document.createElement('div');
      actions.className = 'work-card__actions';

      const btn = document.createElement('button');
      btn.className = 'work-card__btn';
      btn.type = 'button';
      btn.textContent = 'Detail';
      btn.addEventListener('click', () => openModal(w));

      actions.appendChild(btn);

      card.appendChild(cat);
      card.appendChild(thumb);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(actions);

      worksGrid.appendChild(card);
    });
  };

  const openModal = (w) => {
    if (!modal) return;

    modalCategory.textContent = w.category;
    modalTitle.textContent = w.title;
    modalImg.src = w.image;
    modalImg.alt = `Gambar karya: ${w.title}`;
    modalDesc.textContent = w.desc;

    modalTools.innerHTML = '';
    (w.tools || []).forEach((t) => {
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.textContent = t;
      modalTools.appendChild(chip);
    });

    modalHighlights.innerHTML = '';
    (w.highlights || []).forEach((h) => {
      const li = document.createElement('li');
      li.textContent = h;
      modalHighlights.appendChild(li);
    });

    modalCta.href = '#contact';

    setModalOpen(true);
    document.addEventListener('keydown', escClose, { once: true });
  };

  if (modal) {
    closeBtns.forEach((b) => b.addEventListener('click', () => setModalOpen(false)));
  }

  const escapeHtml = (str) => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const escapeAttr = (str) => escapeHtml(str);

  renderWorks(window.WORKS || []);
})();
