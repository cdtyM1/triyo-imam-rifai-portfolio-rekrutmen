/* Render Works + Modal */
(function () {
  'use strict';

  const $ = (sel, root = document) => (root || document).querySelector(sel);
  const $$ = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const worksGrid = $('#worksGrid');
  const modal = $('#workModal');
  const closeBtns = $$('[data-close-modal]', modal);

  const modalCategory = $('#modalCategory');
  const modalTitle = $('#modalTitle');
  const modalImg = $('#modalImg');
  const modalDesc = $('#modalDesc');
  const modalTools = $('#modalTools');
  const modalHighlights = $('#modalHighlights');
  const modalCta = $('#modalCta');

  let lastActiveEl = null;

  const focusableSelector = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';

  const getFocusable = () => $$(focusableSelector, modal).filter((el) => !el.hasAttribute('disabled'));

  let trapFocusListener = null;

  const setModalOpen = (open) => {
    const isOpen = open === true;

    modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
      lastActiveEl = document.activeElement;

      const focusables = getFocusable();
      const initial = focusables[0];
      if (initial && typeof initial.focus === 'function') {
        requestAnimationFrame(() => initial.focus());
      } else {
        // Fallback: fokus tombol/elemen close bila ada
        const closeBtn = closeBtns.find((el) => el && typeof el.focus === 'function');
        if (closeBtn) requestAnimationFrame(() => closeBtn.focus());
      }

      if (!trapFocusListener) {
        trapFocusListener = (e) => {
          if (e.key !== 'Tab') return;

          const focusables = getFocusable();
          if (!focusables.length) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const active = document.activeElement;

          if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
          }
        };
      }

      modal.addEventListener('keydown', trapFocusListener);
    } else {
      modal.removeEventListener('keydown', trapFocusListener);

      if (lastActiveEl && typeof lastActiveEl.focus === 'function') {
        lastActiveEl.focus();
      }
    }
  };

  document.addEventListener('keydown', (e) => {
    if (!modal) return;
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      setModalOpen(false);
    }
  });

  const renderWorks = (works) => {
    if (!worksGrid) return;
    worksGrid.innerHTML = '';

    works.forEach((w) => {
      const card = document.createElement('div');
      card.className = 'work-card';
      card.setAttribute('role', 'listitem');

      const cat = document.createElement('div');
      cat.className = 'work-card__meta';

      const catSpan = document.createElement('span');
      catSpan.className = 'work-card__cat';
      catSpan.textContent = w.category;
      cat.appendChild(catSpan);

      const thumb = document.createElement('div');
      thumb.className = 'work-card__thumb';

      const img = document.createElement('img');
      img.src = w.image;
      img.alt = `Thumbnail ${w.title}`;
      thumb.appendChild(img);

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
  };

  if (modal) {
    closeBtns.forEach((b) => b.addEventListener('click', () => setModalOpen(false)));
  }


  renderWorks(window.WORKS || []);
})();
