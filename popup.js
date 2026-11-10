(async () => {
  const $ = s => document.querySelector(s);
  let d = await load(); const s = d.settings;
  const lang = s.lang || (navigator.language.startsWith('ar') ? 'ar' : 'en');
  const theme = s.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; document.documentElement.dataset.theme = theme;
  const X = { ar: { added: 'تمت إضافة الموقع بنجاح', exists: 'الموقع محفوظ مسبقًا', cant: 'لا يمكن حفظ هذه الصفحة', own: 'أنت داخل TabHive بالفعل', grp: 'المجموعة:', open: 'فتح TabHive', all: 'حفظ كل التبويبات المفتوحة', n: n => n ? `تم حفظ ${n} موقع جديد` : 'كل التبويبات محفوظة مسبقًا' },
              en: { added: 'Site added successfully', exists: 'Already saved', cant: "This page can't be saved", own: "You're already in TabHive", grp: 'Group:', open: 'Open TabHive', all: 'Save all open tabs', n: n => n ? `Saved ${n} new site(s)` : 'All tabs were already saved' } }[lang];
  $('#open').textContent = X.open; $('#all').textContent = X.all; $('#grpLbl').textContent = X.grp;
  const base = api.runtime.getURL('');
  const savable = u => u && normUrl(u) && !u.startsWith(base);

  async function openManager() {
    const url = api.runtime.getURL('app.html'), tabs = await api.tabs.query({ url });
    if (tabs[0]) { await api.tabs.update(tabs[0].id, { active: true }); await api.windows.update(tabs[0].windowId, { focused: true }); }
    else await api.tabs.create({ url });
    window.close();
  }
  function show(kind, text) { const t = $('#tick'); t.className = 'tick ' + (kind === 'ok' ? '' : kind); t.textContent = kind === 'ok' ? '✓' : kind === 'info' ? 'ℹ' : '!'; $('#msg').textContent = text; }
  function fillGroups(item) {
    const sel = $('#grp'); sel.innerHTML = '';
    for (const g of d.groups) { const o = document.createElement('option'); o.value = g.id; o.textContent = gnameOf(g, lang); if (g.id === item.group) o.selected = true; sel.append(o); }
    $('#grpRow').hidden = false;
    sel.onchange = () => mutate(dd => { const it = dd.items.find(i => i.id === item.id); if (it) it.group = sel.value; });
  }

  $('#open').onclick = openManager;
  $('#all').onclick = async () => {
    const tabs = (await api.tabs.query({})).filter(x => savable(x.url)); let n = 0;
    await mutate(dd => { n = addUrls(dd, tabs.map(x => ({ url: x.url, title: x.title, favicon: x.favIconUrl }))); });
    show(n ? 'ok' : 'info', X.n(n));
  };

  // الضغط على الأيقونة = حفظ الموقع الحالي
  const [tab] = await api.tabs.query({ active: true, currentWindow: true });
  if (!tab || !savable(tab.url)) { show(tab && tab.url && tab.url.startsWith(base) ? 'info' : 'warn', tab && tab.url && tab.url.startsWith(base) ? X.own : X.cant); return; }
  let item, added = false;
  d = await mutate(dd => {
    const k = normUrl(tab.url), ex = dd.items.find(i => normUrl(i.url) === k);
    if (ex) { item = ex.id; return false; }
    added = addUrls(dd, [{ url: tab.url, title: tab.title, favicon: tab.favIconUrl }]) > 0;
    item = dd.items[dd.items.length - 1].id;
  });
  const it = d.items.find(i => i.id === item);
  show(added ? 'ok' : 'info', added ? X.added : X.exists);
  $('#ico').src = `https://www.google.com/s2/favicons?domain=${host(it.url)}&sz=64`;
  $('#ttl').textContent = it.title; $('#hst').textContent = host(it.url); $('#site').hidden = false;
  fillGroups(it);
})();
