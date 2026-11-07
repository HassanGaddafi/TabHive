const api = globalThis.browser || globalThis.chrome;

// التصنيفات: d = نطاقات معروفة، k = كلمات مفتاحية (تُستخدم أيضًا في البحث)
const CATS = {
  dev:   { ar:'برمجة وتدريب برمجي', en:'Programming & Coding', icon:'💻',
    d:['github.com','gitlab.com','stackoverflow.com','w3schools.com','developer.mozilla.org','npmjs.com','codepen.io','leetcode.com','hackerrank.com','codewars.com','freecodecamp.org','geeksforgeeks.org','replit.com','vercel.com','netlify.com','dev.to','kaggle.com','localhost','codesandbox.io','jsfiddle.net','pypi.org','docs.python.org'],
    k:['code','coding','programming','developer','github','javascript','python','برمجة','كود','تطوير','مبرمج','تدريب برمجي'] },
  design:{ ar:'تصميم وإبداع', en:'Design & Creative', icon:'🎨',
    d:['figma.com','canva.com','dribbble.com','behance.net','pinterest.com','adobe.com','unsplash.com','freepik.com','coolors.co','fonts.google.com','pexels.com','flaticon.com'],
    k:['design','figma','ui','ux','logo','font','color','تصميم','لوجو','شعار','خطوط','الوان','ألوان','جرافيك'] },
  ai:    { ar:'ذكاء اصطناعي', en:'AI Tools', icon:'🤖',
    d:['openai.com','chatgpt.com','claude.ai','anthropic.com','gemini.google.com','perplexity.ai','huggingface.co','midjourney.com','poe.com'],
    k:['ai','gpt','chatbot','ذكاء','اصطناعي','شات'] },
  learn: { ar:'تعلّم ودورات', en:'Learning & Courses', icon:'🎓',
    d:['coursera.org','udemy.com','udacity.com','khanacademy.org','edx.org','wikipedia.org','skillshare.com','duolingo.com','academy.hsoub.com'],
    k:['course','learn','tutorial','academy','university','تعلم','دورة','كورس','شرح','جامعة','تعليم'] },
  video: { ar:'فيديو وترفيه', en:'Video & Entertainment', icon:'🎬',
    d:['youtube.com','youtu.be','netflix.com','vimeo.com','twitch.tv','shahid.mbc.net','imdb.com'],
    k:['video','movie','watch','فيديو','فيلم','مشاهدة','مسلسل'] },
  music: { ar:'موسيقى', en:'Music', icon:'🎵',
    d:['spotify.com','soundcloud.com','anghami.com','music.youtube.com'], k:['music','song','podcast','موسيقى','اغاني','أغاني','بودكاست'] },
  social:{ ar:'تواصل اجتماعي', en:'Social Media', icon:'💬',
    d:['facebook.com','instagram.com','twitter.com','x.com','linkedin.com','tiktok.com','reddit.com','web.whatsapp.com','t.me','telegram.org','discord.com','threads.net'],
    k:['social','chat','تواصل','فيسبوك','انستجرام','واتساب'] },
  work:  { ar:'عمل وإنتاجية', en:'Work & Productivity', icon:'🗂️',
    d:['gmail.com','mail.google.com','outlook.com','outlook.live.com','docs.google.com','drive.google.com','sheets.google.com','notion.so','trello.com','slack.com','calendar.google.com','zoom.us','asana.com','office.com'],
    k:['mail','email','docs','project','meeting','عمل','بريد','مشروع','اجتماع','مهام'] },
  shop:  { ar:'تسوق', en:'Shopping', icon:'🛒',
    d:['amazon.com','amazon.eg','amazon.sa','ebay.com','aliexpress.com','noon.com','jumia.com.eg','temu.com'], k:['shop','store','buy','تسوق','متجر','شراء'] },
  news:  { ar:'أخبار', en:'News', icon:'📰',
    d:['bbc.com','cnn.com','aljazeera.net','aljazeera.com','reuters.com','nytimes.com','youm7.com','almasryalyoum.com'], k:['news','أخبار','اخبار'] },
  other: { ar:'أخرى', en:'Other', icon:'📁', d:[], k:[] }
};

const host = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
const normUrl = u => { try { const x = new URL(u); if (!/^https?:$/.test(x.protocol)) return null; x.hash = ''; return x.href.replace(/\/$/, ''); } catch { return null; } };

function categorize(url, title = '') {
  const h = host(url), txt = (title + ' ' + h).toLowerCase();
  for (const [k, c] of Object.entries(CATS)) if (c.d.some(d => h === d || h.endsWith('.' + d))) return k;
  for (const [k, c] of Object.entries(CATS)) if (c.k.some(w => txt.includes(w))) return k;
  return 'other';
}

async function load() {
  const r = await api.storage.local.get('data');
  const d = r.data || { items: [], groups: [], settings: {} };
  d.settings = d.settings || {};
  return d;
}

// قراءة ← تعديل ← حفظ بشكل متسلسل لتجنب فقدان البيانات
let _q = Promise.resolve();
function mutate(fn) {
  const p = _q.then(async () => {
    const d = await load();
    if (fn(d) === false) return d;
    await api.storage.local.set({ data: d });
    return d;
  });
  _q = p.catch(() => {});
  return p;
}

function addUrls(d, list, gid) {
  const have = new Set(d.items.map(i => normUrl(i.url)));
  let n = 0;
  for (const x of list) {
    const u = normUrl(x.url);
    if (!u || have.has(u)) continue;
    have.add(u);
    const g = gid || categorize(u, x.title);
    if (!d.groups.find(z => z.id === g)) d.groups.push({ id: g, name: '' });
    d.items.push({ id: crypto.randomUUID(), url: u, title: x.title || host(u), favicon: x.favicon || '', group: g, added: Date.now() });
    n++;
  }
  return n;
}

// ---------- قراءة ملفات اختصار Windows (.lnk) ----------
// البنية: Header(76) ← LinkTargetIDList ← LinkInfo ← StringData(name, path, workdir, args, icon)
function parseLnk(buf) {
  const v = new DataView(buf), u8 = new Uint8Array(buf);
  if (buf.byteLength < 78 || v.getUint32(0, true) !== 0x4C) return null;
  const f = v.getUint32(0x14, true), uni = !!(f & 0x80), out = {};
  let p = 0x4C;
  if (f & 1) p += 2 + v.getUint16(p, true);
  if (f & 2) p += v.getUint32(p, true);
  for (const [bit, key] of [[4, 'name'], [8, 'rel'], [0x10, 'work'], [0x20, 'args'], [0x40, 'icon']]) {
    if (!(f & bit)) continue;
    const len = v.getUint16(p, true) * (uni ? 2 : 1); p += 2;
    out[key] = new TextDecoder(uni ? 'utf-16le' : 'windows-1252').decode(u8.subarray(p, p + len)); p += len;
  }
  return out;
}
function urlFromLnk(buf) {
  try {
    const o = parseLnk(buf); if (!o) return null;
    for (const s of [o.args, o.rel, o.work, o.name]) { const m = (s || '').match(/https?:\/\/[^\s"'<>]+/); if (m) return m[0]; }
  } catch {}
  return null;
}
if (typeof module !== 'undefined') module.exports = { parseLnk, urlFromLnk };


// ---------- أدوات مشتركة (البحث + السلة) ----------
const norm = s => (s || '').toLowerCase().replace(/[\u064B-\u0652\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
const gnameOf = (g, lang) => g.name || (CATS[g.id] ? CATS[g.id][lang] : g.id);
function matchItem(i, g, q, lang) {
  const c = CATS[categorize(i.url, i.title)];
  const hay = norm([i.title, i.url, i.note, (i.tags || []).join(' '), gnameOf(g, lang), c.ar, c.en, c.k.join(' ')].join(' '));
  return q.split(/\s+/).every(w => hay.includes(w));
}
function toTrash(d, ids) {
  const set = new Set(ids); d.trash = d.trash || [];
  const moved = d.items.filter(i => set.has(i.id));
  d.trash.push(...moved.map(i => ({ ...i, deleted: Date.now() })));
  d.items = d.items.filter(i => !set.has(i.id));
  return moved.length;
}
function fromTrash(d, ids) {
  const set = new Set(ids), have = new Set(d.items.map(i => normUrl(i.url))), keep = [];
  for (const it of d.trash || []) {
    if (!set.has(it.id)) { keep.push(it); continue; }
    const { deleted, ...rest } = it;
    if (have.has(normUrl(rest.url))) continue;
    if (!d.groups.find(g => g.id === rest.group)) d.groups.push({ id: rest.group, name: '' });
    d.items.push(rest);
  }
  d.trash = keep;
}

CATS.later = { ar: 'اقرأ لاحقًا', en: 'Read later', icon: '🕑', d: [], k: [] };
// مفتاح كشف التكرار: يتجاهل www ووسوم التتبع (utm_* و fbclid ...) والشرطة الأخيرة
function dupKey(u) {
  try {
    const x = new URL(u);
    const p = [...x.searchParams].filter(([k]) => !/^(utm_|ref$|fbclid|gclid|igshid|mc_)/i.test(k)).sort();
    return x.hostname.replace(/^www\./, '') + x.pathname.replace(/\/$/, '') + (p.length ? '?' + p.map(a => a.join('=')).join('&') : '');
  } catch { return u; }
}
