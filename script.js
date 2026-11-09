// Interacciones de la navegación de Pro Flight MX.
// No requiere bibliotecas ni servicios externos.
const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('site-nav');
const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]'));
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const progress = document.getElementById('scroll-progress');
const isEnglish = document.documentElement.lang.startsWith('en');
const menuText = isEnglish ? ['Open navigation menu', 'Close navigation menu'] : ['Abrir menú de navegación', 'Cerrar menú de navegación'];

function closeMenu() {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', menuText[0]);
}

menuToggle.addEventListener('click', () => {
  const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('is-open', willOpen);
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menuToggle.setAttribute('aria-label', willOpen ? menuText[1] : menuText[0]);
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));
document.querySelector('.brand').addEventListener('click', closeMenu);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('pointerdown', event => {
  if (nav.classList.contains('is-open') && !header.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 1361px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

function setActiveSection(id) {
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

// Mantiene resaltado el enlace de la sección visible incluso al navegar con scroll.
let scrollScheduled = false;
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  progress.style.width = `${ratio * 100}%`;

  const anchorLine = header.getBoundingClientRect().height + window.innerHeight * 0.3;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= anchorLine) current = section;
  }
  if (current) setActiveSection(current.id);
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) {
    window.requestAnimationFrame(updateScrollUI);
    scrollScheduled = true;
  }
}, { passive: true });
window.addEventListener('resize', updateScrollUI);
window.addEventListener('hashchange', updateScrollUI);
updateScrollUI();


// The language control changes the entire page, keeping the current section in view.
// Since the English version is a separate HTML document, the site also works without JS.
document.querySelectorAll('.language-switcher__link').forEach(link => {
  link.addEventListener('click', event => {
    if (link.getAttribute('aria-current') === 'page') {
      event.preventDefault();
      return;
    }
    const active = nav.querySelector('.site-nav__link.is-active');
    const sectionHash = active ? active.getAttribute('href') : (window.location.hash || '#inicio');
    const target = new URL(link.getAttribute('href'), window.location.href);
    target.hash = sectionHash;
    link.href = target.href;
  });
});


// V9 · 20 synthetic example records; four are displayed per visit.
// Never treat the demonstration records as genuine customer reviews.
const demoReviews = [
  {name:'Mariana R.',stars:5,service:{es:'Revalidación de licencia PAC',en:'PAC license renewal'},text:{es:'Me explicaron qué documentación debía preparar y cómo dar seguimiento a cada paso. La atención fue clara y amable.',en:'They explained what documents I needed and how to follow each step. The assistance was clear and friendly.'}},
  {name:'Jorge C.',stars:4,service:{es:'Gestión de capacidad Airbus A320',en:'Airbus A320 rating assistance'},text:{es:'La información fue detallada y me respondieron con oportunidad. Hubo tiempos de espera propios del trámite, pero tuve orientación constante.',en:'The information was detailed and replies were timely. Some steps involved waiting, but I had ongoing guidance.'}},
  {name:'Valeria L.',stars:5,service:{es:'Cita médica aeronáutica',en:'Aviation medical appointment'},text:{es:'Recibí apoyo para organizar mis documentos y comprender los pasos de la cita, sin promesas sobre los resultados médicos.',en:'I received help organizing my documents and understanding the appointment process, without promises about medical outcomes.'}},
  {name:'Daniel S.',stars:4,service:{es:'Curso recurrente CRM',en:'CRM recurrent training'},text:{es:'Me orientaron sobre las opciones de capacitación y los requisitos. La comunicación fue constante y el proceso resultó sencillo.',en:'They helped me understand training options and requirements. Communication was steady and the process was straightforward.'}},
  {name:'Karla M.',stars:5,service:{es:'Expedición de licencia de sobrecargo',en:'Flight attendant license application'},text:{es:'Agradecí la lista de documentos y el seguimiento administrativo; pude organizar mejor mis tiempos para el trámite.',en:'I appreciated the document checklist and administrative follow-up; it helped me plan my application.'}},
  {name:'Luis A.',stars:4,service:{es:'Revalidación de capacidad RTARI',en:'RTARI rating renewal'},text:{es:'La explicación de los requisitos fue útil y la atención estuvo disponible cuando necesité aclarar detalles.',en:'The explanation of requirements was useful, and assistance was available when I needed to clarify details.'}},
  {name:'Sofía P.',stars:5,service:{es:'Revalidación de licencia de sobrecargo',en:'Flight attendant license renewal'},text:{es:'Me ayudaron a revisar la documentación antes de iniciar la gestión. Todo se explicó con paciencia y profesionalismo.',en:'They helped review my paperwork before starting. Everything was explained patiently and professionally.'}},
  {name:'Ernesto G.',stars:4,service:{es:'Orientación para capacidad Learjet 45',en:'Learjet 45 rating guidance'},text:{es:'El servicio fue ordenado y las respuestas muy concretas. Aprecio que aclararan los alcances desde el principio.',en:'The service was well organized and answers were specific. I appreciated that the scope was explained from the start.'}},
  {name:'Claudia H.',stars:5,service:{es:'Licencia de mantenimiento Clase 2',en:'Class 2 maintenance license'},text:{es:'La asesoría me permitió identificar requisitos que no tenía contemplados y preparar un expediente más completo.',en:'Their guidance helped me identify requirements I had missed and assemble a more complete file.'}},
  {name:'Ricardo T.',stars:4,service:{es:'Capacidad de vuelo por instrumentos',en:'Instrument flight rating'},text:{es:'La orientación fue profesional y organizada. Me mantuvieron al tanto de las etapas administrativas.',en:'The guidance was professional and organized. They kept me aware of the administrative stages.'}},
  {name:'Andrea F.',stars:5,service:{es:'Gestión de curso SMS',en:'SMS course arrangements'},text:{es:'Me compartieron información de fechas y requisitos de capacitación de manera clara, con atención personalizada.',en:'They clearly shared information about course dates and requirements, with personalized attention.'}},
  {name:'Mateo V.',stars:5,service:{es:'Certificación de horas de vuelo',en:'Flight-hour certification'},text:{es:'Recibí una guía clara para reunir la información solicitada y resolver mis dudas sobre el expediente.',en:'I received clear guidance on gathering the requested information and resolving questions about my file.'}},
  {name:'Gabriela D.',stars:4,service:{es:'Orientación para examen psicofísico',en:'Psychophysical exam guidance'},text:{es:'La explicación del proceso fue precisa y me ayudó a preparar la documentación requerida para la cita.',en:'The process was explained accurately and helped me prepare the required appointment documents.'}},
  {name:'Fernando N.',stars:5,service:{es:'Curso de seguridad AVSEC',en:'AVSEC security course'},text:{es:'Me ayudaron a entender las opciones disponibles y a identificar los documentos necesarios para la inscripción.',en:'They helped me understand the available options and identify enrollment documents.'}},
  {name:'Natalia B.',stars:4,service:{es:'Revalidación de licencia TPI',en:'TPI license renewal'},text:{es:'Valoro que detallaran los pasos y los tiempos que dependen de la autoridad. La comunicación fue buena.',en:'I valued the explanation of steps and authority-dependent timelines. Communication was good.'}},
  {name:'Óscar L.',stars:5,service:{es:'Integración de expediente aeronáutico',en:'Aviation file preparation'},text:{es:'La revisión de requisitos fue cuidadosa y pude ordenar mis documentos antes de presentar la solicitud.',en:'The requirements review was thorough and helped me organize my documents before applying.'}},
  {name:'Paola C.',stars:4,service:{es:'Recuperación de licencia PAC',en:'PAC license reinstatement'},text:{es:'Me explicaron las opciones administrativas con transparencia y dieron respuesta a mis preguntas durante el seguimiento.',en:'They explained administrative options transparently and answered my questions during follow-up.'}},
  {name:'Emilio R.',stars:5,service:{es:'Curso MERPEL',en:'Dangerous goods (MERPEL) course'},text:{es:'Recibí información oportuna para programar la capacitación y revisar lo que necesitaba para participar.',en:'I received timely information to schedule training and review participation requirements.'}},
  {name:'Teresa A.',stars:4,service:{es:'Gestión de capacidad monomotor',en:'Single-engine rating assistance'},text:{es:'El equipo aclaró los requisitos y me orientó paso a paso para preparar mi solicitud.',en:'The team clarified requirements and guided me step by step as I prepared my application.'}},
  {name:'Víctor Z.',stars:5,service:{es:'Certificación de documentación de vuelo',en:'Flight documentation certification'},text:{es:'Me explicaron qué constancias debía reunir y cómo llevar el seguimiento de manera ordenada.',en:'They explained which records I needed and how to track the process in an organized way.'}}
];

function initializeDemoTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;
  let previous=[];
  try { previous=JSON.parse(sessionStorage.getItem('proflight-previous-demo-reviews') || '[]'); } catch (_) { previous=[]; }
  const candidates=demoReviews.map((entry,i)=>({...entry,id:i})).filter(entry=>!previous.includes(entry.id));
  // Fisher-Yates shuffle, then select four of the twenty, without repeating the immediate prior set.
  for (let i=candidates.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [candidates[i],candidates[j]]=[candidates[j],candidates[i]];
  }
  const selected=candidates.slice(0,4);
  try { sessionStorage.setItem('proflight-previous-demo-reviews',JSON.stringify(selected.map(item=>item.id))); } catch (_) {}
  const lang=document.documentElement.lang.startsWith('en')?'en':'es';
  container.replaceChildren();
  selected.forEach(item=>{
    const card=document.createElement('article');card.className='testimonial-card';
    const top=document.createElement('div');top.className='testimonial-card__top';
    const monogram=document.createElement('span');monogram.className='testimonial-card__monogram';monogram.setAttribute('aria-hidden','true');monogram.textContent=item.name.split(' ').map(s=>s[0]).join('').replace('.','').slice(0,2);
    const heading=document.createElement('div');const name=document.createElement('h4');name.textContent=item.name;const service=document.createElement('p');service.textContent=item.service[lang];heading.append(name,service);top.append(monogram,heading);
    const stars=document.createElement('div');stars.className='testimonial-card__stars';stars.setAttribute('role','img');stars.setAttribute('aria-label',lang==='en'?`${item.stars} out of 5 stars`:`${item.stars} de 5 estrellas`);
    stars.textContent='★'.repeat(item.stars);
    if(item.stars<5){const empty=document.createElement('span');empty.className='testimonial-card__star-empty';empty.textContent='☆'.repeat(5-item.stars);stars.append(empty);}
    const quote=document.createElement('blockquote');quote.textContent='“'+item.text[lang]+'”';card.append(top,stars,quote);container.append(card);
  });
}
initializeDemoTestimonials();

// Presentational rating selector. The submission control remains disabled
// until the business chooses a real, consent-based review workflow.
const reviewForm = document.getElementById('review-demo-form');
if (reviewForm) {
  const choices = [...reviewForm.querySelectorAll('input[name="rating"]')];
  choices.forEach(radio => radio.addEventListener('change', () => {
    const level = Number(radio.value);
    choices.forEach(choice => {
      choice.closest('.rating-choice').classList.toggle('is-filled', Number(choice.value) <= level);
    });
  }));
  reviewForm.addEventListener('submit', event => event.preventDefault());
}
