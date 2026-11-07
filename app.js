const $ = s => document.querySelector(s);
const T = {
  ar: { saveAll:'حفظ كل التبويبات', add:'إضافة موقع', newGroup:'+ خانة جديدة', select:'تحديد', auto:'حفظ تلقائي', selAll:'تحديد الكل', delete:'حذف', cancel:'إلغاء', save:'حفظ',
    search:'ابحث: تصميم، برمجة، اسم موقع، وسم، ملاحظة…', addTitle:'إضافة مواقع (رابط في كل سطر، أو اسحب الروابط والاختصارات هنا)', toGroup:'الخانة:', autoGroup:'تصنيف تلقائي',
    dropHere:'أفلت الروابط والاختصارات هنا', empty:'لا توجد مواقع بعد.\nاضغط «حفظ كل التبويبات» أو اسحب روابط إلى هذه الصفحة.', noRes:'لا نتائج مطابقة',
    saved:n=>`تم حفظ ${n} موقع جديد`, none:'لا توجد مواقع جديدة للحفظ', groupName:'اسم الخانة:', confirmGroup:'حذف هذه الخانة؟ سيتم نقل مواقعها إلى «أخرى».',
    app:'فتح كتطبيق', shortcut:'اختصار سطح المكتب', shortcutDone:'تم تنزيل ملف الاختصار — انقله إلى سطح المكتب', selected:n=>`المحدد: ${n}`, newName:'خانة جديدة',
    pickFolder:'📂 اختيار مجلد كامل', pickFiles:'📄 اختيار ملفات', report:(a,d,b)=>`تمت إضافة ${a} موقع`+(d?` • ${d} مكرر تم تجاوزه`:'')+(b?` • ${b} ملف بلا رابط`:''), reading:'جارٍ قراءة الملفات…',
    export:'تصدير نسخة احتياطية', import:'استيراد نسخة احتياطية', trash:'سلة المحذوفات', undo:'تراجع', trashed:n=>`تم نقل ${n} إلى السلة`, restore:'استرجاع', restoreAll:'استرجاع الكل', emptyTrash:'إفراغ السلة', trashEmpty:'السلة فارغة',
    openAll:'فتح الكل', confirmOpen:n=>`فتح ${n} تبويب دفعة واحدة؟`, confirmForever:'حذف نهائي؟ لا يمكن التراجع.', imported:(n,d)=>`تم استيراد ${n} موقع`+(d?` • ${d} مكرر`:''), badFile:'ملف النسخة الاحتياطية غير صالح', close:'إغلاق', exported:'تم تنزيل النسخة الاحتياطية',
    favorites:'المفضلة', pin:'إضافة للمفضلة', unpin:'إزالة من المفضلة', open:'فتح', edit:'تعديل', later:'اقرأ لاحقًا', fTitle:'العنوان', fNote:'ملاحظة', fTags:'وسوم (مفصولة بفاصلة)',
    editGroup:'تعديل الخانة', gEmoji:'أيقونة', gColor:'لون', noColor:'بدون لون', gPin:'رمز PIN لقفل الخانة (اتركه فارغًا دون تغيير)', removeLock:'🔓 إزالة القفل', unlock:'فتح القفل', enterPin:'أدخل رمز PIN:', wrongPin:'رمز غير صحيح',
    sortBy:'الترتيب:', sManual:'يدوي', sRecent:'الأحدث', sAlpha:'أبجدي', sUsed:'الأكثر استخدامًا',
    dupes:'حذف المواقع المكررة', dupesDone:n=>n?`تم نقل ${n} مكرر إلى السلة`:'لا توجد مواقع مكررة', check:'فحص الروابط المعطلة', checking:(a,b)=>`جارٍ الفحص ${a}/${b}`, checkDone:n=>n?`تم العثور على ${n} رابط معطل ⚠️`:'كل الروابط تعمل ✓',
    deadOnly:n=>`⚠️ المعطلة (${n})`, allSites:'عرض الكل', bookmarks:'استيراد مفضلات المتصفح', newtab:'استخدام الإضافة كصفحة تبويب جديد', permDenied:'لم يتم منح الصلاحية', lockedMsg:'هذه الخانة مقفلة بـ PIN' },
  en: { saveAll:'Save all tabs', add:'Add site', newGroup:'+ New group', select:'Select', auto:'Auto-save', selAll:'Select all', delete:'Delete', cancel:'Cancel', save:'Save',
    search:'Search: design, coding, site name, tag, note…', addTitle:'Add sites (one URL per line, or drag links/shortcuts here)', toGroup:'Group:', autoGroup:'Auto-categorize',
    dropHere:'Drop links & shortcuts here', empty:'No sites yet.\nClick “Save all tabs” or drag links onto this page.', noRes:'No matching results',
    saved:n=>`Saved ${n} new site(s)`, none:'No new sites to save', groupName:'Group name:', confirmGroup:'Delete this group? Its sites move to “Other”.',
    app:'Open as app', shortcut:'Desktop shortcut', shortcutDone:'Shortcut file downloaded — move it to your desktop', selected:n=>`Selected: ${n}`, newName:'New group',
    pickFolder:'📂 Choose a whole folder', pickFiles:'📄 Choose files', report:(a,d,b)=>`Added ${a} site(s)`+(d?` • ${d} duplicate(s) skipped`:'')+(b?` • ${b} file(s) without a URL`:''), reading:'Reading files…',
    export:'Export backup', import:'Import backup', trash:'Trash', undo:'Undo', trashed:n=>`${n} moved to trash`, restore:'Restore', restoreAll:'Restore all', emptyTrash:'Empty trash', trashEmpty:'Trash is empty',
    openAll:'Open all', confirmOpen:n=>`Open ${n} tabs at once?`, confirmForever:'Delete permanently? This cannot be undone.', imported:(n,d)=>`Imported ${n} site(s)`+(d?` • ${d} duplicate(s)`:''), badFile:'Invalid backup file', close:'Close', exported:'Backup downloaded',
    favorites:'Favorites', pin:'Add to favorites', unpin:'Remove from favorites', open:'Open', edit:'Edit', later:'Read later', fTitle:'Title', fNote:'Note', fTags:'Tags (comma separated)',
    editGroup:'Edit group', gEmoji:'Icon', gColor:'Color', noColor:'No color', gPin:'PIN to lock this group (leave empty to keep as is)', removeLock:'🔓 Remove lock', unlock:'Unlock', enterPin:'Enter PIN:', wrongPin:'Wrong PIN',
    sortBy:'Sort:', sManual:'Manual', sRecent:'Newest', sAlpha:'A–Z', sUsed:'Most used',
    dupes:'Remove duplicate sites', dupesDone:n=>n?`${n} duplicate(s) moved to trash`:'No duplicates found', check:'Check for dead links', checking:(a,b)=>`Checking ${a}/${b}`, checkDone:n=>n?`Found ${n} dead link(s) ⚠️`:'All links work ✓',
    deadOnly:n=>`⚠️ Dead (${n})`, allSites:'Show all', bookmarks:'Import browser bookmarks', newtab:'Use as new tab page', permDenied:'Permission was not granted', lockedMsg:'This group is PIN-locked' }
};
let D, selecting = false, query = '', SEL = new Set(), VISIBLE = [], UNLOCK = new Set(), deadOnly = false;
const L = () => D.settings.lang;
const t = k => T[L()][k];
const SORTERS = { manual: null, recent: (a, b) => b.added - a.added, alpha: (a, b) => a.title.localeCompare(b.title), used: (a, b) => (b.opens || 0) - (a.opens || 0) };

function h(tag, props = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') e.className = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  kids.flat().forEach(c => c != null && e.append(c));
  return e;
}
const gname = g => gnameOf(g, L());
const gicon = g => g.emoji || (CATS[g.id] ? CATS[g.id].icon : '🗂️');
const isLocked = id => { const g = D.groups.find(x => x.id === id); return !!(g && g.pin && !UNLOCK.has(id)); };
const sha = async s => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode('tabhive:' + s)))].map(b => b.toString(16).padStart(2, '0')).join('');
function toast(m, act) {
  const e = $('#toast'); e.textContent = m; e.classList.add('show'); e.classList.toggle('act', !!act);
  if (act) e.append(h('button', { onclick: () => { act.fn(); e.classList.remove('show'); } }, act.label));
  clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('show'), act ? 7000 : 2600);
}
async function update(fn) { D = await mutate(fn); render(); }

function applySettings() {
  const s = D.settings, de = document.documentElement;
  if (!s.lang) s.lang = navigator.language.startsWith('ar') ? 'ar' : 'en';
  if (!s.theme) s.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  de.lang = s.lang; de.dir = s.lang === 'ar' ? 'rtl' : 'ltr'; de.dataset.theme = s.theme; de.dataset.view = s.view || 'grid';
  de.style.setProperty('--tile', (s.size || 140) + 'px');
  document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
  $('#q').placeholder = t('search'); $('#urls').placeholder = 'https://example.com';
  $('#themeBtn').textContent = s.theme === 'dark' ? '☀️' : '🌙'; $('#langBtn').textContent = s.lang === 'ar' ? 'EN' : 'ع';
  $('#auto').checked = s.auto !== false; $('#selBtn').classList.toggle('primary', selecting);
  $('#sort').value = s.sort || 'manual'; $('#size').value = s.size || 140; $('#viewBtn').textContent = (s.view || 'grid') === 'grid' ? '☰' : '▦';
  $('#mNewtab').textContent = (s.newtab ? '✓ ' : '') + t('newtab');
  const nd = D.items.filter(i => i.dead).length;
  $('#deadBtn').hidden = !nd; $('#deadBtn').textContent = deadOnly ? t('allSites') : t('deadOnly')(nd);
}

function card(i) {
  const letter = () => h('div', { class: 'letter' }, (i.title || host(i.url) || '?')[0].toUpperCase());
  const img = h('img', { class: 'fav', src: `https://www.google.com/s2/favicons?domain=${host(i.url)}&sz=64`, alt: '' });
  let step = 0;
  img.onerror = () => { if (step++ === 0 && i.favicon) img.src = i.favicon; else img.replaceWith(letter()); };
  const c = h('div', { class: 'card' + (SEL.has(i.id) ? ' sel' : '') + (i.dead ? ' dead' : ''), draggable: 'true', title: i.url + (i.note ? '\n' + i.note : ''),
    onclick: e => {
      if (e.target.closest('.tools') || e.target.classList.contains('chk')) return;
      if (selecting) { SEL.has(i.id) ? SEL.delete(i.id) : SEL.add(i.id); render(); }
      else { mutate(d => { const it = d.items.find(x => x.id === i.id); if (it) it.opens = (it.opens || 0) + 1; }); api.tabs.create({ url: i.url }); }
    },
    oncontextmenu: e => { e.preventDefault(); ctxMenu(e, i); },
    ondragstart: e => { e.dataTransfer.setData('text/x-hive', i.id); e.dataTransfer.effectAllowed = 'move'; c.classList.add('dragging'); },
    ondragend: () => c.classList.remove('dragging') },
    selecting ? h('input', { type: 'checkbox', class: 'chk', ...(SEL.has(i.id) ? { checked: '' } : {}) }) : null,
    h('div', { class: 'tools' },
      h('button', { title: i.fav ? t('unpin') : t('pin'), onclick: () => toggleFav(i) }, i.fav ? '★' : '☆'),
      h('button', { title: t('edit'), onclick: () => editItem(i) }, '✎'),
      h('button', { title: t('delete'), onclick: () => del([i.id]) }, '✕')),
    img, h('div', { class: 'ttl' }, i.title), h('div', { class: 'hst' }, host(i.url)),
    h('div', { class: 'badges' }, (i.fav ? '⭐' : '') + (i.note ? '📝' : '') + (i.dead ? '⚠️' : '')));
  return c;
}
const toggleFav = i => update(d => { const it = d.items.find(x => x.id === i.id); if (it) it.fav = !it.fav; });
const moveItem = (i, gid) => update(d => { if (!d.groups.find(g => g.id === gid)) d.groups.push({ id: gid, name: '' }); const it = d.items.find(x => x.id === i.id); if (it) it.group = gid; });

function ctxMenu(e, i) {
  const m = $('#ctx'); m.innerHTML = '';
  const add = (label, fn) => m.append(h('button', { onclick: () => { m.hidden = true; fn(); } }, label));
  add('↗ ' + t('open'), () => api.tabs.create({ url: i.url }));
  add('⧉ ' + t('app'), () => api.windows.create({ url: i.url, type: 'popup', width: 1100, height: 760 }));
  add('🖥 ' + t('shortcut'), () => shortcut(i));
  add('✎ ' + t('edit'), () => editItem(i));
  add((i.fav ? '☆ ' + t('unpin') : '★ ' + t('pin')), () => toggleFav(i));
  if (i.group !== 'later') add('🕑 ' + t('later'), () => moveItem(i, 'later'));
  add('🗑 ' + t('delete'), () => del([i.id]));
  m.hidden = false;
  m.style.left = Math.min(e.clientX, innerWidth - 220) + 'px'; m.style.top = Math.min(e.clientY, innerHeight - m.offsetHeight - 10) + 'px';
}

function groupSection(g, items, total) {
  const locked = g.pin && !UNLOCK.has(g.id), collapsed = g.collapsed && !query;
  const head = h('div', { class: 'ghead', draggable: 'true', ondragstart: e => { e.dataTransfer.setData('text/x-hive-group', g.id); e.dataTransfer.effectAllowed = 'move'; } },
    h('button', { class: 'chev', onclick: () => update(d => { const x = d.groups.find(z => z.id === g.id); x.collapsed = !x.collapsed; }) }, collapsed ? (L() === 'ar' ? '◂' : '▸') : '▾'),
    h('h2', {}, `${locked ? '🔒' : gicon(g)} ${gname(g)}`), h('span', { class: 'count' }, String(total)), h('span', { class: 'sp' }),
    ...(locked ? [h('button', { onclick: () => unlock(g) }, '🔓 ' + t('unlock'))] : [
      h('button', { onclick: () => openGroup(g, items) }, '↗ ' + t('openAll')),
      h('button', { onclick: () => editGroup(g) }, '✎ ' + t('edit')),
      h('button', { onclick: () => confirm(t('confirmGroup')) && update(d => {
        d.items.forEach(i => { if (i.group === g.id) i.group = 'other'; });
        if (d.items.some(i => i.group === 'other') && !d.groups.find(x => x.id === 'other')) d.groups.push({ id: 'other', name: '' });
        d.groups = d.groups.filter(x => x.id !== g.id); }) }, '🗑')]));
  const body = locked ? h('div', { class: 'locked' }, '🔒 ' + t('lockedMsg')) : collapsed ? null : h('div', { class: 'grid' }, items.map(card));
  const sec = h('section', { class: 'group', 'data-gid': g.id }, head, body);
  if (g.color) sec.style.setProperty('--gc', g.color);
  return sec;
}

function render() {
  applySettings();
  const q = norm(query.trim()), root = $('#groups'), sorter = SORTERS[D.settings.sort || 'manual'];
  root.innerHTML = ''; VISIBLE = [];
  const ok = (i, g) => (!q || matchItem(i, g, q, L())) && (!deadOnly || i.dead);
  const gOf = id => D.groups.find(g => g.id === id) || { id, name: '' };
  // صف المفضلة
  const favs = D.items.filter(i => i.fav && !isLocked(i.group) && ok(i, gOf(i.group)));
  if (favs.length) {
    favs.forEach(i => VISIBLE.push(i.id));
    root.append(h('section', { class: 'group fav', 'data-gid': '__fav' },
      h('div', { class: 'ghead' }, h('h2', {}, '⭐ ' + t('favorites')), h('span', { class: 'count' }, String(favs.length))),
      h('div', { class: 'grid' }, (sorter ? [...favs].sort(sorter) : favs).map(card))));
  }
  for (const g of D.groups) {
    const all = D.items.filter(i => i.group === g.id), locked = g.pin && !UNLOCK.has(g.id);
    let items = locked ? [] : all.filter(i => ok(i, g));
    if ((q || deadOnly) && !items.length) continue;
    if (sorter) items = [...items].sort(sorter);
    items.forEach(i => VISIBLE.push(i.id));
    root.append(groupSection(g, items, q || deadOnly ? items.length : all.length));
  }
  const e = $('#empty'); e.hidden = !!root.children.length;
  e.style.whiteSpace = 'pre-line'; e.textContent = q ? t('noRes') : t('empty');
  $('#selbar').hidden = !selecting; $('#selCount').textContent = t('selected')(SEL.size);
  $('#trashCount').textContent = (D.trash || []).length; if ($('#trashDlg').open) renderTrash();
  const sel = $('#gsel'); sel.innerHTML = '';
  sel.append(h('option', { value: '' }, t('autoGroup')), ...D.groups.map(g => h('option', { value: g.id }, gname(g))));
}

// ---------- تعديل موقع / خانة / قفل ----------
let editingId = null, editingGid = null, removeLock = false;
function editItem(i) {
  editingId = i.id;
  $('#iTitle').value = i.title; $('#iNote').value = i.note || ''; $('#iTags').value = (i.tags || []).join(', ');
  const s = $('#iGroup'); s.innerHTML = ''; s.append(...D.groups.map(g => h('option', { value: g.id, ...(g.id === i.group ? { selected: '' } : {}) }, gname(g))));
  $('#itemDlg').showModal();
}
function editGroup(g) {
  editingGid = g.id; removeLock = false;
  $('#gName').value = gname(g); $('#gEmoji').value = g.emoji || ''; $('#gColor').value = g.color || '#5b6cff'; $('#gColor').dataset.none = g.color ? '' : '1';
  $('#gPin').value = ''; $('#gUnlock').hidden = !g.pin; $('#grpDlg').showModal();
}
async function unlock(g) {
  const pin = prompt(t('enterPin')); if (pin == null) return;
  if (await sha(g.id + ':' + pin) === g.pin) { UNLOCK.add(g.id); render(); } else toast(t('wrongPin'));
}

// ---------- الإضافة بالروابط / الملفات / السحب والإسقاط ----------
function parseInput(text) {
  const out = [];
  for (let tok of (text || '').split(/[\s,]+/)) {
    if (!tok) continue;
    const m = tok.match(/https?:\/\/[^"'<>]+/);
    if (m) out.push(m[0]);
    else if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(tok)) out.push('https://' + tok);
  }
  return out;
}
async function addList(urls, gid) {
  const list = urls.map(x => typeof x === 'string' ? { url: x } : x);
  let n = 0;
  await update(d => { n = addUrls(d, list, gid); });
  toast(n ? t('saved')(n) : t('none'));
}
async function readFile(f) {
  const ext = (f.name.split('.').pop() || '').toLowerCase(), base = f.name.replace(/\.[^.]+$/, '');
  if (ext === 'lnk') { const u = urlFromLnk(await f.arrayBuffer()); return u ? [{ url: u, title: base }] : []; }
  if (!['url', 'webloc', 'desktop', 'txt', 'html', 'htm', 'md', 'csv'].includes(ext) || f.size > 8e6) return [];
  const text = await f.text();
  if (ext === 'html' || ext === 'htm') return [...new DOMParser().parseFromString(text, 'text/html').querySelectorAll('a[href]')].map(a => ({ url: a.href, title: a.textContent.trim() }));
  if (['url', 'webloc', 'desktop'].includes(ext)) { const u = parseInput(text).find(x => /^https?:/.test(x)); return u ? [{ url: u, title: base }] : []; }
  return parseInput(text).map(url => ({ url }));
}
async function processFiles(files, gid) {
  files = [...files]; if (!files.length) return;
  toast(t('reading'));
  const found = []; let bad = 0;
  for (const f of files) { try { const r = await readFile(f); r.length ? found.push(...r) : bad++; } catch { bad++; } }
  let added = 0, dup = 0;
  await update(d => { added = addUrls(d, found, gid); dup = found.length - added; });
  toast(t('report')(added, dup, bad));
}
async function collectFiles(entries, fallback) {
  const files = [];
  const walk = async en => {
    if (en.isFile) files.push(await new Promise((ok, no) => en.file(ok, no)));
    else { const r = en.createReader(); let b; do { b = await new Promise((ok, no) => r.readEntries(ok, no)); for (const c of b) await walk(c); } while (b.length); }
  };
  for (const en of entries) await walk(en);
  return files.length ? files : [...fallback];
}

// ---------- اختصار سطح المكتب ----------
function shortcut(i) {
  const ua = navigator.userAgent, name = (i.title || host(i.url)).replace(/[^\w\u0600-\u06FF -]/g, '').trim().slice(0, 40) || 'site';
  let body, file;
  if (/Windows/.test(ua)) { body = `@echo off\r\nstart "" ${/Edg\//.test(ua) ? 'msedge' : 'chrome'} --app="${i.url.replace(/%/g, '%%')}"\r\n`; file = name + '.bat'; }
  else if (/Mac/.test(ua)) { body = `#!/bin/bash\nopen -na "Google Chrome" --args --app="${i.url}"\n`; file = name + '.command'; }
  else { body = `[Desktop Entry]\nType=Application\nName=${name}\nExec=google-chrome --app="${i.url}"\nTerminal=false\n`; file = name + '.desktop'; }
  const a = h('a', { href: URL.createObjectURL(new Blob([body], { type: 'text/plain' })), download: file });
  document.body.append(a); a.click(); a.remove(); toast(t('shortcutDone'));
}

// ---------- السلة / فتح خانة / نسخ احتياطي ----------
async function del(ids) {
  let n = 0;
  await update(d => { n = toTrash(d, ids); });
  if (n) toast(t('trashed')(n), { label: t('undo'), fn: () => update(d => fromTrash(d, ids)) });
}
function renderTrash() {
  const tr = (D.trash || []).slice().reverse(), box = $('#trashList');
  box.innerHTML = ''; $('#trashEmpty').hidden = !!tr.length;
  box.append(...tr.map(i => h('div', { class: 'trow' },
    h('img', { class: 'fav sm', src: `https://www.google.com/s2/favicons?domain=${host(i.url)}&sz=32`, alt: '' }),
    h('div', { class: 'tinfo' }, h('div', { class: 'ttl1' }, i.title), h('div', { class: 'hst' }, host(i.url))),
    h('button', { onclick: () => update(d => fromTrash(d, [i.id])) }, t('restore')),
    h('button', { class: 'danger', onclick: () => { if (confirm(t('confirmForever'))) update(d => { d.trash = d.trash.filter(x => x.id !== i.id); }); } }, '✕'))));
}
async function openGroup(g, items) {
  if (!items.length || (items.length > 15 && !confirm(t('confirmOpen')(items.length)))) return;
  const ids = [];
  for (const i of items) { try { ids.push((await api.tabs.create({ url: i.url, active: false })).id); } catch {} }
  try {
    if (ids.length && api.tabs.group && api.tabGroups) {
      const tg = await api.tabs.group({ tabIds: ids });
      await api.tabGroups.update(tg, { title: gname(g), color: ['blue', 'red', 'yellow', 'green', 'pink', 'purple', 'cyan', 'orange'][Math.max(0, D.groups.indexOf(g)) % 8] });
    }
  } catch {}
}
function exportData() {
  const json = JSON.stringify({ app: 'tabhive', version: 2, exported: new Date().toISOString(), groups: D.groups, items: D.items }, null, 2);
  const a = h('a', { href: URL.createObjectURL(new Blob([json], { type: 'application/json' })), download: `tabhive-backup-${new Date().toISOString().slice(0, 10)}.json` });
  document.body.append(a); a.click(); a.remove(); toast(t('exported'));
}
async function importData(file) {
  let j; try { j = JSON.parse(await file.text()); if (!Array.isArray(j.items)) throw 0; } catch { return toast(t('badFile')); }
  let n = 0, dup = 0;
  await update(d => {
    const have = new Set(d.items.map(i => normUrl(i.url)));
    for (const g of j.groups || []) if (g && g.id && !d.groups.find(x => x.id === g.id)) d.groups.push({ ...g, id: String(g.id) });
    for (const it of j.items) {
      const u = normUrl(it.url); if (!u) continue;
      if (have.has(u)) { dup++; continue; } have.add(u);
      const gid = it.group || 'other';
      if (!d.groups.find(x => x.id === gid)) d.groups.push({ id: gid, name: '' });
      d.items.push({ ...it, id: crypto.randomUUID(), url: u, title: it.title || host(u), group: gid, added: it.added || Date.now() }); n++;
    }
  });
  toast(t('imported')(n, dup));
}

// ---------- ميزات ذكية: مكررات / روابط معطلة / مفضلات المتصفح ----------
function cleanDupes() {
  const seen = new Set(), extra = [];
  for (const i of D.items) { const k = dupKey(i.url); seen.has(k) ? extra.push(i.id) : seen.add(k); }
  if (!extra.length) return toast(t('dupesDone')(0));
  del(extra);
}
async function checkLinks() {
  const ok = await api.permissions.request({ origins: ['<all_urls>'] }).catch(() => false);   // يُطلب فقط عند الاستخدام
  if (!ok) return toast(t('permDenied'));
  const items = [...D.items], res = new Map(); let done = 0, k = 0;
  const worker = async () => {
    while (k < items.length) {
      const i = items[k++]; let bad = false;
      try {
        const c = new AbortController(), tm = setTimeout(() => c.abort(), 12000);
        const r = await fetch(i.url, { signal: c.signal, redirect: 'follow', cache: 'no-store' });
        clearTimeout(tm); r.body && r.body.cancel(); bad = r.status === 404 || r.status === 410 || r.status >= 500;
      } catch { bad = navigator.onLine; }   // خطأ شبكة/نطاق غير موجود (لا نحكم إن كنت بلا اتصال)
      res.set(i.id, bad); toast(t('checking')(++done, items.length));
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  await update(d => { for (const it of d.items) if (res.has(it.id)) { it.dead = res.get(it.id); it.checked = Date.now(); } });
  toast(t('checkDone')([...res.values()].filter(Boolean).length));
}
async function importBookmarks() {
  const ok = await api.permissions.request({ permissions: ['bookmarks'] }).catch(() => false);
  if (!ok) return toast(t('permDenied'));
  const byFolder = new Map();
  const walk = (n, folder) => {
    if (n.url) { if (!byFolder.has(folder)) byFolder.set(folder, []); byFolder.get(folder).push({ url: n.url, title: n.title }); }
    else (n.children || []).forEach(c => walk(c, n.title || folder));
  };
  (await api.bookmarks.getTree()).forEach(r => walk(r, ''));
  let n = 0;
  await update(d => {
    for (const [f, list] of byFolder) {
      let gid = null;
      if (f) { let g = d.groups.find(x => gnameOf(x, L()) === f); if (!g) { g = { id: 'g_' + crypto.randomUUID().slice(0, 8), name: f }; d.groups.push(g); } gid = g.id; }
      n += addUrls(d, list, gid);
    }
  });
  toast(t('saved')(n));
}

// ---------- ربط الأحداث ----------
async function init() {
  D = await load(); render();
  $('#q').oninput = e => { query = e.target.value; render(); };
  $('#saveAll').onclick = async () => {
    const tabs = (await api.tabs.query({})).filter(x => x.url && normUrl(x.url) && !x.url.startsWith(api.runtime.getURL('')));
    let n = 0;
    await update(d => { n = addUrls(d, tabs.map(x => ({ url: x.url, title: x.title, favicon: x.favIconUrl }))); });
    toast(n ? t('saved')(n) : t('none'));
  };
  $('#addBtn').onclick = () => { $('#urls').value = ''; $('#addDlg').showModal(); };
  $('#pickFolder').onclick = () => $('#folderIn').click();
  $('#pickFiles').onclick = () => $('#filesIn').click();
  for (const id of ['#folderIn', '#filesIn']) $(id).onchange = e => { processFiles(e.target.files, $('#gsel').value || null); e.target.value = ''; $('#addDlg').close(); };
  $('#addCancel').onclick = () => $('#addDlg').close();
  $('#addOk').onclick = () => { addList(parseInput($('#urls').value), $('#gsel').value || null); $('#addDlg').close(); };
  $('#newGroup').onclick = () => { const n = prompt(t('groupName'), t('newName')); if (n && n.trim()) update(d => { d.groups.unshift({ id: 'g_' + crypto.randomUUID().slice(0, 8), name: n.trim() }); }); };
  $('#selBtn').onclick = () => { selecting = !selecting; SEL.clear(); render(); };
  $('#selCancel').onclick = () => { selecting = false; SEL.clear(); render(); };
  $('#selAll').onclick = () => { VISIBLE.forEach(id => SEL.add(id)); render(); };
  $('#selDel').onclick = () => { if (!SEL.size) return; const ids = [...SEL]; SEL.clear(); selecting = false; del(ids); };
  $('#themeBtn').onclick = () => update(d => { d.settings.theme = D.settings.theme === 'dark' ? 'light' : 'dark'; });
  $('#langBtn').onclick = () => update(d => { d.settings.lang = D.settings.lang === 'ar' ? 'en' : 'ar'; });
  $('#auto').onchange = e => update(d => { d.settings.auto = e.target.checked; });
  $('#sort').onchange = e => update(d => { d.settings.sort = e.target.value; });
  $('#viewBtn').onclick = () => update(d => { d.settings.view = (D.settings.view || 'grid') === 'grid' ? 'list' : 'grid'; });
  $('#size').oninput = e => { document.documentElement.style.setProperty('--tile', e.target.value + 'px'); };
  $('#size').onchange = e => update(d => { d.settings.size = +e.target.value; });
  $('#deadBtn').onclick = () => { deadOnly = !deadOnly; render(); };
  // نوافذ التعديل
  $('#iCancel').onclick = () => $('#itemDlg').close();
  $('#iSave').onclick = () => { const id = editingId; $('#itemDlg').close(); update(d => { const it = d.items.find(x => x.id === id); if (!it) return;
    it.title = $('#iTitle').value.trim() || host(it.url); it.note = $('#iNote').value.trim();
    it.tags = $('#iTags').value.split(/[,،]/).map(x => x.trim()).filter(Boolean); it.group = $('#iGroup').value || it.group; }); };
  $('#gCancel').onclick = () => $('#grpDlg').close();
  $('#gNoColor').onclick = () => { $('#gColor').dataset.none = '1'; };
  $('#gColor').oninput = () => { $('#gColor').dataset.none = ''; };
  $('#gUnlock').onclick = () => { removeLock = true; $('#gUnlock').hidden = true; };
  $('#gSave').onclick = async () => {
    const gid = editingGid, pin = $('#gPin').value.trim(), hash = pin ? await sha(gid + ':' + pin) : null;
    const name = $('#gName').value.trim(), emoji = $('#gEmoji').value.trim(), color = $('#gColor').dataset.none ? '' : $('#gColor').value;
    $('#grpDlg').close();
    update(d => { const g = d.groups.find(x => x.id === gid); if (!g) return;
      if (name && name !== gnameOf(g, L())) g.name = name; g.emoji = emoji; g.color = color;
      if (hash) { g.pin = hash; UNLOCK.add(gid); } else if (removeLock) { delete g.pin; } });
  };
  // القائمة
  $('#moreBtn').onclick = e => { e.stopPropagation(); $('#menu').hidden = !$('#menu').hidden; };
  document.addEventListener('click', () => { $('#menu').hidden = true; $('#ctx').hidden = true; });
  addEventListener('scroll', () => { $('#ctx').hidden = true; });
  $('#mExport').onclick = exportData;
  $('#mImport').onclick = () => $('#importIn').click();
  $('#importIn').onchange = e => { if (e.target.files[0]) importData(e.target.files[0]); e.target.value = ''; };
  $('#mBookmarks').onclick = importBookmarks;
  $('#mDupes').onclick = cleanDupes;
  $('#mCheck').onclick = checkLinks;
  $('#mNewtab').onclick = () => update(d => { d.settings.newtab = !D.settings.newtab; });
  $('#mTrash').onclick = () => { renderTrash(); $('#trashDlg').showModal(); };
  $('#trashClose').onclick = () => $('#trashDlg').close();
  $('#restoreAll').onclick = () => update(d => fromTrash(d, (d.trash || []).map(i => i.id)));
  $('#emptyTrash').onclick = () => { if (confirm(t('confirmForever'))) update(d => { d.trash = []; }); };
  document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#q').focus(); $('#q').select(); } });

  // السحب والإسقاط: نقل مواقع / ترتيب الخانات / روابط وملفات خارجية
  const internal = e => e.dataTransfer.types.includes('text/x-hive') || e.dataTransfer.types.includes('text/x-hive-group');
  document.addEventListener('dragenter', e => { if (!internal(e)) { $('#drop').hidden = false; $('#drop').textContent = t('dropHere'); } });
  document.addEventListener('dragleave', e => { if (!e.relatedTarget) $('#drop').hidden = true; });
  document.addEventListener('dragover', e => {
    e.preventDefault();
    document.querySelectorAll('.group.over').forEach(x => x.classList.remove('over'));
    e.target.closest?.('.group')?.classList.add('over');
  });
  document.addEventListener('drop', async e => {
    e.preventDefault(); $('#drop').hidden = true;
    document.querySelectorAll('.group.over').forEach(x => x.classList.remove('over'));
    const gid = e.target.closest?.('.group')?.dataset.gid || null, dt = e.dataTransfer;
    if (dt.types.includes('text/x-hive-group')) {
      const src = dt.getData('text/x-hive-group');
      if (gid && gid !== src && gid !== '__fav') update(d => {
        const a = d.groups.findIndex(x => x.id === src), b0 = d.groups.findIndex(x => x.id === gid), [g] = d.groups.splice(a, 1), b = d.groups.findIndex(x => x.id === gid);
        d.groups.splice(a < b0 ? b + 1 : b, 0, g); });
      return;
    }
    if (dt.types.includes('text/x-hive')) {
      const id = dt.getData('text/x-hive');
      if (gid === '__fav') update(d => { const it = d.items.find(x => x.id === id); if (it) it.fav = true; });
      else if (gid) update(d => { const it = d.items.find(x => x.id === id); if (it) it.group = gid; });
      return;
    }
    const text = (dt.getData('text/uri-list') || '') + '\n' + (dt.getData('text/plain') || '');
    const entries = [...dt.items].filter(i => i.kind === 'file').map(i => i.webkitGetAsEntry?.()).filter(Boolean);   // يجب قراءتها قبل أي await
    const fallback = [...dt.files], urls = [...new Set(parseInput(text))], target = gid && gid !== '__fav' ? gid : null;
    if (urls.length) addList(urls, target);
    if (entries.length || fallback.length) processFiles(await collectFiles(entries, fallback), target);
  });
  api.storage.onChanged.addListener(async () => { D = await load(); if (!document.activeElement?.matches('textarea,input#q,dialog input')) render(); });
}
init();
