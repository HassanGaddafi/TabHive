if (typeof importScripts === 'function') importScripts('common.js');

const pageUrl = () => api.runtime.getURL('app.html');

api.action.onClicked.addListener(async () => {
  const tabs = await api.tabs.query({ url: pageUrl() });
  if (tabs[0]) {
    api.tabs.update(tabs[0].id, { active: true });
    api.windows.update(tabs[0].windowId, { focused: true });
  } else api.tabs.create({ url: pageUrl() });
});

// حفظ تلقائي: أي موقع يُفتح يُحفظ ولا يُحذف أبدًا إلا يدويًا
api.tabs.onUpdated.addListener((id, ch, tab) => {
  if (ch.status !== 'complete' || !tab.url) return;
  mutate(d => {
    if (d.settings.auto === false) return false;
    const u = normUrl(tab.url);
    if ((d.trash || []).some(i => normUrl(i.url) === u)) return false;   // لا نعيد حفظ موقع حذفه المستخدم
    return addUrls(d, [{ url: tab.url, title: tab.title, favicon: tab.favIconUrl }]) ? undefined : false;
  });
});

// اختصار لوحة المفاتيح: بحث سريع من أي صفحة
api.commands.onCommand.addListener(async cmd => {
  if (cmd !== 'quick-search') return;
  const w = await api.windows.getLastFocused(), W = 600, H = 480;
  const pos = w.width ? { left: Math.round(w.left + (w.width - W) / 2), top: Math.round(w.top + 90) } : {};
  api.windows.create({ url: api.runtime.getURL('quick.html') + '?w=' + w.id, type: 'popup', width: W, height: H, focused: true, ...pos });
});

// ---------- القائمة السياقية (زر الأيمن): حفظ / اقرأ لاحقًا ----------
api.runtime.onInstalled.addListener(async () => {
  try { await api.contextMenus.removeAll(); } catch {}
  api.contextMenus.create({ id: 'save', title: 'TabHive: حفظ / Save', contexts: ['page', 'link'] });
  api.contextMenus.create({ id: 'later', title: 'TabHive: اقرأ لاحقًا / Read later', contexts: ['page', 'link'] });
});
api.contextMenus.onClicked.addListener((info, tab) => {
  const url = info.linkUrl || info.pageUrl, later = info.menuItemId === 'later';
  mutate(d => {
    const k = normUrl(url), ex = d.items.find(i => normUrl(i.url) === k);
    if (ex) { if (!later) return false; if (!d.groups.find(g => g.id === 'later')) d.groups.push({ id: 'later', name: '' }); ex.group = 'later'; return; }
    return addUrls(d, [{ url, title: info.linkUrl ? undefined : tab && tab.title, favicon: info.linkUrl ? '' : tab && tab.favIconUrl }], later ? 'later' : null) ? undefined : false;
  }).then(() => { api.action.setBadgeText({ text: '✓' }); setTimeout(() => api.action.setBadgeText({ text: '' }), 1600); });
});

// ---------- استخدام الإضافة كصفحة تبويب جديد (اختياري من القائمة) ----------
api.tabs.onCreated.addListener(async tab => {
  const u = tab.pendingUrl || tab.url || '';
  if (!/^(chrome|edge|brave|vivaldi|opera):\/\/(newtab|new-tab-page)|^about:(newtab|home)/.test(u)) return;
  if ((await load()).settings.newtab) api.tabs.update(tab.id, { url: pageUrl() });
});
