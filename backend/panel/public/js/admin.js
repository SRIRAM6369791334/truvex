/* ── Confirm dialogs with SweetAlert2 (Liquid Glass) ── */
document.querySelectorAll('[data-confirm]').forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    const message = element.getAttribute('data-confirm') || 'Are you sure?';
    
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Confirmation',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0B1F3A', // Deep Navy
        cancelButtonColor: '#dc2626',  // Danger red
        confirmButtonText: 'Yes, proceed',
        background: '#ffffff',
        backdrop: 'rgba(15, 23, 42, 0.4)', // Slate 900 backdrop
        customClass: {
          popup: 'premium-swal-popup'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const form = element.closest('form');
          if (form) {
            form.submit();
          } else if (element.tagName === 'A') {
            window.location.href = element.href;
          }
        }
      });
    } else {
      // Fallback
      if (window.confirm(message)) {
        const form = element.closest('form');
        if (form) form.submit();
        else if (element.tagName === 'A') window.location.href = element.href;
      }
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

/* ── Mobile Sidebar Toggle ── */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.querySelector('.sidebar');
if (mobileMenuBtn && sidebar) {
  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 980 && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });
}
