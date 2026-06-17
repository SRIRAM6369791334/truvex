/* ── Confirm dialogs ── */
document.querySelectorAll('[data-confirm]').forEach((element) => {
  element.addEventListener('click', (event) => {
    const message = element.getAttribute('data-confirm') || 'Are you sure?';
    if (!window.confirm(message)) {
      event.preventDefault();
    }
  });
});

/* ── Table search ── */
document.querySelectorAll('.table-search').forEach((input) => {
  const table = input.closest('.panel')?.querySelector('table[data-searchable]');
  if (!table) return;

  input.addEventListener('input', () => {
    const needle = input.value.trim().toLowerCase();
    table.querySelectorAll('tbody tr').forEach((row) => {
      let text = '';
      if (typeof row.querySelectorAll === 'function') {
        const cells = Array.from(row.querySelectorAll('td'));
        if (cells.length > 1) {
          text = cells.slice(0, -1).map(td => td.textContent).join(' ');
        } else {
          text = row.textContent;
        }
      } else {
        text = row.textContent || '';
      }
      const cleanText = text.replace(/\s*(open|edit|manage)\s*$/i, '');
      row.hidden = needle.length > 0 && !cleanText.toLowerCase().includes(needle);
    });
  });
});

/* ── Auto-dismiss flash messages (Design Spell: Fade-out) ── */
document.querySelectorAll('.flash').forEach((flash) => {
  setTimeout(() => {
    flash.style.transition = 'opacity 0.5s ease, transform 0.5s ease, max-height 0.4s ease, padding 0.4s ease';
    flash.style.opacity = '0';
    flash.style.transform = 'translateY(-6px)';
    flash.style.maxHeight = '0';
    flash.style.padding = '0';
    flash.style.overflow = 'hidden';
    setTimeout(() => flash.remove(), 500);
  }, 4000);
});

/* ── Button loading state on form submit (Design Spell) ── */
document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"]');
    if (btn && !btn.disabled) {
      btn.dataset.originalText = btn.textContent;
      btn.textContent = 'Saving…';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      btn.style.cursor = 'not-allowed';
    }
  });
});

/* ── Smooth active link highlight ── */
const currentPath = window.location.pathname;
document.querySelectorAll('.nav a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href && href !== '/' && currentPath.startsWith(href)) {
    link.classList.add('active');
  } else if (href === '/' && currentPath === '/') {
    link.classList.add('active');
  }
});

