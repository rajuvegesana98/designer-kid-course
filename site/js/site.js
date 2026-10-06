/* Designer_Kid Studios — Site JS */

// ── Nav scroll shadow
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
}

// ── Mobile hamburger
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');
if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => drawer.classList.remove('open'));
  });
}

// ── Theme toggle (if button exists)
const themeBtn = document.getElementById('themeToggle');
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem('dk-theme', t); } catch(e) {}
  if (themeBtn) themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}
if (themeBtn) {
  let saved;
  try { saved = localStorage.getItem('dk-theme'); } catch(e) {}
  if (saved) applyTheme(saved);
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  });
}

// ── Session data
const SESSIONS = [
  { n:1,  week:1, title:'Introduction to UI/UX Design',   topics:'Design process · Key roles · UX vs UI',          slides:10 },
  { n:2,  week:1, title:'User Research Methods',          topics:'Interviews · Surveys · Competitive analysis',    slides:11 },
  { n:3,  week:1, title:'Empathy Mapping',                topics:'Empathy maps · Affinity diagrams · Insights',    slides:10 },
  { n:4,  week:1, title:'Persona & User Flow',            topics:'Persona creation · User journeys · Task flows',  slides:11 },
  { n:5,  week:1, title:'IA & Wireframing',               topics:'Sitemaps · Lo-fi wireframes · Content hierarchy',slides:12 },
  { n:6,  week:2, title:'Visual Design Basics',           topics:'Hierarchy · Gestalt · Contrast principles',      slides:11 },
  { n:7,  week:2, title:'UI Components & Patterns',       topics:'Buttons · Inputs · Nav · Atomic Design',         slides:11 },
  { n:8,  week:2, title:'Prototyping Basics',             topics:'Figma flows · Click targets · Interaction',      slides:10 },
  { n:9,  week:2, title:'Usability Testing',              topics:'Moderated tests · Rainbow charts · Iteration',   slides:11 },
  { n:10, week:2, title:'Portfolio Review',               topics:'Mid-course critique · Case study structure',     slides:9  },
  { n:11, week:3, title:'Colour Theory for UI',           topics:'Colour wheel · Harmony · Psychology',            slides:12 },
  { n:12, week:3, title:'Colour & UI Design',             topics:'Tints · Shades · Dark mode palettes',            slides:11 },
  { n:13, week:3, title:'Typography in UI',               topics:'Type scale · Pairing · Rhythm · Legibility',     slides:12 },
  { n:14, week:3, title:'Accessibility & Inclusion',      topics:'WCAG · Contrast · Screen readers · Patterns',    slides:11 },
  { n:15, week:3, title:'Mobile-First Design',            topics:'Responsive · Thumb zone · Touch targets',        slides:10 },
  { n:16, week:4, title:'Design Handoff',                 topics:'Specs · Redlines · Figma Inspect · QA',          slides:11 },
  { n:17, week:4, title:'Motion & Micro-interactions',    topics:'Easing · Spring · State transitions',            slides:10 },
  { n:18, week:4, title:'Design Systems',                 topics:'Tokens · Libraries · Atomic Design · Docs',      slides:12 },
  { n:19, week:4, title:'Portfolio & Case Studies',       topics:'Structure · Platforms · Writing tips',           slides:11 },
  { n:20, week:4, title:'Final Presentations',            topics:'Presentation · Feedback · Career paths',         slides:10 },
];

const WEEK_LABELS = { 1:'Week 1 — Foundations', 2:'Week 2 — Design Craft', 3:'Week 3 — Advanced UI', 4:'Week 4 — Professional Practice' };
const SLIDE_DIR = '../slides/';

function sessionHref(n) {
  return `${SLIDE_DIR}session_${String(n).padStart(2,'0')}.html?n=${n}`;
}

// ── Homepage sessions preview (first 8)
const previewGrid = document.getElementById('sessionsPreview');
if (previewGrid) {
  previewGrid.innerHTML = SESSIONS.slice(0, 8).map(s => `
    <a class="sess-card" href="${sessionHref(s.n)}">
      <div class="sess-num">S${String(s.n).padStart(2,'0')}</div>
      <div class="sess-title">${s.title}</div>
      <div class="sess-week">Week ${s.week}</div>
    </a>`).join('');
}

// ── All sessions grid
const sessionsGrid = document.getElementById('sessionsGrid');
if (sessionsGrid) {
  let html = '', lastWeek = 0;
  SESSIONS.forEach(s => {
    if (s.week !== lastWeek) {
      lastWeek = s.week;
      html += `<div class="week-divider"><span>${WEEK_LABELS[s.week]}</span></div>`;
    }
    html += `
      <a class="session-card" href="${sessionHref(s.n)}">
        <div class="sc-meta">
          <div class="sc-num">${String(s.n).padStart(2,'0')}</div>
          <div class="sc-week">Week ${s.week}</div>
        </div>
        <div class="sc-title">${s.title}</div>
        <div class="sc-topics">${s.topics}</div>
        <div class="sc-footer">
          <span class="sc-slides-count">${s.slides} slides</span>
          <span class="sc-btn">Open →</span>
        </div>
      </a>`;
  });
  sessionsGrid.innerHTML = html;
}

// ── Curriculum table
const currTable = document.getElementById('currTable');
if (currTable) {
  let tbody = '', lastWeek = 0;
  SESSIONS.forEach(s => {
    if (s.week !== lastWeek) {
      lastWeek = s.week;
      tbody += `<tr class="week-sep"><td colspan="4">${WEEK_LABELS[s.week]}</td></tr>`;
    }
    tbody += `
      <tr>
        <td><div class="sess-badge">${String(s.n).padStart(2,'0')}</div></td>
        <td><strong>${s.title}</strong></td>
        <td style="color:var(--muted)">${s.topics}</td>
        <td><a class="open-link" href="${sessionHref(s.n)}">Open slides ↗</a></td>
      </tr>`;
  });
  currTable.querySelector('tbody').innerHTML = tbody;
}
