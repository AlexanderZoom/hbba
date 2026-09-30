/* UI adapter for links from HBBA MCP. Scientific core unchanged. */
(() => {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('graph');
  if (!raw || raw.length > 4096) return;
  let ids;
  try { ids = JSON.parse(raw).behavior_ids; } catch (_) { return; }
  const known = new Set((window.HBBA_DATA?.behaviors || []).map(b => b.id));
  if (!Array.isArray(ids) || ids.length < 1 || ids.length > known.size ||
      ids.some(id => typeof id !== 'string' || !known.has(id))) return;
  const search = document.getElementById('searchInput');
  if (search) {
    search.value = '';
    search.dispatchEvent(new Event('input', { bubbles: true }));
  }
  document.querySelector('#categoryFilters [data-domain="all"]')?.click();
  document.getElementById('clearBtn')?.click();
  for (const id of new Set(ids)) {
    const btn = [...document.querySelectorAll('#behaviorList [data-id]')]
      .find(el => el.dataset.id === id);
    if (btn) btn.click();
  }
  document.querySelector('.mode-btn[data-view-mode="professional"]')?.click();
  if (params.get('mode') === 'intersection') {
    document.getElementById('sharedBtn')?.click();
  }
  document.getElementById('fitBtn')?.click();
})();