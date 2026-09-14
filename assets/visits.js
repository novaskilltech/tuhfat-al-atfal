(function () {
  const key = 'tuhfat-al-atfal-visit-recorded-v1';
  const counters = document.querySelectorAll('[data-visit-count]');
  if (!counters.length) return;

  let increment = false;
  try {
    increment = !localStorage.getItem(key);
  } catch {}

  fetch(`/api/visits${increment ? '?increment=1' : ''}`, { cache: 'no-store' })
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(({ visits }) => {
      if (!Number.isFinite(visits)) return;
      if (increment) {
        try { localStorage.setItem(key, '1'); } catch {}
      }
      counters.forEach(counter => { counter.textContent = new Intl.NumberFormat(document.documentElement.lang).format(visits); });
    })
    .catch(() => counters.forEach(counter => { counter.textContent = '—'; }));
})();
