/* Tollgate — single-file study app. Content is inlined as DATA at build time. */
(() => {
'use strict';
const D = DATA;
const PHASES = D.bok.phases.map(p => p.key);
const SEC = {}; D.bok.phases.forEach(p => p.sections.forEach(s => SEC[s.id] = { ...s, phase: p.key }));
const LESSONS = Object.fromEntries(D.lessons.map(l => [l.day, l]));
const Q = Object.fromEntries(D.questions.map(q => [q.id, q]));
const SCHED = D.bok.schedule;
const GLOSS = D.glossary.slice().sort((a, b) => a.term.localeCompare(b.term));
const PASS = 70;

// ---------- storage ----------
const KEY = 'tollgate.v1';
let S = load();
function load() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { s = null; }
  s = s || {};
  s.lessons = s.lessons || {};      // day -> {read:{block:true}, checks:{qid:{a,ok}}, applied:'', complete:ts}
  s.answers = s.answers || [];      // {q, ok, t, mode}
  s.revisit = s.revisit || {};      // qid -> {due, streak, lastDay, src}
  s.mocks = s.mocks || [];          // finished attempts
  s.active = s.active || null;      // in-progress mock
  s.settings = s.settings || {};
  s.start = s.start || today();
  return s;
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } }
function today() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function dayIndex(iso) { return Math.round(new Date(iso + 'T00:00:00').getTime() / 86400000); }

// ---------- utils ----------
const $ = sel => document.querySelector(sel);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pct = (a, b) => b ? Math.round(100 * a / b) : 0;
const LET = ['A', 'B', 'C', 'D'];
function fmtTime(sec) { sec = Math.max(0, Math.round(sec)); const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'); }
function fmtDate(iso) { const d = new Date(iso); return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }); }
function shuffle(a, rnd = Math.random) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
let toastT; function toast(msg) { let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); } t.textContent = msg; clearTimeout(toastT); toastT = setTimeout(() => t.remove(), 2200); }
function copy(text) { if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast('Copied'), () => fallbackCopy(text)); else fallbackCopy(text); }
function fallbackCopy(text) { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast('Copied'); } catch (e) { toast('Copy failed. Select and copy the text manually.'); } ta.remove(); }
function bar(v, opts = {}) { const cls = ['bar', opts.pass !== false ? 'pass' : '', v < PASS && opts.pass !== false ? 'low' : '', opts.size || ''].join(' '); return `<div class="${cls}"><i style="width:${Math.min(100, v)}%"></i>${opts.label ? `<span class="passlabel">${PASS}</span>` : ''}</div>`; }
function scoreColor(v) { return v >= PASS ? '' : ' amber'; }
function lessonLabel(day) { const l = LESSONS[day]; return l ? `Week ${l.week} · Day ${day}` : `Day ${day}`; }
function daysToExam() { const exam = SCHED.find(s => s.kind === 'exam'); const idx = dayIndex(today()) - dayIndex(S.start); return Math.max(0, exam.day - 1 - idx); }

// ---------- accuracy stats ----------
function statsBySection() {
  const m = {};
  for (const a of S.answers) { const q = Q[a.q]; if (!q) continue; const k = q.section; m[k] = m[k] || { n: 0, ok: 0 }; m[k].n++; if (a.ok) m[k].ok++; }
  return m;
}
function weakest(n = 3, minN = 3) {
  const st = statsBySection();
  return Object.entries(st).filter(([, v]) => v.n >= minN).map(([id, v]) => ({ id, pct: pct(v.ok, v.n), ...v })).sort((a, b) => a.pct - b.pct).slice(0, n);
}
function sectionLessonDay(secId) { const l = D.lessons.find(l => l.sections.includes(secId)); return l ? l.day : null; }

// ---------- revisit queue ----------
const INTERVALS = [1, 3, 7];
function recordAnswer(qid, ok, mode) {
  S.answers.push({ q: qid, ok, t: Date.now(), mode });
  const r = S.revisit[qid]; const td = today();
  if (!ok) { S.revisit[qid] = { due: addDays(td, 1), streak: 0, step: 0, lastDay: td, src: mode }; }
  else if (r) {
    if (r.lastDay !== td) { r.streak = (r.streak || 0) + 1; r.lastDay = td; }
    if (r.streak >= 2) delete S.revisit[qid];
    else { r.step = Math.min((r.step || 0) + 1, INTERVALS.length - 1); r.due = addDays(td, INTERVALS[r.step]); }
  }
  save();
}
function addDays(iso, n) { const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function revisitDue() { const td = today(); return Object.entries(S.revisit).filter(([q, r]) => Q[q] && r.due <= td).map(([q]) => q); }
function revisitAll() { return Object.keys(S.revisit).filter(q => Q[q]); }

// ---------- router ----------
const routes = {};
function go(hash) { location.hash = hash; }
window.addEventListener('hashchange', render);
function parseHash() { const h = (location.hash || '#today').slice(1).split('/'); return { name: h[0] || 'today', args: h.slice(1) }; }

// ---------- chrome ----------
const NAV = [['today', 'Today'], ['course', 'Course map'], ['practice', 'Practice'], ['glossary', 'Glossary'], ['calc', 'Calculators'], ['progress', 'Progress']];
const TABS = [['today', 'Today'], ['course', 'Course'], ['practice', 'Practice'], ['tools', 'Tools'], ['progress', 'Progress']];
function tabFor(name) { if (['glossary', 'calc', 'tools', 'settings'].includes(name)) return 'tools'; if (['lesson'].includes(name)) return 'course'; if (['drill', 'results', 'review', 'mock'].includes(name)) return 'practice'; return name; }
function shell(name, inner) {
  const nextL = nextLesson();
  const side = `<nav class="sidebar"><div class="brand">Tollgate</div>${NAV.map(([k, t]) => `<a href="#${k}" class="${(tabFor(name) === k || name === k || (k === 'course' && name === 'lesson')) ? 'on' : ''}">${t}</a>`).join('')}<a href="#settings" class="${name === 'settings' ? 'on' : ''}">Settings</a><div class="foot">${nextL ? lessonLabel(nextL.day) : 'Course complete'}<br>Exam in ${daysToExam()} days</div></nav>`;
  const tabs = `<nav class="tabbar">${TABS.map(([k, t]) => `<a href="#${k}" class="${tabFor(name) === k ? 'on' : ''}">${t}</a>`).join('')}</nav>`;
  return `<div class="shell">${side}<main class="main">${inner}</main></div>${tabs}`;
}
function render() {
  if (S.active && !S.active.finished && parseHash().name !== 'mock') {
    // keep an in-progress mock reachable but don't trap the user
  }
  const { name, args } = parseHash();
  const fn = routes[name] || routes.today;
  const html = fn(...args);
  const app = $('#app');
  if (name === 'mock') { app.innerHTML = html; } else { app.innerHTML = shell(name, html); }
  window.scrollTo(0, 0);
  bindTerms();
}

// ---------- lesson progress helpers ----------
function lessonState(day) { S.lessons[day] = S.lessons[day] || { read: {}, checks: {}, applied: '' }; return S.lessons[day]; }
function lessonDone(day) { return !!(S.lessons[day] && S.lessons[day].complete); }
function lessonStarted(day) { const l = S.lessons[day]; return !!(l && (Object.keys(l.read).length || Object.keys(l.checks).length || l.applied)); }
function nextLesson() { return D.lessons.find(l => !lessonDone(l.day)) || null; }
function checkScore(day) { const l = LESSONS[day]; const st = S.lessons[day]; if (!l || !st) return null; const done = l.check.filter(q => st.checks[q]); if (!done.length) return null; return { ok: l.check.filter(q => st.checks[q] && st.checks[q].ok).length, n: done.length, total: l.check.length }; }
function scheduleStatus(item) {
  if (item.kind === 'lesson') return lessonDone(item.day) ? 'done' : lessonStarted(item.day) ? 'prog' : '';
  if (item.kind === 'mock') return S.mocks.some(m => m.size === item.mock && m.day === item.day) ? 'done' : '';
  return S.settings['done' + item.day] ? 'done' : '';
}
const doneDays = () => SCHED.filter(scheduleStatus).filter(i => scheduleStatus(i) === 'done').length;

// ---------- TODAY ----------
routes.today = () => {
  const nl = nextLesson();
  const due = revisitDue().length, all = revisitAll().length;
  const weeks = [1, 2, 3, 4, 5, 6].map(w => { const items = SCHED.filter(s => s.week === w); const d = items.filter(i => scheduleStatus(i) === 'done').length; return { w, pct: pct(d, items.length), label: weekLabel(w) }; });
  const weak = weakest();
  const dt = new Date().toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
  const active = S.active && !S.active.finished;
  let card;
  if (active) card = `<div class="card"><span class="eyebrow">Mock in progress</span><div style="font:500 19px/1.3 var(--sans)">${esc(S.active.label)} · ${S.active.answers.filter(a => a != null).length} of ${S.active.order.length} answered</div><button class="primary" onclick="location.hash='#mock'">Resume mock</button></div>`;
  else if (nl) { const st = S.lessons[nl.day]; const read = st ? Object.keys(st.read).length : 0; card = `<div class="card"><span class="eyebrow">Next lesson · Week ${nl.week} · Day ${nl.day}</span><div style="font:500 19px/1.3 var(--sans)">${esc(nl.title)}</div><span class="caption">~${nl.minutes} min · ${nl.phase}${read ? ` · ${read} of 6 blocks read` : ''}</span><button class="primary" onclick="location.hash='#lesson/${nl.day}'">${read ? 'Resume' : 'Start'} lesson</button></div>`; }
  else card = `<div class="card"><span class="eyebrow">Lessons complete</span><div>All 24 lessons done. Work the revisit queue and run mocks.</div><button class="primary" onclick="location.hash='#practice'">Practice</button></div>`;
  const todayItem = SCHED.find(s => s.kind !== 'lesson' && scheduleStatus(s) !== 'done' && (!nl || s.day < nl.day));
  const special = todayItem ? `<div class="card"><span class="eyebrow">Scheduled · Day ${todayItem.day}</span><div style="font:500 17px">${esc(todayItem.title)}</div>${dayAction(todayItem)}</div>` : '';
  return `<div class="row"><h2 class="page">Today</h2><span class="caption">${dt}</span></div>
  ${card}${special}
  <div class="row" style="padding:12px 0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)"><span>Revisit queue</span><span style="display:flex;gap:10px;align-items:baseline"><span class="mono" style="font-weight:500;font-size:17px">${due}</span><span class="caption">due of ${all}</span>${due ? `<a href="#drill/revisit" style="text-decoration:none;font-size:14px">Start</a>` : ''}</span></div>
  <div class="stack"><div class="row"><span class="eyebrow">Course progress</span><span class="caption mono">${doneDays()} of 30 days</span></div>
  <div style="display:grid;grid-template-columns:32px 1fr;gap:8px 12px;align-items:center;font:13px var(--mono);color:var(--ink2)">${weeks.map(w => `<span>W${w.w}</span><div class="bar"><i style="width:${w.pct}%"></i></div>`).join('')}</div></div>
  <div class="stack"><span class="eyebrow">Weakest topics</span>${weak.length ? weak.map(w => `<div class="stack" style="gap:6px"><div class="row"><a href="#lesson/${sectionLessonDay(w.id) || ''}" style="text-decoration:none;color:var(--ink)">${w.id} ${esc(SEC[w.id].title)}</a><span class="mono${scoreColor(w.pct)}" style="font-weight:500;font-size:14px">${w.pct}%</span></div>${bar(w.pct)}</div>`).join('') : '<span class="caption">Answer a few questions and your weakest sections appear here.</span>'}</div>`;
};
function weekLabel(w) { const ph = [...new Set(SCHED.filter(s => s.week === w).map(s => s.phase))]; return ph.join(' → '); }
function dayAction(item) {
  if (item.kind === 'mock') return `<button class="primary" onclick="startMock(${item.mock},${item.day})">Start ${item.mock}-question mock</button>`;
  if (item.kind === 'review') return `<span class="caption">${item.day === 27 ? 'Drill your weakest sections, then mark done.' : 'Clear the revisit queue, then mark done.'}</span><div class="wrap"><button class="secondary" onclick="location.hash='#practice'">Practice</button><button class="secondary" onclick="markDay(${item.day})">Mark done</button></div>`;
  if (item.kind === 'exam') return `<div class="prose small" style="font-size:15px;font-family:var(--sans)"><ul><li>Government photo ID ready; name matches your PeopleCert account.</li><li>Quiet room, clear desk, door closed. Webcam and microphone working.</li><li>Run the proctoring software check the day before.</li><li>Pace: 1.8 min per question. Flag and move on; return at the end.</li><li>Read every question twice. Watch for "not", "except" and "least".</li></ul></div><button class="secondary" onclick="markDay(${item.day})">Mark done</button>`;
  return '';
}
window.markDay = d => { S.settings['done' + d] = Date.now(); save(); render(); };

// ---------- COURSE MAP ----------
routes.course = () => {
  const weeks = [1, 2, 3, 4, 5, 6].map(w => ({ w, items: SCHED.filter(s => s.week === w) }));
  return `<div class="row"><h2 class="page">Course map</h2><div class="caption" style="display:flex;gap:16px;flex-wrap:wrap"><span><i class="dot done" style="display:inline-block;vertical-align:middle;margin-right:5px"></i>Done</span><span><i class="dot prog" style="display:inline-block;vertical-align:middle;margin-right:5px"></i>In progress</span><span class="mono">${doneDays()} / 30</span></div></div>
  <div class="grid3">${weeks.map(({ w, items }) => `<div class="stack" style="gap:2px"><div class="row" style="padding-bottom:6px;border-bottom:1px solid var(--rule)"><span style="font-weight:500;font-size:14px">Week ${w}</span><span class="eyebrow">${weekLabel(w)}</span></div>
  ${items.map(it => { const st = scheduleStatus(it); const cs = it.kind === 'lesson' ? checkScore(it.day) : null; const score = cs ? `${cs.ok}/${cs.total}` : it.kind === 'lesson' ? '—' : it.kind === 'mock' ? (mockFor(it) ? mockFor(it).pct + '%' : '') : ''; const href = it.kind === 'lesson' ? `#lesson/${it.day}` : '#today'; return `<a class="dayrow" href="${href}"><i class="dot ${st}"></i><span class="mono caption">D${it.day}</span><span class="t">${esc(it.title)}</span><span class="mono caption${cs && cs.ok < 4 ? ' amber' : ''}">${score}</span></a>`; }).join('')}</div>`).join('')}</div>`;
};
function mockFor(item) { return S.mocks.filter(m => m.day === item.day).sort((a, b) => b.pct - a.pct)[0]; }

// ---------- LESSON ----------
const BLOCKS = ['The Idea', 'Worked Example', 'Formula Card', 'Exam Traps', 'Check Questions', 'Applied Task'];
const BLOCK_LABEL = { 'The Idea': 'The idea in plain English', 'Worked Example': 'Worked example', 'Formula Card': 'Formula card', 'Exam Traps': 'Exam traps', 'Check Questions': 'Check questions', 'Applied Task': 'Applied task' };
routes.lesson = (day) => {
  day = +day; const L = LESSONS[day];
  if (!L) return `<h2 class="page">Lesson not found</h2><p><a href="#course">Back to the course map</a></p>`;
  const st = lessonState(day);
  const nxt = D.lessons.find(l => l.day > day);
  const checksDone = L.check.filter(q => st.checks[q]).length;
  const cs = checkScore(day);
  const worked = L.html['Worked Example'];
  return `<div class="row" style="border-bottom:1px solid var(--rule);padding-bottom:12px;margin:-4px 0 0"><a href="#course" style="text-decoration:none;color:var(--ink2);font-size:14px">← Course</a><span class="mono caption">W${L.week} · D${day}</span><button class="ghost sm" onclick="toggleProse()" title="Switch lesson typeface">Aa</button></div>
  <article class="lesson">
    <div class="stack" style="gap:8px"><span class="eyebrow">Week ${L.week} · Day ${day} · ${L.phase} · ~${L.minutes} min</span><h1 class="prose" style="font:600 28px/1.2 var(--prose)">${esc(L.title)}</h1></div>
    <section class="block" id="b-objectives"><span class="eyebrow">What you'll be able to do</span><ul class="prose" style="margin:0;padding-left:20px">${L.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul></section>
    <section class="block" id="b-idea"><span class="eyebrow">${BLOCK_LABEL['The Idea']}</span><div class="prose termable">${L.html['The Idea']}</div></section>
    <section class="block" id="b-worked"><span class="eyebrow">Worked example</span><div class="prose small steps termable">${stepify(worked)}</div></section>
    <section class="block" id="b-formula"><span class="eyebrow">Formula card</span><div class="formula">${L.html['Formula Card']}</div></section>
    <section class="block" id="b-traps"><span class="eyebrow">Exam traps</span><div class="prose small termable">${L.html['Exam Traps']}</div></section>
    <section class="block" id="b-check"><span class="eyebrow">Check questions <span class="mono" style="text-transform:none;letter-spacing:0">· ${checksDone} of ${L.check.length}</span></span><div class="stack" style="gap:24px">${L.check.map((qid, i) => checkQ(day, qid, i)).join('')}</div></section>
    <section class="block" id="b-applied"><span class="eyebrow">Applied task</span><div class="stack" style="gap:10px"><div class="prose small">${L.html['Applied Task']}</div><textarea id="applied" placeholder="Write here. Saved on this device." oninput="saveApplied(${day},this.value)">${esc(st.applied)}</textarea><div class="wrap"><button class="secondary sm" onclick="copyApplied(${day})">Copy for coach</button></div></div></section>
    <div class="row" style="border-top:1px solid var(--rule);padding-top:20px;flex-wrap:wrap"><span class="caption">${cs ? `Check questions ${cs.ok} of ${cs.total} correct · ` : ''}${nxt ? `Next: ${esc(nxt.title)}` : 'Last lesson'}</span>${st.complete ? `<span class="green" style="font-weight:500">Completed ${fmtDate(st.complete)}</span>${nxt ? `<button class="primary" onclick="location.hash='#lesson/${nxt.day}'">Next lesson</button>` : ''}` : `<button class="primary" onclick="completeLesson(${day})">Mark complete</button>`}</div>
  </article>`;
};
function stepify(html) {
  // Turn an <ol> of steps into collapsible details; leave other content as is.
  const m = html.match(/<ol>([\s\S]*?)<\/ol>/);
  if (!m) return html;
  const items = []; const re = /<li>([\s\S]*?)<\/li>(?=\s*<li>|\s*$)/g; let x;
  while ((x = re.exec(m[1]))) items.push(x[1]);
  if (items.length < 2) return html;
  const det = items.map((it, i) => { const first = it.match(/^([\s\S]*?)(<br\s*\/?>|<\/p>|<p>|$)/); let title = it.replace(/<[^>]+>/g, ' ').trim().split(/\.\s|\n/)[0]; if (title.length > 90) title = title.slice(0, 87) + '…'; return `<details ${i === 0 ? 'open' : ''}><summary><span><span class="mono caption" style="margin-right:10px">${i + 1}</span>${esc(title)}</span></summary><div class="body">${it}</div></details>`; }).join('');
  return html.replace(m[0], det);
}
function checkQ(day, qid, i) {
  const q = Q[qid]; if (!q) return `<div class="caption">Question ${qid} missing</div>`;
  const st = lessonState(day).checks[qid];
  const opts = q.options_html.map((o, k) => { let cls = 'opt'; if (st) { if (k === q.answer) cls += ' right'; else if (k === st.a) cls += ' wrong'; else cls += ' dim'; } return `<button class="${cls}" ${st ? 'disabled' : ''} onclick="answerCheck(${day},'${qid}',${k})"><span class="k">${LET[k]}</span><span>${o}</span></button>`; }).join('');
  let fb = '';
  if (st) fb = st.ok ? `<div class="expl"><p class="feedback green" style="font-weight:500">Correct.</p>${q.explanation_html}</div>` : `<div class="expl"><p class="feedback amber" style="font-weight:500">Not quite. ${q.distractor_html[st.a] || ''}</p>${q.explanation_html}</div>`;
  return `<div class="checkq"><div class="q"><span class="mono caption">${i + 1} </span>${q.stem_html.replace(/^<p>|<\/p>$/g, '')}</div><div class="opts">${opts}</div>${fb}</div>`;
}
window.answerCheck = (day, qid, k) => { const q = Q[qid]; const ok = k === q.answer; lessonState(day).checks[qid] = { a: k, ok }; recordAnswer(qid, ok, 'check'); save(); render(); document.getElementById('b-check').scrollIntoView({ block: 'nearest' }); };
window.saveApplied = (day, v) => { lessonState(day).applied = v; save(); };
window.copyApplied = day => { const L = LESSONS[day]; const st = lessonState(day); const cs = checkScore(day); copy(`Tollgate · Week ${L.week} Day ${day} · ${L.title}\nApplied task response:\n${st.applied || '(empty)'}\n\nCheck questions: ${cs ? cs.ok + '/' + cs.total : 'not attempted'}${cs && cs.ok < cs.total ? '\nWrong: ' + L.check.filter(q => st.checks[q] && !st.checks[q].ok).join(', ') : ''}`); };
window.completeLesson = day => { lessonState(day).complete = Date.now(); save(); render(); toast('Lesson marked complete'); };
window.toggleProse = () => { S.settings.prose = S.settings.prose === 'sans' ? 'serif' : 'sans'; save(); applySettings(); };
function applySettings() { document.documentElement.dataset.prose = S.settings.prose || 'serif'; if (S.settings.theme) document.documentElement.dataset.theme = S.settings.theme; else delete document.documentElement.dataset.theme; }

// glossary term linking (first occurrence per lesson block)
const TERM_RE = GLOSS.length ? new RegExp('\\b(' + GLOSS.flatMap(g => [g.term, ...(g.aliases || [])]).filter(t => t.length > 2).sort((a, b) => b.length - a.length).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\b', 'i') : null;
const TERM_LOOKUP = {}; GLOSS.forEach(g => { TERM_LOOKUP[g.term.toLowerCase()] = g; (g.aliases || []).forEach(a => TERM_LOOKUP[a.toLowerCase()] = g); });
function bindTerms() {
  if (!TERM_RE) return;
  document.querySelectorAll('.termable').forEach(box => {
    const seen = new Set();
    const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT, { acceptNode: n => (n.parentElement.closest('code,pre,a,.term,table') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const n of nodes) {
      let text = n.nodeValue; const m = TERM_RE.exec(text); if (!m) continue;
      const g = TERM_LOOKUP[m[1].toLowerCase()]; if (!g || seen.has(g.term)) continue; seen.add(g.term);
      const span = document.createElement('span'); span.className = 'term'; span.textContent = m[1]; span.dataset.term = g.term; span.tabIndex = 0;
      const after = document.createTextNode(text.slice(m.index + m[1].length)); n.nodeValue = text.slice(0, m.index);
      n.parentNode.insertBefore(span, n.nextSibling); n.parentNode.insertBefore(after, span.nextSibling);
    }
  });
}
document.addEventListener('click', e => { const t = e.target.closest('.term'); if (!t) return; const g = TERM_LOOKUP[t.dataset.term.toLowerCase()]; const existing = t.parentElement.querySelector('.termpop'); document.querySelectorAll('.termpop').forEach(p => p.remove()); if (existing) return; const pop = document.createElement('div'); pop.className = 'termpop'; pop.innerHTML = `<span style="font-weight:500">${esc(g.term)}</span><span>${g.definition_html.replace(/<\/?p>/g, '')}</span><a href="#glossary/${encodeURIComponent(g.term)}" style="font-size:13px;text-decoration:none">Open in glossary</a>`; t.parentElement.insertAdjacentElement('afterend', pop); });
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList.contains('term')) e.target.click(); });

// ---------- GLOSSARY ----------
routes.glossary = (term) => {
  const q = term ? decodeURIComponent(term) : '';
  return `<div class="row"><h2 class="page">Glossary</h2><span class="mono caption">${GLOSS.length} terms</span></div>
  <input class="sans" id="gsearch" placeholder="Search terms and definitions" value="${esc(q)}" oninput="filterGloss(this.value)">
  <div class="wrap mono caption" id="gletters">${[...new Set(GLOSS.map(g => g.term[0].toUpperCase()))].map(l => `<a href="#" onclick="jumpLetter('${l}');return false" style="text-decoration:none">${l}</a>`).join('')}</div>
  <div class="list" id="glist">${glossRows(q)}</div>`;
};
function glossRows(q) { q = (q || '').toLowerCase(); const rows = GLOSS.filter(g => !q || g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q) || (g.aliases || []).some(a => a.toLowerCase().includes(q))); return rows.length ? rows.map(g => `<div id="g-${esc(g.term[0].toUpperCase())}" style="flex-direction:column;align-items:stretch;gap:3px;padding:12px 0"><div class="row"><span style="font-weight:500;font-size:15px">${esc(g.term)}${g.aliases && g.aliases.length ? ` <span class="caption">· ${esc(g.aliases.join(', '))}</span>` : ''}</span><a href="#lesson/${g.lesson_day}" class="mono" style="font-size:12px;text-decoration:none;white-space:nowrap">${lessonLabel(g.lesson_day)}</a></div><span class="small muted">${g.definition_html.replace(/<\/?p>/g, '')}</span></div>`).join('') : '<div class="caption" style="padding:12px 0">No matches.</div>'; }
window.filterGloss = v => { $('#glist').innerHTML = glossRows(v); };
window.jumpLetter = l => { const el = document.getElementById('g-' + l); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

// ---------- TOOLS (mobile hub) ----------
routes.tools = () => `<h2 class="page">Tools</h2><div class="list"><a href="#glossary"><span>Glossary</span><span class="caption mono">${GLOSS.length} terms</span></a><a href="#calc"><span>Calculators</span><span class="caption">6</span></a><a href="#settings"><span>Settings</span><span class="caption">Theme, typeface, data</span></a></div>`;
routes.settings = () => `<h2 class="page">Settings</h2>
<div class="stack"><span class="eyebrow">Theme</span><div class="seg"><button class="${!S.settings.theme ? 'on' : ''}" onclick="setTheme('')">Auto</button><button class="${S.settings.theme === 'light' ? 'on' : ''}" onclick="setTheme('light')">Light</button><button class="${S.settings.theme === 'dark' ? 'on' : ''}" onclick="setTheme('dark')">Dark</button></div></div>
<div class="stack"><span class="eyebrow">Lesson typeface</span><div class="seg"><button class="${(S.settings.prose || 'serif') === 'serif' ? 'on' : ''}" onclick="setProse('serif')">Serif</button><button class="${S.settings.prose === 'sans' ? 'on' : ''}" onclick="setProse('sans')">Sans</button></div></div>
<div class="stack"><span class="eyebrow">Course start date</span><input type="date" value="${S.start}" onchange="S.start=this.value;save();render()"><span class="caption">Used for the exam countdown. Day 1 is this date.</span></div>
<div class="stack"><span class="eyebrow">Data</span><div class="wrap"><button class="secondary" onclick="exportProgress()">Export progress</button><button class="secondary" onclick="importProgress()">Import</button><button class="warn" onclick="resetAll()">Reset everything</button></div><span class="caption">Progress is stored in this browser only. Export a file to move it to another device.</span></div>
<div class="caption">Tollgate · content built ${D.built} · ${D.questions.length} questions · ${D.lessons.length} lessons</div>`;
window.setTheme = t => { if (t) S.settings.theme = t; else delete S.settings.theme; save(); applySettings(); render(); };
window.setProse = p => { S.settings.prose = p; save(); applySettings(); render(); };
window.resetAll = () => { if (confirm('Delete all progress on this device? This cannot be undone.')) { try { localStorage.removeItem(KEY); } catch (e) { } S = load(); render(); } };
window.exportProgress = () => { const blob = new Blob([JSON.stringify(S)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `tollgate-progress-${today()}.json`; document.body.appendChild(a); a.click(); a.remove(); };
window.importProgress = () => { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'application/json'; inp.onchange = () => { const f = inp.files[0]; if (!f) return; f.text().then(t => { try { const s = JSON.parse(t); if (!s.lessons || !s.answers) throw 0; S = Object.assign(load(), s); save(); render(); toast('Progress imported'); } catch (e) { toast('That file is not a Tollgate export'); } }); }; inp.click(); };

// ---------- CALCULATORS ----------
// Normal distribution helpers (Abramowitz–Stegun erf; inverse via Acklam). Tested against scipy fixtures.
function normCdf(z) { // Hart (1968) / West (2005) double-precision algorithm
  const a = Math.abs(z); let c;
  if (a > 37) c = 0;
  else { const e = Math.exp(-a * a / 2);
    if (a < 7.07106781186547) { let b = 3.52624965998911e-02 * a + 0.700383064443688; b = b * a + 6.37396220353165; b = b * a + 33.912866078383; b = b * a + 112.079291497871; b = b * a + 221.213596169931; b = b * a + 220.206867912376; c = e * b; b = 8.83883476483184e-02 * a + 1.75566716318264; b = b * a + 16.064177579207; b = b * a + 86.7807322029461; b = b * a + 296.564248779674; b = b * a + 637.333633378831; b = b * a + 793.826512519948; b = b * a + 440.413735824752; c = c / b; }
    else { let b = a + 0.65; b = a + 4 / b; b = a + 3 / b; b = a + 2 / b; b = a + 1 / b; c = e / b / 2.506628274631; } }
  return z > 0 ? 1 - c : c;
}
function erf(x) { return 2 * normCdf(x * Math.SQRT2) - 1; }
function normInv(p) {
  if (p <= 0) return -Infinity; if (p >= 1) return Infinity;
  const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
  const pl = 0.02425, ph = 1 - pl; let q, r, x;
  if (p < pl) { q = Math.sqrt(-2 * Math.log(p)); x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  else if (p <= ph) { q = p - 0.5; r = q * q; x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1); }
  else { q = Math.sqrt(-2 * Math.log(1 - p)); x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  for (let i = 0; i < 3; i++) { const e = normCdf(x) - p; const u = e * Math.sqrt(2 * Math.PI) * Math.exp(x * x / 2); x = x - u / (1 + x * u / 2); }
  return x;
}
window.TG = { normCdf, normInv, erf }; // exposed for tests
const nf = (v, d = 2) => (isFinite(v) ? v.toLocaleString('en-AU', { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/,/g, ' ') : '—');
const CALCS = {
  dpmo: { name: 'DPU, DPMO, yield, RTY', inputs: [['units', 'Units inspected', 1200], ['opps', 'Opportunities per unit', 5], ['defects', 'Defects found', 42], ['steps', 'Step yields for RTY (optional, comma separated %)', '98, 95, 99']],
    formula: ['DPU  = D ÷ U', 'DPO  = D ÷ (U × O)', 'DPMO = DPO × 1 000 000', 'FTY  = 1 − DPO (or good units ÷ units)', 'RTY  = Y₁ × Y₂ × … × Yₙ'],
    run: v => { const U = +v.units, O = +v.opps, Dd = +v.defects; if (!(U > 0 && O > 0 && Dd >= 0)) return { error: 'Units and opportunities must be greater than 0.' }; const dpu = Dd / U, dpo = Dd / (U * O), dpmo = dpo * 1e6, y = 1 - dpo; const ys = String(v.steps || '').split(',').map(s => parseFloat(s)).filter(x => !isNaN(x)); const rty = ys.length ? ys.reduce((a, b) => a * (b > 1 ? b / 100 : b), 1) : null; return { results: [['DPU', nf(dpu, 4)], ['DPMO', nf(dpmo, 0)], ['Yield', nf(y * 100, 2) + '%'], ['RTY', rty == null ? '—' : nf(rty * 100, 2) + '%']], working: [`DPU  = ${Dd} ÷ ${U} = ${nf(dpu, 4)}`, `DPO  = ${Dd} ÷ (${U} × ${O}) = ${nf(dpo, 5)}`, `DPMO = ${nf(dpo, 5)} × 1 000 000 = ${nf(dpmo, 0)}`, `Yield = 1 − ${nf(dpo, 5)} = ${nf(y, 4)} (${nf(y * 100, 2)}%)`].concat(rty == null ? [] : [`RTY  = ${ys.map(x => (x > 1 ? x / 100 : x).toFixed(2)).join(' × ')} = ${nf(rty, 4)} (${nf(rty * 100, 2)}%)`]) }; } },
  sigma: { name: 'Sigma level', inputs: [['units', 'Units', 1200], ['opps', 'Opportunities per unit', 5], ['defects', 'Defects', 42]],
    formula: ['DPO  = D ÷ (U × O)', 'Z_lt = Φ⁻¹(1 − DPO)', 'Z_st = Z_lt + 1.5'],
    run: v => { const U = +v.units, O = +v.opps, Dd = +v.defects; if (!(U > 0 && O > 0 && Dd >= 0)) return { error: 'Units and opportunities must be greater than 0.' }; const dpo = Dd / (U * O); if (dpo >= 1) return { error: 'Defects cannot exceed opportunities.' }; const y = 1 - dpo; const zlt = normInv(y), zst = zlt + 1.5; return { results: [['DPMO', nf(dpo * 1e6, 0)], ['Yield', nf(y * 100, 2) + '%'], ['Sigma, short term', nf(zst, 2), 'with 1.5 shift', true], ['Sigma, long term', nf(zlt, 2), 'no shift']], working: [`DPU  = ${Dd} ÷ ${U} = ${nf(Dd / U, 4)}`, `DPO  = ${Dd} ÷ (${U} × ${O}) = ${nf(dpo, 5)}`, `DPMO = ${nf(dpo, 5)} × 1 000 000 = ${nf(dpo * 1e6, 0)}`, `Yield = 1 − ${nf(dpo, 5)} = ${nf(y, 5)}`, `Z_lt = Φ⁻¹(${nf(y, 5)}) = ${nf(zlt, 2)}`, `Z_st = ${nf(zlt, 2)} + 1.5 = ${nf(zst, 2)}`], note: "Published sigma tables list short-term values, so the 1.5 shift is already included. Say which one you're quoting." }; } },
  cap: { name: 'Cp, Cpk, Pp, Ppk', inputs: [['usl', 'Upper specification limit (USL)', 10.4], ['lsl', 'Lower specification limit (LSL, blank if none)', 9.6], ['mean', 'Process mean', 10.1], ['sst', 'Short-term standard deviation (within)', 0.1], ['slt', 'Long-term standard deviation (overall, optional)', 0.12]],
    formula: ['Cp  = (USL − LSL) ÷ 6σ_within', 'Cpk = min(USL − x̄, x̄ − LSL) ÷ 3σ_within', 'Pp  = (USL − LSL) ÷ 6σ_overall', 'Ppk = min(USL − x̄, x̄ − LSL) ÷ 3σ_overall'],
    run: v => { const U = parseFloat(v.usl), Lo = parseFloat(v.lsl), m = +v.mean, s = +v.sst, sl = parseFloat(v.slt); if (!(s > 0) || isNaN(m)) return { error: 'Mean and a positive short-term standard deviation are required.' }; const hasU = !isNaN(U), hasL = !isNaN(Lo); if (!hasU && !hasL) return { error: 'Enter at least one specification limit.' }; const cpu = hasU ? (U - m) / (3 * s) : null, cpl = hasL ? (m - Lo) / (3 * s) : null; const cpk = Math.min(...[cpu, cpl].filter(x => x != null)); const cp = hasU && hasL ? (U - Lo) / (6 * s) : null; const w = []; if (cp != null) w.push(`Cp  = (${U} − ${Lo}) ÷ (6 × ${s}) = ${nf(cp, 2)}`); if (cpu != null) w.push(`Cpu = (${U} − ${m}) ÷ (3 × ${s}) = ${nf(cpu, 2)}`); if (cpl != null) w.push(`Cpl = (${m} − ${Lo}) ÷ (3 × ${s}) = ${nf(cpl, 2)}`); w.push(`Cpk = min(${[cpu, cpl].filter(x => x != null).map(x => nf(x, 2)).join(', ')}) = ${nf(cpk, 2)}`); const res = [['Cp', cp == null ? '—' : nf(cp, 2)], ['Cpk', nf(cpk, 2), '', true]]; if (sl > 0) { const pp = hasU && hasL ? (U - Lo) / (6 * sl) : null; const ppk = Math.min(...[hasU ? (U - m) / (3 * sl) : null, hasL ? (m - Lo) / (3 * sl) : null].filter(x => x != null)); res.push(['Pp', pp == null ? '—' : nf(pp, 2)], ['Ppk', nf(ppk, 2)]); if (pp != null) w.push(`Pp  = (${U} − ${Lo}) ÷ (6 × ${sl}) = ${nf(pp, 2)}`); w.push(`Ppk = min(...) ÷ (3 × ${sl}) = ${nf(ppk, 2)}`); } const z = cpk * 3; w.push(`Z (nearest limit) = 3 × Cpk = ${nf(z, 2)}; expected fraction beyond that limit ≈ ${nf((1 - normCdf(z)) * 1e6, 0)} PPM`); return { results: res, working: w, note: cp != null && Math.abs(cp - cpk) > 0.05 ? 'Cp is higher than Cpk, so the process is off-centre. Centring alone would lift Cpk towards Cp.' : '' }; } },
  nmean: { name: 'Sample size: mean', inputs: [['conf', 'Confidence level %', 95], ['sd', 'Standard deviation estimate', 2.5], ['err', 'Margin of error (±)', 0.5]],
    formula: ['n = (z × σ ÷ E)²', 'z = 1.645 (90%) · 1.960 (95%) · 2.576 (99%)'],
    run: v => { const c = +v.conf / 100, s = +v.sd, E = +v.err; if (!(c > 0 && c < 1 && s > 0 && E > 0)) return { error: 'Confidence between 0 and 100, positive σ and E.' }; const z = normInv(1 - (1 - c) / 2); const n = Math.pow(z * s / E, 2); return { results: [['z', nf(z, 3)], ['n (round up)', String(Math.ceil(n)), '', true]], working: [`z for ${v.conf}% two-sided = Φ⁻¹(${nf(1 - (1 - c) / 2, 4)}) = ${nf(z, 3)}`, `n = (${nf(z, 3)} × ${s} ÷ ${E})² = ${nf(n, 2)} → ${Math.ceil(n)}`], note: 'Always round up. If σ is unknown, use a pilot sample or the range ÷ 4 as a rough estimate.' }; } },
  nprop: { name: 'Sample size: proportion', inputs: [['conf', 'Confidence level %', 95], ['p', 'Expected proportion (0.5 if unknown)', 0.5], ['err', 'Margin of error (±, as a proportion)', 0.05]],
    formula: ['n = z² × p(1 − p) ÷ E²'],
    run: v => { const c = +v.conf / 100, p = +v.p, E = +v.err; if (!(c > 0 && c < 1 && p > 0 && p < 1 && E > 0)) return { error: 'Confidence between 0 and 100, p between 0 and 1, positive E.' }; const z = normInv(1 - (1 - c) / 2); const n = z * z * p * (1 - p) / (E * E); return { results: [['z', nf(z, 3)], ['n (round up)', String(Math.ceil(n)), '', true]], working: [`z = ${nf(z, 3)}`, `n = ${nf(z, 3)}² × ${p} × ${nf(1 - p, 2)} ÷ ${E}² = ${nf(n, 1)} → ${Math.ceil(n)}`], note: 'p = 0.5 gives the largest, safest sample size.' }; } },
  z: { name: 'Z-score and normal probability', inputs: [['x', 'Value x', 12.5], ['mu', 'Mean μ', 10], ['sigma', 'Standard deviation σ', 2]],
    formula: ['z = (x − μ) ÷ σ', 'P(X < x) = Φ(z)', 'P(X > x) = 1 − Φ(z)'],
    run: v => { const x = +v.x, mu = +v.mu, s = +v.sigma; if (!(s > 0)) return { error: 'σ must be greater than 0.' }; const z = (x - mu) / s, p = normCdf(z); return { results: [['z', nf(z, 3), '', true], ['P(X < x)', nf(p, 4)], ['P(X > x)', nf(1 - p, 4)], ['Beyond ±|z|', nf(2 * (1 - normCdf(Math.abs(z))), 4)]], working: [`z = (${x} − ${mu}) ÷ ${s} = ${nf(z, 3)}`, `Φ(${nf(z, 3)}) = ${nf(p, 4)}`, `1 − Φ = ${nf(1 - p, 4)}`], note: 'In the exam, look up |z| in the table and subtract from 1 for the upper tail.' }; } }
};
const calcVals = {};
routes.calc = (which) => {
  const keys = Object.keys(CALCS);
  if (!which) return `<h2 class="page">Calculators</h2><div class="list">${keys.map(k => `<a href="#calc/${k}"><span>${CALCS[k].name}</span><span class="muted">›</span></a>`).join('')}<span class="caption" style="min-height:auto;border:0;padding-top:12px">Each shows the formula and working, not just the result. Use them to check your own arithmetic, then practise without them.</span></div>`;
  const C = CALCS[which]; if (!C) return routes.calc();
  const vals = calcVals[which] || Object.fromEntries(C.inputs.map(([k, , d]) => [k, d]));
  calcVals[which] = vals;
  const out = C.run(vals);
  return `<div class="row" style="border-bottom:1px solid var(--rule);padding-bottom:12px"><a href="#calc" style="text-decoration:none;color:var(--ink2);font-size:14px">← Calculators</a><span style="font-weight:500">${C.name}</span><span style="width:60px"></span></div>
  <div style="display:grid;gap:32px" class="calcgrid">
   <div class="stack" style="gap:16px"><span class="eyebrow">Inputs</span><div class="grid2">${C.inputs.map(([k, label, d]) => `<label class="stack" style="gap:4px;font-size:13px;color:var(--ink2)${label.length > 40 ? ';grid-column:1/-1' : ''}">${label}<input value="${esc(vals[k])}" oninput="calcIn('${which}','${k}',this.value)"></label>`).join('')}</div>
   <div class="formula"><span class="eyebrow" style="display:block;margin-bottom:4px">Formula</span>${C.formula.map(f => `<div>${esc(f)}</div>`).join('')}</div></div>
   <div class="stack" style="gap:24px" id="calcout">${calcOut(out)}</div></div>`;
};
function calcOut(out) { if (out.error) return `<span class="amber">${esc(out.error)}</span>`; return `<div class="grid2" style="border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:16px 0">${out.results.map(([l, v, sub, hi]) => `<div class="stack" style="gap:2px"><span class="eyebrow">${l}</span><span class="mono" style="font-weight:500;font-size:28px;line-height:1.1${hi ? ';color:var(--green)' : ''}">${v}</span>${sub ? `<span class="caption" style="font-size:12px">${sub}</span>` : ''}</div>`).join('')}</div><div class="stack" style="gap:6px"><span class="eyebrow">Working</span><div class="mono" style="font-size:13px;line-height:1.8">${out.working.map(w => `<div>${esc(w)}</div>`).join('')}</div></div>${out.note ? `<p class="caption" style="margin:0;max-width:520px">${esc(out.note)}</p>` : ''}`; }
window.calcIn = (which, k, v) => { calcVals[which][k] = v; $('#calcout').innerHTML = calcOut(CALCS[which].run(calcVals[which])); };

// ---------- PRACTICE ----------
const drillOpts = { phase: null, section: '', n: 20 };
routes.practice = () => {
  const due = revisitDue(), all = revisitAll();
  const bySec = {}; all.forEach(q => { const s = Q[q].section; bySec[s] = (bySec[s] || 0) + 1; });
  const last = S.mocks[S.mocks.length - 1];
  const phaseCounts = Object.fromEntries(PHASES.map(p => [p, D.questions.filter(q => q.phase === p).length]));
  const canFull = PHASES.every(p => phaseCounts[p] >= 20), canHalf = PHASES.every(p => phaseCounts[p] >= 10);
  const active = S.active && !S.active.finished;
  return `<h2 class="page">Practice</h2>
  ${active ? `<div class="card" style="border-color:var(--green)"><div class="row"><span style="font-weight:500">Mock in progress</span><span class="mono">${S.active.answers.filter(a => a != null).length}/${S.active.order.length}</span></div><button class="primary" onclick="location.hash='#mock'">Resume ${esc(S.active.label)}</button></div>` : ''}
  <div class="grid3">
   <div class="card"><div class="row"><span style="font-weight:500;font-size:18px">Revisit queue</span><span class="mono" style="font-weight:500;font-size:28px;line-height:1">${due.length}</span></div><span class="small muted">Questions you got wrong come back after 1, 3 and 7 days. Cleared after two correct answers on separate days.${all.length > due.length ? ` ${all.length - due.length} more not due yet.` : ''}</span>${Object.keys(bySec).length ? `<div class="stack" style="gap:6px;font-size:14px;color:var(--ink2)">${Object.entries(bySec).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([s, n]) => `<div class="row"><span>${s} ${esc(SEC[s].title)}</span><span class="mono">${n}</span></div>`).join('')}</div>` : ''}<button class="primary" style="margin-top:auto" ${due.length ? '' : 'disabled'} onclick="location.hash='#drill/revisit'">Start revisit</button>${!due.length && all.length ? `<button class="secondary" onclick="location.hash='#drill/revisitall'">Practise all ${all.length} anyway</button>` : ''}</div>
   <div class="card"><span style="font-weight:500;font-size:18px">Drill</span><span class="eyebrow">By phase</span><div class="seg">${PHASES.map(p => `<button class="${drillOpts.phase === p ? 'on' : ''}" onclick="drillSet('phase','${p}')" title="${p} · ${phaseCounts[p]} questions">${p[0]}</button>`).join('')}</div><span class="eyebrow">Or by BoK section</span><select class="sans" onchange="drillSet('section',this.value)"><option value="">Any section${drillOpts.phase ? ' in ' + drillOpts.phase : ''}</option>${Object.values(SEC).filter(s => !drillOpts.phase || s.phase === drillOpts.phase).map(s => `<option value="${s.id}" ${drillOpts.section === s.id ? 'selected' : ''}>${s.id} ${esc(s.title)} (${D.questions.filter(q => q.section === s.id).length})</option>`).join('')}</select><span class="eyebrow">Questions</span><div class="seg">${[10, 20, 30].map(n => `<button class="${drillOpts.n === n ? 'on' : ''}" onclick="drillSet('n',${n})">${n}</button>`).join('')}</div><button class="secondary" style="margin-top:auto" onclick="startDrill()">Start drill</button></div>
   <div class="card"><span style="font-weight:500;font-size:18px">Timed mock</span>
    <button class="opt" style="min-height:56px" ${canHalf ? '' : 'disabled'} onclick="startMock(50)"><span style="display:flex;flex-direction:column;flex:1"><span>Half mock</span><span class="mono caption">50 q · 90 min</span></span><span class="green" style="font-weight:500">Start</span></button>
    <button class="opt" style="min-height:56px" ${canFull ? '' : 'disabled'} onclick="startMock(100)"><span style="display:flex;flex-direction:column;flex:1"><span>Full mock</span><span class="mono caption">100 q · 180 min</span></span><span class="green" style="font-weight:500">Start</span></button>
    ${!canFull ? `<button class="opt" style="min-height:56px" onclick="startMock(50,null,true)"><span style="display:flex;flex-direction:column;flex:1"><span>Partial mock</span><span class="mono caption">50 q · 90 min · phases with content only</span></span><span class="green" style="font-weight:500">Start</span></button><span class="caption">Full mocks unlock when every phase has 20+ questions in the bank.</span>` : ''}
    <span class="small muted">No feedback until you submit. Calculator and reference sheet are available, as in the exam. Pace is 1.8 min per question.</span>
    ${last ? `<div class="stack" style="gap:6px;margin-top:auto"><span class="eyebrow">Last mock</span><div class="row small"><span>${esc(last.label)} · ${fmtDate(last.finished)}</span><span class="mono${scoreColor(last.pct)}" style="font-weight:500">${last.pct}%</span></div></div>` : ''}
    ${S.mocks.length ? `<a href="#history" style="font-size:14px;text-decoration:none">All ${S.mocks.length} attempts</a>` : ''}</div>
  </div>`;
};
window.drillSet = (k, v) => { if (k === 'phase') { drillOpts.phase = drillOpts.phase === v ? null : v; drillOpts.section = ''; } else drillOpts[k] = v; render(); };

// ---------- DRILL (untimed, instant feedback) ----------
let drill = null; // {ids, i, answers:{}, title}
window.startDrill = () => {
  let pool = D.questions.filter(q => (!drillOpts.phase || q.phase === drillOpts.phase) && (!drillOpts.section || q.section === drillOpts.section));
  if (!pool.length) { toast('No questions in that selection yet'); return; }
  // prefer least-recently-seen
  const seen = {}; S.answers.forEach(a => seen[a.q] = a.t);
  pool = shuffle(pool).sort((a, b) => (seen[a.id] || 0) - (seen[b.id] || 0));
  const ids = pool.slice(0, drillOpts.n).map(q => q.id);
  drill = { ids: shuffle(ids), i: 0, answers: {}, title: drillOpts.section ? `${drillOpts.section} ${SEC[drillOpts.section].title}` : drillOpts.phase ? `${drillOpts.phase} drill` : 'Mixed drill', mode: 'drill' };
  go('#drill/run');
};
routes.drill = (what) => {
  if (what === 'revisit' || what === 'revisitall') { const ids = what === 'revisit' ? revisitDue() : revisitAll(); if (!ids.length) return routes.practice(); drill = { ids: shuffle(ids), i: 0, answers: {}, title: 'Revisit queue', mode: 'revisit' }; go('#drill/run'); return ''; }
  if (!drill) { location.hash = '#practice'; return ''; }
  const n = drill.ids.length;
  if (drill.i >= n) { // summary
    const ok = Object.values(drill.answers).filter(a => a.ok).length; const p = pct(ok, n);
    const wrong = drill.ids.filter(q => drill.answers[q] && !drill.answers[q].ok);
    return `<span class="eyebrow">${esc(drill.title)} · ${n} questions</span><div style="display:flex;align-items:baseline;gap:12px"><span class="huge">${p}%</span><span style="font-weight:500;font-size:18px" class="${p >= PASS ? 'green' : 'amber'}">${p >= PASS ? 'Above the line' : 'Below the line'}</span></div>${bar(p, { size: 'big', label: true })}<span class="caption" style="padding-top:8px">${ok} of ${n} correct${wrong.length ? ` · ${wrong.length} added to the revisit queue` : ''}</span>
    <div class="wrap"><button class="primary" onclick="location.hash='#practice'">Back to practice</button><button class="secondary" onclick="copy(drillSummary())">Copy for coach</button></div>`;
  }
  const qid = drill.ids[drill.i], q = Q[qid], st = drill.answers[qid];
  return `<div class="row" style="border-bottom:1px solid var(--rule);padding-bottom:12px"><a href="#practice" style="text-decoration:none;color:var(--ink2);font-size:14px" onclick="return confirmLeave()">← Practice</a><span class="mono caption">${esc(drill.title)} · ${drill.i + 1} of ${n}</span><span></span></div>
  <div class="stack" style="gap:16px;max-width:760px"><span class="mono caption">${q.section} ${esc(SEC[q.section].title)} · ${q.type}</span><div class="prose" style="font:16px/1.5 var(--sans)">${q.stem_html}</div>
  <div class="stack" style="gap:8px">${q.options_html.map((o, k) => { let cls = 'opt'; if (st) { if (k === q.answer) cls += ' right'; else if (k === st.a) cls += ' wrong'; else cls += ' dim'; } return `<button class="${cls}" ${st ? 'disabled' : ''} onclick="answerDrill(${k})"><span class="k">${LET[k]}</span><span>${o}</span></button>`; }).join('')}</div>
  ${st ? `<div class="stack" style="gap:10px"><div class="stack" style="gap:4px"><span class="eyebrow green">Why ${LET[q.answer]} is right</span><div class="expl">${q.explanation_html}</div></div>${st.ok ? '' : `<div class="stack" style="gap:4px"><span class="eyebrow amber">Why ${LET[st.a]} was wrong</span><div class="expl">${q.distractor_html[st.a] || ''}</div></div>`}<a href="#lesson/${q.lesson_day}" style="font-size:14px;text-decoration:none">Lesson · ${lessonLabel(q.lesson_day)}${LESSONS[q.lesson_day] ? ' · ' + esc(LESSONS[q.lesson_day].title) : ''}</a><button class="ink" onclick="drill.i++;render()">${drill.i + 1 < n ? 'Next' : 'Finish'}</button></div>` : '<span class="caption">Tap an option. Keys 1–4 also work.</span>'}</div>`;
};
window.answerDrill = k => { const qid = drill.ids[drill.i]; const ok = k === Q[qid].answer; drill.answers[qid] = { a: k, ok }; recordAnswer(qid, ok, drill.mode); render(); };
window.confirmLeave = () => true;
window.drillSummary = () => { const n = drill.ids.length, ok = Object.values(drill.answers).filter(a => a.ok).length; return `Tollgate drill · ${drill.title} · ${today()}\nScore ${ok}/${n} (${pct(ok, n)}%)\nWrong: ${drill.ids.filter(q => drill.answers[q] && !drill.answers[q].ok).join(', ') || 'none'}`; };

// ---------- MOCK ----------
function sampleMock(size, partial) {
  const perPhase = size / 5;
  const recent = new Set(S.mocks.slice(-2).flatMap(m => m.order));
  const phases = partial ? PHASES.filter(p => D.questions.some(q => q.phase === p)) : PHASES;
  const per = partial ? Math.floor(size / phases.length) : perPhase;
  let out = [];
  for (const p of phases) {
    // weight across sections by bank size, avoid recent
    let pool = D.questions.filter(q => q.phase === p);
    let fresh = pool.filter(q => !recent.has(q.id));
    if (fresh.length >= per) pool = fresh;
    const bySec = {}; pool.forEach(q => (bySec[q.section] = bySec[q.section] || []).push(q));
    const secs = Object.keys(bySec); const pick = [];
    // round-robin across sections proportional to size
    const queues = Object.fromEntries(secs.map(s => [s, shuffle(bySec[s])]));
    const weights = secs.map(s => bySec[s].length); let total = weights.reduce((a, b) => a + b, 0);
    while (pick.length < per && total > 0) {
      let r = Math.random() * total, chosen = secs[0];
      for (let i = 0; i < secs.length; i++) { r -= queues[secs[i]].length; if (r <= 0) { chosen = secs[i]; break; } }
      if (!queues[chosen].length) { total = secs.reduce((a, s) => a + queues[s].length, 0); continue; }
      pick.push(queues[chosen].pop().id); total--;
    }
    out = out.concat(pick);
  }
  while (out.length < size && partial) { const rest = D.questions.filter(q => !out.includes(q.id)); if (!rest.length) break; out.push(rest[Math.floor(Math.random() * rest.length)].id); }
  return shuffle(out);
}
window.startMock = (size, day, partial) => {
  if (S.active && !S.active.finished) { if (!confirm('A mock is already in progress. Abandon it and start a new one?')) return; }
  const order = sampleMock(size, partial);
  if (partial ? order.length < 10 : order.length < size) { toast('Not enough questions in the bank yet for that mock'); return; }
  const minutes = Math.round(order.length * 1.8);
  const perm = order.map(() => shuffle([0, 1, 2, 3]));
  const n = S.mocks.length + 1;
  S.active = { id: 'm' + Date.now(), label: (partial ? 'Partial mock ' : size === 100 ? 'Full mock ' : 'Half mock ') + String.fromCharCode(64 + n), size: order.length, minutes, partial: !!partial, day: day || null, order, perm, answers: order.map(() => null), flags: [], i: 0, started: Date.now(), elapsed: 0, lastTick: Date.now(), finished: null };
  save(); go('#mock');
};
let tickT = null, overlay = null; // overlay: 'nav' | 'calc' | 'ref' | 'submit'
function mockRemaining() { const M = S.active; return M.minutes * 60 - M.elapsed; }
function tick() { const M = S.active; if (!M || M.finished) return; const now = Date.now(); M.elapsed += (now - M.lastTick) / 1000; M.lastTick = now; if (mockRemaining() <= 0) { finishMock(true); return; } const t = $('#timer'); if (t) { t.textContent = fmtTime(mockRemaining()); t.classList.toggle('pressure', paceDelta() < 0 || mockRemaining() < 600); } const p = $('#pace'); if (p) p.innerHTML = paceText(); if (Math.round(M.elapsed) % 15 === 0) save(); }
function paceDelta() { const M = S.active; const answered = M.answers.filter(a => a != null).length; const expected = answered * (M.minutes * 60 / M.size); return expected - M.elapsed; } // positive = ahead
function paceText() { const d = paceDelta(); const m = Math.round(Math.abs(d) / 60); return d >= 0 ? `<span class="green">Ahead by ${m} min</span>` : `<span class="amber">Behind by ${m} min</span>`; }
routes.mock = () => {
  const M = S.active;
  if (!M) { location.hash = '#practice'; return ''; }
  if (M.finished) { location.hash = '#results/' + (S.mocks.length - 1); return ''; }
  { const gap = (Date.now() - (M.lastTick || Date.now())) / 1000; if (gap > 0 && gap < 600) M.elapsed += gap; /* short gap (refresh): clock kept running; longer: paused */ M.lastTick = Date.now(); }
  clearInterval(tickT); tickT = setInterval(tick, 1000);
  const i = M.i, qid = M.order[i], q = Q[qid], perm = M.perm[i], sel = M.answers[i];
  const flagged = M.flags.includes(i);
  const answered = M.answers.filter(a => a != null).length;
  const cells = M.order.map((_, k) => `<button class="${M.answers[k] != null ? 'ans' : ''} ${M.flags.includes(k) ? 'flag' : ''} ${k === i ? 'cur' : ''}" onclick="mockGoto(${k})">${k + 1}</button>`).join('');
  const side = `<div class="side"><span class="eyebrow">Navigator</span><div class="navgrid">${cells}</div><div class="stack caption" style="gap:6px"><div class="row"><span>Answered</span><span class="mono">${answered}</span></div><div class="row"><span>Flagged</span><span class="mono amber">${M.flags.length}</span></div><div class="row"><span>Unanswered</span><span class="mono">${M.size - answered}</span></div></div><div class="stack" style="gap:8px;margin-top:auto"><button class="secondary sm" onclick="openOverlay('calc')">Calculator</button><button class="secondary sm" onclick="openOverlay('ref')">Reference sheet</button><button class="sm" style="border-color:var(--ink)" onclick="openOverlay('submit')">Submit mock</button></div></div>`;
  return `<div class="exam" data-mock>
   <div class="top"><span class="mono caption">${esc(M.label)} · <b style="color:var(--ink)">${i + 1}</b> of ${M.size}</span><span id="timer" class="timer ${paceDelta() < 0 ? 'pressure' : ''}">${fmtTime(mockRemaining())}</span><span class="caption" style="text-align:right">Pace 1.8 min/q · <span id="pace">${paceText()}</span></span></div>
   <div class="pace"><span>Pace 1.8 min/q</span><span id="pace2">${paceText()}</span></div>
   <div class="mid"><div class="body"><div class="stem">${q.stem_html}</div><div class="stack" style="gap:6px">${perm.map((orig, k) => `<button class="opt ${sel === orig ? 'sel' : ''}" onclick="mockAnswer(${orig})"><span class="k">${LET[k]}</span><span>${q.options_html[orig]}</span></button>`).join('')}</div>${flagged ? '<span class="pill amber" style="border-color:var(--amber);align-self:flex-start;padding:8px 12px">Flagged for review</span>' : ''}</div>${side}</div>
   <div class="tools"><button onclick="openOverlay('calc')">Calculator</button><button onclick="openOverlay('ref')">Reference sheet</button><button onclick="openOverlay('nav')">Navigator</button></div>
   <div class="foot"><button ${i === 0 ? 'disabled' : ''} onclick="mockGoto(${i - 1})">Previous</button><button class="warn ${flagged ? 'on' : ''}" onclick="mockFlag()">${flagged ? 'Unflag' : 'Flag'}</button><button class="ink" onclick="${i + 1 < M.size ? `mockGoto(${i + 1})` : "openOverlay('submit')"}">${i + 1 < M.size ? 'Next' : 'Finish'}</button></div>
   ${overlayHtml()}</div>`;
};
window.mockAnswer = orig => { S.active.answers[S.active.i] = orig; save(); render(); };
window.mockGoto = k => { S.active.i = Math.max(0, Math.min(S.active.size - 1, k)); overlay = null; save(); render(); };
window.mockFlag = () => { const M = S.active; const k = M.flags.indexOf(M.i); if (k >= 0) M.flags.splice(k, 1); else M.flags.push(M.i); save(); render(); };
window.openOverlay = o => { overlay = o; render(); };
window.closeOverlay = () => { overlay = null; render(); };
function overlayHtml() {
  if (!overlay) return '';
  const M = S.active; let inner = '';
  if (overlay === 'nav') { const answered = M.answers.filter(a => a != null).length; inner = `<div class="head"><span>Navigator</span><span class="timer" id="timer">${fmtTime(mockRemaining())}</span></div><div class="content"><div class="navgrid">${M.order.map((_, k) => `<button class="${M.answers[k] != null ? 'ans' : ''} ${M.flags.includes(k) ? 'flag' : ''} ${k === M.i ? 'cur' : ''}" onclick="mockGoto(${k})">${k + 1}</button>`).join('')}</div><div class="wrap caption" style="font-size:12px"><span><i style="display:inline-block;width:10px;height:10px;background:var(--ink);border-radius:2px;vertical-align:middle;margin-right:5px"></i>Answered</span><span><i style="display:inline-block;width:10px;height:10px;border:2px solid var(--amber);border-radius:2px;vertical-align:middle;margin-right:5px"></i>Flagged</span><span><i style="display:inline-block;width:10px;height:10px;border:2px solid var(--green);border-radius:2px;vertical-align:middle;margin-right:5px"></i>Current</span><span><i style="display:inline-block;width:10px;height:10px;border:1px solid var(--rule);border-radius:2px;vertical-align:middle;margin-right:5px"></i>Unanswered</span></div><div class="row small" style="border-top:1px solid var(--rule);padding-top:12px"><span>Answered <b class="mono">${answered}</b></span><span class="amber">Flagged <b class="mono">${M.flags.length}</b></span><span>Unanswered <b class="mono">${M.size - answered}</b></span></div><button style="border-color:var(--ink);margin-top:8px" onclick="openOverlay('submit')">Submit mock</button><button class="ghost" onclick="closeOverlay()">Back to question ${M.i + 1}</button></div>`; }
  else if (overlay === 'submit') { const answered = M.answers.filter(a => a != null).length; inner = `<div class="content" style="gap:16px;padding:24px 20px 28px"><span style="font:500 20px var(--sans)">Submit ${esc(M.label)}?</span><div class="stack" style="gap:6px"><div class="row"><span>Answered</span><span class="mono">${answered} of ${M.size}</span></div><div class="row ${M.size - answered ? 'amber' : ''}"><span>Unanswered</span><span class="mono">${M.size - answered}</span></div><div class="row"><span>Flagged</span><span class="mono">${M.flags.length}</span></div><div class="row"><span>Time remaining</span><span class="mono">${fmtTime(mockRemaining())}</span></div></div><span class="small muted">Unanswered questions are marked wrong. You can't return after submitting.</span><div class="stack" style="gap:8px"><button class="primary" style="height:48px" onclick="finishMock(false)">Submit</button><button class="secondary" style="height:48px" onclick="closeOverlay()">Go back</button></div></div>`; }
  else if (overlay === 'ref') inner = refSheet();
  else if (overlay === 'calc') inner = calcOverlay();
  return `<div class="sheet-bg" onclick="closeOverlay()"></div><div class="sheet" role="dialog">${inner}</div>`;
}
window.finishMock = (auto) => {
  const M = S.active; if (!M) return; clearInterval(tickT);
  M.finished = Date.now();
  const res = { id: M.id, label: M.label, size: M.size, minutes: M.minutes, partial: M.partial, day: M.day, order: M.order, answers: M.answers, flags: M.flags, started: M.started, finished: M.finished, timeUsed: Math.round(M.elapsed), auto: !!auto };
  let ok = 0; M.order.forEach((qid, k) => { const c = M.answers[k] === Q[qid].answer; if (c) ok++; recordAnswer(qid, c, 'mock'); });
  res.ok = ok; res.pct = pct(ok, M.size);
  S.mocks.push(res); S.active = null; overlay = null; save();
  location.hash = '#results/' + (S.mocks.length - 1);
  if (auto) toast('Time is up. The mock was submitted automatically.');
};
function refSheet(tab) {
  refTab = tab || refTab;
  const formulas = `<div class="ref"><div class="g"><span>Defects and yield</span><span>DPU = D ÷ U</span><span>DPO = D ÷ (U × O) · DPMO = DPO × 10⁶</span><span>FTY = good ÷ in · RTY = Y₁ × Y₂ × … × Yₙ</span></div><div class="g"><span>Sigma</span><span>Z_lt = Φ⁻¹(1 − DPO) · Z_st = Z_lt + 1.5</span></div><div class="g"><span>Descriptive</span><span>x̄ = Σx ÷ n · s = √(Σ(x − x̄)² ÷ (n − 1))</span><span>z = (x − μ) ÷ σ · SE = s ÷ √n</span></div><div class="g"><span>Capability</span><span>Cp = (USL − LSL) ÷ 6σ · Cpk = min(USL − x̄, x̄ − LSL) ÷ 3σ</span><span>Pp, Ppk: same with overall σ</span></div><div class="g"><span>Gage R&amp;R</span><span>GRR = √(EV² + AV²) · %GRR = GRR ÷ TV × 100</span><span>ndc = 1.41 × PV ÷ GRR</span></div><div class="g"><span>Sample size</span><span>n = (zσ ÷ E)² · n = z²p(1 − p) ÷ E²</span></div><div class="g"><span>Tests</span><span>t = (x̄ − μ) ÷ (s ÷ √n), df = n − 1</span><span>2-sample: t = (x̄₁ − x̄₂) ÷ √(s₁²/n₁ + s₂²/n₂)</span><span>χ² = Σ(O − E)² ÷ E · E = row × col ÷ N</span><span>F = MS_between ÷ MS_within</span></div><div class="g"><span>Regression</span><span>ŷ = b₀ + b₁x · r² = SSR ÷ SST</span></div><div class="g"><span>Control limits</span><span>I-MR: x̄ ± 2.66 M̄R · MR UCL = 3.267 M̄R</span><span>X̄-R: x̄̄ ± A₂R̄ · R: D₃R̄, D₄R̄</span><span>p: p̄ ± 3√(p̄(1 − p̄) ÷ n) · c: c̄ ± 3√c̄ · u: ū ± 3√(ū ÷ n)</span><span>n=2: A₂ 1.880, D₄ 3.267 · n=3: 1.023, 2.574 · n=4: 0.729, 2.282 · n=5: 0.577, 2.114</span></div><div class="g"><span>Critical values</span><span>z: 1.645 (90%) · 1.960 (95%) · 2.576 (99%)</span></div></div>`;
  const zt = `<span class="caption">Standard normal, area to the left of z. Rows z, columns second decimal.</span><div class="tablewrap"><table class="data" style="font-size:12px"><thead><tr><th>z</th>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(c => `<th class="num">.0${c}</th>`).join('')}</tr></thead><tbody>${D.ztable.map((row, r) => `<tr><td style="font-weight:500">${(r / 10).toFixed(1)}</td>${row.map(v => `<td class="num">${v.toFixed(4)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  return `<div class="head"><span>Reference sheet</span><button onclick="closeOverlay()">Close</button></div><div class="tabs"><button class="${refTab === 'f' ? 'on' : ''}" onclick="refTab='f';render()">Formulas</button><button class="${refTab === 'z' ? 'on' : ''}" onclick="refTab='z';render()">Z table</button></div><div class="content">${refTab === 'z' ? zt : formulas}</div>`;
}
let refTab = 'f'; window.refTab = refTab; Object.defineProperty(window, 'refTab', { get: () => refTab, set: v => refTab = v });
// calculator overlay (basic scientific, safe evaluator)
let calcExpr = '';
function calcOverlay() {
  const keys = [['(', ')', '√', '⌫'], ['7', '8', '9', '÷'], ['4', '5', '6', '×'], ['1', '2', '3', '−'], ['0', '.', 'x²', '+'], ['C', '^', 'ln', '=']];
  return `<div class="head"><span>Calculator</span><button onclick="closeOverlay()">Close</button></div><div class="content"><div class="calc"><div class="expr">${esc(calcExpr)}</div><div class="disp" id="calcdisp">${esc(calcEval(calcExpr))}</div>${keys.flat().map(k => `<button class="${'÷×−+^'.includes(k) || k === '=' ? (k === '=' ? 'eq' : 'op') : ''}" onclick="calcKey('${k}')">${k}</button>`).join('')}</div><span class="caption">Type or tap. ^ is power, √ and ln apply to the number that follows.</span></div>`;
}
window.calcKey = k => { if (k === 'C') calcExpr = ''; else if (k === '⌫') calcExpr = calcExpr.slice(0, -1); else if (k === '=') { const v = calcEval(calcExpr); if (v !== '') calcExpr = String(v); } else if (k === 'x²') calcExpr += '^2'; else if (k === '√') calcExpr += '√('; else if (k === 'ln') calcExpr += 'ln('; else calcExpr += k; render(); };
function calcEval(expr) {
  if (!expr.trim()) return '';
  let s = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/√\(/g, 'Math.sqrt(').replace(/√(\d+\.?\d*)/g, 'Math.sqrt($1)').replace(/ln\(/g, 'Math.log(').replace(/\^/g, '**');
  if (!/^[\d\s.+\-*/()Mathsqrtlog,e]*$/.test(s.replace(/Math\.(sqrt|log)/g, ''))) return 'Error';
  try { const v = Function('"use strict";return (' + s + ')')(); if (typeof v !== 'number' || !isFinite(v)) return 'Error'; return String(+v.toPrecision(10)); } catch (e) { return '…'; }
}

// ---------- RESULTS ----------
routes.results = (idx) => {
  const R = S.mocks[+idx]; if (!R) return routes.practice();
  const byPhase = PHASES.map(p => { const ks = R.order.map((q, k) => k).filter(k => Q[R.order[k]].phase === p); const ok = ks.filter(k => R.answers[k] === Q[R.order[k]].answer).length; return { p, n: ks.length, ok, pct: pct(ok, ks.length) }; }).filter(x => x.n);
  const bySec = {}; R.order.forEach((q, k) => { const s = Q[q].section; bySec[s] = bySec[s] || { n: 0, ok: 0 }; bySec[s].n++; if (R.answers[k] === Q[q].answer) bySec[s].ok++; });
  const weak = Object.entries(bySec).map(([id, v]) => ({ id, ...v, pct: pct(v.ok, v.n) })).sort((a, b) => a.pct - b.pct || b.n - a.n).slice(0, 3);
  const wrong = R.order.filter((q, k) => R.answers[k] !== Q[q].answer).length;
  return `<span class="eyebrow">${esc(R.label)} · ${R.size} questions · ${R.minutes} min · ${new Date(R.finished).toLocaleDateString('en-AU', { day: 'numeric', month: 'long' })}${R.partial ? ' · partial' : ''}${R.auto ? ' · auto-submitted' : ''}</span>
  <div class="stack" style="gap:12px"><div style="display:flex;align-items:baseline;gap:16px;flex-wrap:wrap"><span class="huge">${R.pct}%</span><span style="font-weight:500;font-size:18px" class="${R.pct >= PASS ? 'green' : 'amber'}">${R.pct >= PASS ? 'Pass' : 'Below pass line'}</span><span style="margin-left:auto;display:flex;flex-direction:column;align-items:flex-end"><span class="mono" style="font-weight:500;font-size:24px;line-height:1">${fmtTime(R.timeUsed)}</span><span class="caption" style="margin-top:4px">of ${fmtTime(R.minutes * 60)} · ${(R.timeUsed / 60 / R.size).toFixed(1)} min per question</span></span></div>${bar(R.pct, { size: 'big', label: true })}<span class="caption" style="padding-top:8px">${R.ok} of ${R.size} correct</span></div>
  <div class="grid2" style="gap:32px 64px;grid-template-columns:1fr" id="resgrid">
   <div class="stack"><span class="eyebrow">By phase</span><div style="display:grid;grid-template-columns:72px 1fr 44px;gap:10px 12px;align-items:center;font-size:14px">${byPhase.map(x => `<span>${x.p}</span>${bar(x.pct)}<span class="mono caption${scoreColor(x.pct)}" style="text-align:right">${x.pct}%</span>`).join('')}</div>
   <span class="eyebrow" style="margin-top:12px">Weakest three</span><div class="list">${weak.map(w => `<a href="#lesson/${sectionLessonDay(w.id) || ''}"><span>${w.id} ${esc(SEC[w.id].title)}</span><span style="display:flex;gap:12px;align-items:baseline"><span class="mono caption amber">${w.ok}/${w.n}</span><span class="green">${sectionLessonDay(w.id) ? lessonLabel(sectionLessonDay(w.id)) : ''}</span></span></a>`).join('')}</div></div>
   <div class="stack"><span class="eyebrow">By BoK section</span><div style="display:grid;grid-template-columns:36px 1fr 1fr 44px;gap:8px 12px;align-items:center;font-size:14px;border-top:1px solid var(--rule);padding-top:8px">${Object.entries(bySec).sort().map(([id, v]) => { const p = pct(v.ok, v.n); return `<span class="mono caption">${id}</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(SEC[id].title)}</span>${bar(p, { size: 'thin' })}<span class="mono caption${scoreColor(p)}" style="text-align:right">${p}%</span>`; }).join('')}</div></div>
  </div>
  <div class="wrap"><button class="primary" onclick="location.hash='#review/${idx}/wrong'">Review ${wrong} wrong</button><button class="secondary" onclick="location.hash='#review/${idx}/all'">Review all ${R.size}</button><button class="secondary" onclick="copy(mockSummary(${idx}))">Copy for coach</button></div>
  <style>@media(min-width:900px){#resgrid{grid-template-columns:1fr 1fr}}</style>`;
};
window.mockSummary = idx => { const R = S.mocks[idx]; const byPhase = PHASES.map(p => { const ks = R.order.map((q, k) => k).filter(k => Q[R.order[k]].phase === p); const ok = ks.filter(k => R.answers[k] === Q[R.order[k]].answer).length; return ks.length ? `${p} ${ok}/${ks.length}` : null; }).filter(Boolean); const bySec = {}; R.order.forEach((q, k) => { const s = Q[q].section; bySec[s] = bySec[s] || { n: 0, ok: 0 }; bySec[s].n++; if (R.answers[k] === Q[q].answer) bySec[s].ok++; }); const secs = Object.entries(bySec).sort().map(([s, v]) => `${s} ${v.ok}/${v.n}`); const wrong = R.order.filter((q, k) => R.answers[k] !== Q[q].answer); return `Tollgate ${R.label} · ${new Date(R.finished).toLocaleDateString('en-AU')}\nScore ${R.ok}/${R.size} (${R.pct}%) · time ${fmtTime(R.timeUsed)} of ${fmtTime(R.minutes * 60)}\nBy phase: ${byPhase.join(', ')}\nBy section: ${secs.join(', ')}\nWrong (${wrong.length}): ${wrong.join(', ')}`; };
routes.history = () => `<h2 class="page">Mock history</h2><div class="list">${S.mocks.map((m, i) => `<a href="#results/${i}"><span>${esc(m.label)} · ${fmtDate(m.finished)}${m.partial ? ' · partial' : ''}</span><span class="mono${scoreColor(m.pct)}" style="font-weight:500">${m.pct}%</span></a>`).reverse().join('') || '<span class="caption" style="padding:12px 0">No mocks yet.</span>'}</div>`;

// ---------- REVIEW ----------
routes.review = (idx, filter = 'wrong', pos = '0') => {
  const R = S.mocks[+idx]; if (!R) return routes.practice();
  const all = R.order.map((q, k) => k);
  const sets = { wrong: all.filter(k => R.answers[k] !== Q[R.order[k]].answer), flagged: R.flags.slice().sort((a, b) => a - b), all };
  const list = sets[filter] || sets.wrong; pos = Math.max(0, Math.min(list.length - 1, +pos));
  const tabs = `<div class="seg" style="font-size:14px">${['wrong', 'flagged', 'all'].map(f => `<button class="${filter === f ? 'on' : ''}" style="font-family:var(--sans)" onclick="location.hash='#review/${idx}/${f}/0'">${f[0].toUpperCase() + f.slice(1)} ${sets[f].length}</button>`).join('')}</div>`;
  if (!list.length) return `<div class="row"><a href="#results/${idx}" style="text-decoration:none;color:var(--ink2);font-size:14px">← Results</a></div>${tabs}<p class="muted">Nothing in this filter.</p>`;
  const k = list[pos], qid = R.order[k], q = Q[qid], ua = R.answers[k], perm = R.perm ? R.perm[k] : null;
  const lbl = orig => perm ? LET[perm.indexOf(orig)] : LET[orig];
  return `<div class="row"><a href="#results/${idx}" style="text-decoration:none;color:var(--ink2);font-size:14px">← Results</a><span class="mono caption">${esc(R.label)} · ${pos + 1} of ${list.length}</span></div>${tabs}
  <div class="stack" style="gap:16px;max-width:720px"><span class="mono caption">Q${k + 1} · ${q.section} ${esc(SEC[q.section].title)}${R.flags.includes(k) ? ' · <span class="amber">flagged</span>' : ''}</span><div class="prose" style="font:16px/1.5 var(--sans)">${q.stem_html}</div>
  <div class="stack" style="gap:8px;font-size:14px">${ua == null ? `<div class="opt wrong" style="cursor:default"><span class="k">Your answer</span><span>Not answered</span></div>` : ua !== q.answer ? `<div class="opt wrong" style="cursor:default"><span class="k">Your answer</span><span>${lbl(ua)} · ${q.options_html[ua]}</span></div>` : ''}<div class="opt right" style="cursor:default"><span class="k">${ua === q.answer ? 'Your answer · correct' : 'Correct'}</span><span>${lbl(q.answer)} · ${q.options_html[q.answer]}</span></div></div>
  <div class="grid2" style="grid-template-columns:1fr" id="whygrid"><div class="stack" style="gap:4px"><span class="eyebrow green">Why ${lbl(q.answer)} is right</span><div class="expl">${q.explanation_html}</div></div>${ua != null && ua !== q.answer ? `<div class="stack" style="gap:4px"><span class="eyebrow amber">Why ${lbl(ua)} was wrong</span><div class="expl">${q.distractor_html[ua] || ''}</div></div>` : ''}</div>
  <a href="#lesson/${q.lesson_day}" style="font-size:14px;text-decoration:none">Lesson · ${lessonLabel(q.lesson_day)}${LESSONS[q.lesson_day] ? ' · ' + esc(LESSONS[q.lesson_day].title) : ''}</a>
  <div class="row" style="border-top:1px solid var(--rule);padding-top:16px;flex-wrap:wrap"><button class="secondary" ${pos === 0 ? 'disabled' : ''} onclick="location.hash='#review/${idx}/${filter}/${pos - 1}'">Previous</button>${S.revisit[qid] ? '<span class="caption">In revisit queue</span>' : `<button class="secondary" onclick="addRevisit('${qid}')">Add to revisit queue</button>`}<button class="ink" ${pos + 1 >= list.length ? 'disabled' : ''} onclick="location.hash='#review/${idx}/${filter}/${pos + 1}'">Next</button></div></div>
  <style>@media(min-width:900px){#whygrid{grid-template-columns:1fr 1fr;gap:32px}}</style>`;
};
window.addRevisit = qid => { S.revisit[qid] = { due: today(), streak: 0, step: 0, lastDay: null, src: 'manual' }; save(); render(); toast('Added to revisit queue'); };

// ---------- PROGRESS ----------
routes.progress = () => {
  const done = D.lessons.filter(l => lessonDone(l.day)).length;
  const st = statsBySection(); const totalN = S.answers.length, totalOk = S.answers.filter(a => a.ok).length;
  const last = S.mocks[S.mocks.length - 1];
  const secs = Object.values(SEC);
  const heat = secs.map(s => { const v = st[s.id]; if (!v || v.n < 3) return `<div class="none" onclick="location.hash='#lesson/${sectionLessonDay(s.id) || ''}'" title="${esc(s.title)} · ${v ? v.n : 0} answered">${v ? v.n + 'q' : '—'}<small>${s.id}</small></div>`; const p = pct(v.ok, v.n); return `<div class="${p < PASS ? 'low' : ''}" onclick="location.hash='#lesson/${sectionLessonDay(s.id) || ''}'" title="${esc(s.title)} · ${v.ok}/${v.n}">${p}%<small>${s.id}</small></div>`; }).join('');
  const trend = S.mocks.length ? trendSvg(S.mocks) : '<span class="caption">Mock scores appear here after your first timed mock.</span>';
  return `<div class="row"><h2 class="page">Progress</h2><div class="wrap"><button class="secondary sm" onclick="exportProgress()">Export progress</button><button class="secondary sm" onclick="importProgress()">Import</button></div></div>
  <div class="grid2 grid4" style="border-bottom:1px solid var(--rule);padding-bottom:16px"><div class="stack" style="gap:2px"><span class="eyebrow">Lessons done</span><span class="big">${done}<span class="muted" style="font-size:18px"> / ${D.lessons.length}</span></span></div><div class="stack" style="gap:2px"><span class="eyebrow">Questions answered</span><span class="big">${totalN}</span></div><div class="stack" style="gap:2px"><span class="eyebrow">Overall accuracy</span><span class="big${totalN >= 10 ? scoreColor(pct(totalOk, totalN)) : ''}">${totalN ? pct(totalOk, totalN) + '%' : '—'}</span></div><div class="stack" style="gap:2px"><span class="eyebrow">Last mock</span><span class="big${last ? scoreColor(last.pct) : ''}">${last ? last.pct + '%' : '—'}</span></div></div>
  <div class="stack"><div class="row"><span class="eyebrow">Accuracy by BoK section</span><span class="caption">amber = below 70 · tap a cell for its lesson</span></div><div class="heat">${heat}</div></div>
  <div class="stack"><span class="eyebrow">Mock score trend</span>${trend}</div>
  <span class="caption">Progress is stored in this browser only. Export a file to move it to another device.</span>`;
};
function trendSvg(mocks) {
  const W = 640, H = 200, padL = 10, padR = 40, top = 20, bottom = 40; const n = mocks.length; const xs = i => padL + (n === 1 ? (W - padL - padR) / 2 : i * (W - padL - padR) / (n - 1)); const ys = p => top + (100 - p) / 100 * (H - top - bottom);
  return `<div class="tablewrap"><svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:900px;overflow:visible;min-width:320px"><line x1="0" y1="${ys(PASS)}" x2="${W - padR + 10}" y2="${ys(PASS)}" stroke="var(--green)" stroke-width="1"/><text x="${W}" y="${ys(PASS) + 4}" text-anchor="end" font-family="IBM Plex Mono" font-size="11" fill="var(--green)">70</text><line x1="0" y1="${ys(0)}" x2="${W}" y2="${ys(0)}" stroke="var(--rule)"/>${n > 1 ? `<polyline points="${mocks.map((m, i) => `${xs(i)},${ys(m.pct)}`).join(' ')}" fill="none" stroke="var(--ink)" stroke-width="1.5"/>` : ''}${mocks.map((m, i) => `<circle cx="${xs(i)}" cy="${ys(m.pct)}" r="4" fill="${m.pct >= PASS ? 'var(--green)' : 'var(--amber)'}"/><text x="${xs(i)}" y="${ys(m.pct) - 10}" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" fill="var(--ink)">${m.pct}%</text><text x="${xs(i)}" y="${H - 6}" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="var(--ink2)">${esc(m.label.replace('mock ', ''))} · ${fmtDate(m.finished)}</text>`).join('')}</svg></div>`;
}

// ---------- keyboard ----------
document.addEventListener('keydown', e => {
  if (e.target.matches('input,textarea,select')) return;
  const { name } = parseHash();
  if (name === 'mock' && S.active && !S.active.finished) {
    if (overlay) { if (e.key === 'Escape') { closeOverlay(); } return; }
    if (/^[1-4]$/.test(e.key)) { mockAnswer(S.active.perm[S.active.i][+e.key - 1]); }
    else if (e.key === 'n' || e.key === 'ArrowRight') mockGoto(S.active.i + 1);
    else if (e.key === 'p' || e.key === 'ArrowLeft') mockGoto(S.active.i - 1);
    else if (e.key === 'f') mockFlag();
  } else if (name === 'drill' && drill && drill.i < drill.ids.length) {
    const qid = drill.ids[drill.i];
    if (/^[1-4]$/.test(e.key) && !drill.answers[qid]) answerDrill(+e.key - 1);
    else if ((e.key === 'n' || e.key === 'Enter' || e.key === 'ArrowRight') && drill.answers[qid]) { drill.i++; render(); }
  }
});
window.addEventListener('beforeunload', () => { if (S.active && !S.active.finished) { S.active.elapsed += (Date.now() - S.active.lastTick) / 1000; S.active.lastTick = Date.now(); save(); } });
document.addEventListener('visibilitychange', () => { if (document.hidden) { if (S.active && !S.active.finished) { S.active.elapsed += (Date.now() - S.active.lastTick) / 1000; S.active.lastTick = Date.now(); } save(); } });

applySettings();
if (!location.hash) location.hash = '#today';
render();
})();
