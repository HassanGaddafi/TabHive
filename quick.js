(async () => {
  const $ = s => document.querySelector(s), d = await load(), s = d.settings;
  const lang = s.lang || (navigator.language.startsWith('ar') ? 'ar' : 'en');
  const theme = s.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; document.documentElement.dataset.theme = theme;
  const W = +new URLSearchParams(location.search).get('w') || undefined;
  const gm = Object.fromEntries(d.groups.map(g => [g.id, g]));
  $('#q').placeholder = lang === 'ar' ? 'ابحث في مواقعك… (Esc للإغلاق)' : 'Search your sites… (Esc to close)';
  let list = [], idx = 0;

  function draw() {
    const ul = $('#res'); ul.innerHTML = '';
    list.forEach((i, n) => {
      const li = document.createElement('li'); if (n === idx) li.className = 'on';
      li.innerHTML = '<img alt=""><div><b></b><small></small></div><kbd></kbd>';
      li.querySelector('img').src = `https://www.google.com/s2/favicons?domain=${host(i.url)}&sz=64`;
      li.querySelector('b').textContent = i.title; li.querySelector('small').textContent = host(i.url);
      li.querySelector('kbd').textContent = n === idx ? '↵' : '';
      li.onclick = () => open(i); ul.append(li);
    });
    ul.querySelector('.on')?.scrollIntoView({ block: 'nearest' });
  }
  function search() {
    const q = norm($('#q').value.trim());
    let items = d.items.filter(i => !(gm[i.group] && gm[i.group].pin)).map(i => [i, gm[i.group] || { id: i.group, name: '' }]);
    items = q ? items.filter(([i, g]) => matchItem(i, g, q, lang)) : items.sort((a, b) => b[0].added - a[0].added);
    list = items.slice(0, 8).map(x => x[0]); idx = 0; draw();
  }
  async function open(i) {
    await api.tabs.create(W ? { url: i.url, windowId: W } : { url: i.url });
    if (W) try { await api.windows.update(W, { focused: true }); } catch {}
    window.close();
  }
  $('#q').oninput = search;
  addEventListener('keydown', e => {
    if (e.key === 'Escape') window.close();
    else if (e.key === 'ArrowDown') { e.preventDefault(); idx = Math.min(idx + 1, list.length - 1); draw(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); idx = Math.max(idx - 1, 0); draw(); }
    else if (e.key === 'Enter' && list[idx]) open(list[idx]);
  });
  addEventListener('focus', () => addEventListener('blur', () => setTimeout(() => window.close(), 200), { once: true }), { once: true });
  search(); $('#q').focus();
})();
