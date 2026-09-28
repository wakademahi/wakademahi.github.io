/* ==========================================================================
   Mahesh Wakade Portfolio — Pure JavaScript Logic
   ========================================================================== */

// --- Theme Management ---
const themeBtn = document.getElementById('theme-toggle-btn');
const isSavedLight = localStorage.getItem('mw_theme') === 'light';

if (isSavedLight) {
  document.documentElement.classList.remove('dark');
  if (themeBtn) {
    const icon = themeBtn.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = 'dark_mode';
  }
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const icon = themeBtn.querySelector('.material-symbols-outlined');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mw_theme', 'light');
      if (icon) icon.textContent = 'dark_mode';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mw_theme', 'dark');
      if (icon) icon.textContent = 'light_mode';
    }
  });
}

// --- Mobile Navigation Menu ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// --- Interactive Terminal ---
const terminalLogs = document.getElementById('terminal-logs');
const terminalInput = document.getElementById('terminal-input');

function handleTerminalCommand(e) {
  e.preventDefault();
  if (!terminalInput) return;
  const val = terminalInput.value.trim().toLowerCase();
  if (!val) return;
  executeCommand(val);
  terminalInput.value = '';
}

function runQuickCommand(cmd) {
  executeCommand(cmd);
}

function executeCommand(cmd) {
  if (!terminalLogs) return;

  if (cmd === 'clear') {
    terminalLogs.innerHTML = `
      <p><span class="term-arrow">➜</span> <span class="term-folder">mw-core</span> <span class="term-cmd">ready</span></p>
      <p class="term-comment">Type "help" for a list of available commands.</p>
    `;
    return;
  }

  let outputHTML = `<p><span class="term-arrow">➜</span> <span class="term-folder">mw-core</span> <span class="term-cmd">${cmd}</span></p>`;

  switch (cmd) {
    case 'help':
      outputHTML += `<p class="term-cyan">Available commands: skills, experience, projects, contact, status, build, resume, clear</p>`;
      break;
    case 'skills':
      outputHTML += `<p>Core Stack: Angular (v2-18), TypeScript, Ionic, RxJS, Microfrontends, Capacitor, Tailwind CSS</p>`;
      break;
    case 'experience':
      outputHTML += `<p>10+ Years: Greentin Solutions (8 yrs), Edynamics Business (1 yr), Exuberant Systems (1 yr)</p>`;
      break;
    case 'projects':
      outputHTML += `<p>Key Platforms: myeNovation, Skill Matrix, PACE, Call Manager App</p>`;
      break;
    case 'contact':
      outputHTML += `<p>Email: wakade.mahi@gmail.com | Location: Pune, India</p>`;
      break;
    case 'status':
      outputHTML += `<p class="term-success">AVAILABLE FOR OPPORTUNITIES — IMMEDIATE JOINER</p>`;
      break;
    case 'resume':
      openResumeModal();
      outputHTML += `<p class="term-success">✔ Initiated download for Mahesh_Wakade_Resume.pdf (assets/resume/resume.pdf)</p>`;
      break;
    case 'build':
      outputHTML += `<p>Compiling Angular & Ionic production bundle...</p>
                     <p class="term-success">✔ BUILD SUCCESSFUL in 8.4s — 0 errors, 0 warnings.</p>`;
      break;
    default:
      outputHTML += `<p style="color: #ef4444;">Command not found: "${cmd}". Type "help" for commands.</p>`;
  }

  terminalLogs.insertAdjacentHTML('beforeend', outputHTML);
  terminalLogs.scrollTop = terminalLogs.scrollHeight;
}

// --- Skills Search Filtering ---
function filterSkills() {
  const input = document.getElementById('skills-search-input');
  if (!input) return;
  const query = input.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.skill-card');

  cards.forEach(card => {
    const badges = card.querySelectorAll('.skill-badge');
    let hasMatch = false;

    badges.forEach(badge => {
      const text = badge.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        badge.style.display = 'inline-flex';
        hasMatch = true;
      } else {
        badge.style.display = 'none';
      }
    });

    card.style.display = hasMatch ? 'flex' : 'none';
  });
}

// --- Projects Filtering ---
function filterProjects(tag, btn) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const projectCards = document.querySelectorAll('#projects-grid .project-card');
  projectCards.forEach(card => {
    const tags = card.getAttribute('data-tags') || '';
    if (tag === 'all' || tags.toLowerCase().includes(tag.toLowerCase())) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// --- Copy Utilities ---
function copySkill(name) {
  navigator.clipboard.writeText(name);
  alert(`Copied "${name}" to clipboard!`);
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text);
  if (btn) {
    const icon = btn.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = 'check';
      setTimeout(() => { icon.textContent = 'content_copy'; }, 2000);
    }
  }
}

function copyEmailHero() {
  navigator.clipboard.writeText('wakade.mahi@gmail.com');
  const label = document.getElementById('hero-email-text');
  if (label) {
    label.textContent = 'Copied!';
    setTimeout(() => { label.textContent = 'Email'; }, 2000);
  }
}

// --- Modals (Resume, Project Demo & Certificate) ---
const resumeModal = document.getElementById('resume-modal');
const demoModal = document.getElementById('demo-modal');

// Clean resume download action without showcasing complete URL in browser status bar
function downloadResume() {
  const downloadLink = document.createElement('a');
  downloadLink.href = 'assets/resume/Mahesh_Wakade_Sr_Frontend_Developer_Resume.pdf';
  downloadLink.download = 'Mahesh_Wakade_Resume.pdf';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function openResumeModal() {
  downloadResume();
}

function previewResumeModal() {
  if (resumeModal) resumeModal.classList.add('open');
}

function closeResumeModal(e) {
  if (!e || e.target === resumeModal || e.target.closest('.modal-close-btn') || e.target.closest('.btn-secondary')) {
    if (resumeModal) resumeModal.classList.remove('open');
  }
}

// Clean secure link opener without exposing complete URL in browser status bar on cursor hover
function openSecureLink(url) {
  if (!url) return;
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (win) win.focus();
}

const DEMO_DATA = {
  myenovation: {
    title: 'myeNovation',
    tag: 'Enterprise Platform · Greentin Solutions',
    desc: 'Comprehensive Employee Engagement Application featuring E-Suggestions, Kaizen, Audit, Nearmiss, PMS, Skill Book, and Concerns management modules. Integrated with myNu AI Assistant for intelligent workflow automation.',
    modules: [
      'E-Suggestions & Ideas pipeline with multi-level approval matrix',
      'Digital Kaizen 5S workflow with before/after photo comparison',
      'Safety Nearmiss & Incident reporting with immediate escalation routing',
      'PMS (Performance Management System) & KPI balanced scorecards',
      'Angular standalone components with reactive RxJS state management'
    ],
    metrics: '15,000+ MAU · 40% Less Duplication · 99.9% Uptime'
  },
  skillmatrix: {
    title: 'Skill Matrix',
    tag: 'Competency Solution · Greentin Solutions',
    desc: 'Skill Mapping & Gap Analysis Platform enabling organizations to map workforce capabilities, pinpoint skill deficits, and plan targeted training modules.',
    modules: [
      'Interactive Heatmap Matrix of engineering & operator competencies',
      'Deficit radar analysis with automated training recommendation logic',
      'Supervisor evaluation and endorsement workflows',
      'Exportable audit-ready ISO compliance matrices'
    ],
    metrics: '12 Plant Sites · 60 FPS Virtualized Grid · ISO Compliant'
  },
  pace: {
    title: 'PACE',
    tag: 'Training Platform · Greentin Solutions',
    desc: 'Skill Enhancement Platform engineered specifically for operators and engineers. Provides targeted learning paths, tracking modules, and interactive assessment dashboards.',
    modules: [
      'Interactive video modules with checkpoint knowledge checks',
      'Offline caching for factory floors with intermittent connectivity',
      'Operator certification badge generation and verifiable QR passes',
      'Ionic & Capacitor native plugins for hardware-accelerated media'
    ],
    metrics: 'Cross-platform Android/Web · Offline Mode · 40% Faster Onboarding'
  },
  callmanager: {
    title: 'Call Manager App',
    tag: 'Business OS Platform · Greentin Solutions',
    desc: 'Business OS Platform with cloud telephony integration for streamlined call management, logging, customer communication history, and real-time agent dispatch.',
    modules: [
      'Instant call pop-up with caller CRM profile and history',
      'Click-to-call direct dialing with automated recording playback',
      'Agent availability state machine (Online, Busy, Wrap-up, Break)',
      'Real-time supervisor dispatch queue with live call barge-in'
    ],
    metrics: '500k+ Calls Logged · <200ms API Latency · WebRTC Audio'
  }
};

function openDemoModal(key) {
  const data = DEMO_DATA[key];
  if (!data || !demoModal) return;

  document.getElementById('demo-modal-title').textContent = data.title;
  document.getElementById('demo-modal-tag').textContent = data.tag;
  document.getElementById('demo-modal-desc').textContent = data.desc;
  document.getElementById('demo-modal-metrics').textContent = data.metrics;

  const ul = document.getElementById('demo-modal-modules');
  if (ul) {
    ul.innerHTML = '';
    data.modules.forEach(m => {
      const li = document.createElement('li');
      li.textContent = m;
      ul.appendChild(li);
    });
  }

  demoModal.classList.add('open');
}

function closeDemoModal(e) {
  if (!e || e.target === demoModal || e.target.closest('.modal-close-btn') || e.target.closest('.btn-secondary')) {
    if (demoModal) demoModal.classList.remove('open');
  }
}

// --- Certificate Modal Logic ---
const certificateModal = document.getElementById('certificate-modal');
let activeCertificateKey = 'be10x';

const CERTIFICATE_DATA = {
  be10x: {
    title: 'be10x AI Tools & Claude Workshop',
    issuer: 'be10x Certified Professional',
    image: 'assets/certificate/Certificate.png',
    downloadName: 'Mahesh_Wakade_be10x_Certificate.png'
  },
  micro1: {
    title: 'micro1 AI Interview Performance Certificate',
    issuer: 'micro1 Top Performance Score',
    image: 'assets/certificate/micro1_certificate.jpg',
    downloadName: 'Mahesh_Wakade_micro1_Certificate.jpg'
  }
};

function openCertificateModal(key) {
  const data = CERTIFICATE_DATA[key];
  if (!data || !certificateModal) return;

  activeCertificateKey = key;
  const titleEl = document.getElementById('cert-modal-title');
  const issuerEl = document.getElementById('cert-modal-issuer');
  const imgEl = document.getElementById('cert-modal-image');

  if (titleEl) titleEl.textContent = data.title;
  if (issuerEl) issuerEl.textContent = data.issuer;
  if (imgEl) {
    imgEl.src = data.image;
    imgEl.alt = data.title;
  }

  certificateModal.classList.add('open');
}

function downloadCurrentCertificate() {
  const data = CERTIFICATE_DATA[activeCertificateKey];
  if (!data) return;
  const downloadLink = document.createElement('a');
  downloadLink.href = data.image;
  downloadLink.download = data.downloadName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function viewFullCertificate() {
  const data = CERTIFICATE_DATA[activeCertificateKey];
  if (!data) return;
  openSecureLink(data.image);
}

function closeCertificateModal(e) {
  if (!e || e.target === certificateModal || e.target.closest('.modal-close-btn') || e.target.closest('.btn-secondary')) {
    if (certificateModal) certificateModal.classList.remove('open');
  }
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (certificateModal) certificateModal.classList.remove('open');
    if (demoModal) demoModal.classList.remove('open');
    if (resumeModal) resumeModal.classList.remove('open');
  }
});

// --- Contact Form Submission ---
function handleContactSubmit(e) {
  e.preventDefault();
  const toast = document.getElementById('contact-toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  }
  e.target.reset();
}
