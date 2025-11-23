// Simple language switcher for the CV
// Stores chosen language in localStorage under 'site_lang'

(function(){
  const translations = {
    es: {
      'nav.about': 'Sobre mí',
      'nav.experience': 'Experiencia',
      'nav.education': 'Educación',
      'nav.skills': 'Habilidades',
      'nav.awards': 'Certificaciones',
      'about.lead': 'Soy un estudiante de administración de sistemas informáticos en red con gran motivación para adquirir experiencia en el sector. Estoy dispuesto a aprender, trabajar en equipo y aportar mis conocimientos en tecnología para contribuir al crecimiento de la empresa.',
      'section.experience': 'Experiencia',
      'section.education': 'Educación',
      'section.skills': 'Habilidades',
      'section.awards': 'Certificaciones'
      ,
      'experience.job1.title': 'Auxiliar de almacén',
      'experience.job1.desc': 'Recepcionaba y verificaba la mercancía que llegaba a la tienda. Preparación de pedidos mediante uso de PDA. Colocaba la mercancía en la tienda y almacenaba el excedente de forma ordenada en el almacén. Control del inventario realizando recuentos y devoluciones.',
      'education.institution1.subheading': 'Grado superior en administración de sistemas informáticos en red',
      'education.track': 'Ciencias de la computación - Especialidad en Desarrollo Web',
      'education.institution2.subheading': 'Bachillerato Ciencias',
      'skills.title': 'Lenguajes de programación y herramientas',
      'skills.python': 'scripting y automatización.',
      'skills.bash': 'scripts de administración y automatización en Linux.',
      'skills.powershell': 'administración de servidores Windows y automatización.',
      'skills.linux': 'administración de sistemas y servicios.',
      'skills.docker': 'contenedores y despliegue de aplicaciones.',
      'skills.virtualization': 'conceptos y herramientas como VMware/Proxmox.',
      'skills.databases': 'SQL (MySQL/PostgreSQL) y consultas básicas.',
      'skills.git': 'control de versiones y colaboración en proyectos.',
      'skills.web': 'fundamentos para administración de servicios web.',
      'skills.networks': 'TCP/IP, routing, switching y conceptos de seguridad de red.',
      'awards.item1': 'Desarrollador certificado de Google Analytics',
      'awards.item2': 'Especialista móvil web - Certificación Google',
      'awards.item3': '1º puesto - University of Colorado Boulder - Emerging Tech Competition 2009',
      'awards.item4': '1º puesto - University of Colorado Boulder - Adobe Creative Jam 2008 (Categoría diseño UI)',
      'awards.item5': '2º puesto - University of Colorado Boulder - Emerging Tech Competition 2008',
      'awards.item6': '1º puesto - James Buchanan High School - Hackathon 2006',
      'awards.item7': '3º puesto - James Buchanan High School - Hackathon 2005'
    },
    en: {
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.education': 'Education',
      'nav.skills': 'Skills',
      'nav.awards': 'Certifications',
      'about.lead': 'I am a student of network systems administration with strong motivation to gain experience in the sector. I am willing to learn, work in teams and contribute my technical knowledge to help the company grow.',
      'section.experience': 'Experience',
      'section.education': 'Education',
      'section.skills': 'Skills',
      'section.awards': 'Certifications'
      ,
      'experience.job1.title': 'Warehouse Assistant',
      'experience.job1.desc': 'Received and checked merchandise arriving at the store. Prepared orders using a PDA. Placed merchandise on the shop floor and stored surplus in the warehouse in an orderly manner. Performed inventory control with counts and returns.',
      'education.institution1.subheading': 'Higher vocational degree in networked computer systems administration',
      'education.track': 'Computer Science - Web Development Track',
      'education.institution2.subheading': 'Science Baccalaureate',
      'skills.title': 'Programming languages & tools',
      'skills.python': 'scripting and automation.',
      'skills.bash': 'administration scripts and automation on Linux.',
      'skills.powershell': 'Windows Server administration and automation.',
      'skills.linux': 'system and service administration.',
      'skills.docker': 'containers and application deployment.',
      'skills.virtualization': 'virtualization concepts and tools like VMware/Proxmox.',
      'skills.databases': 'SQL (MySQL/PostgreSQL) and basic queries.',
      'skills.git': 'version control and collaboration in projects.',
      'skills.web': 'fundamentals for administering web services.',
      'skills.networks': 'TCP/IP, routing, switching and network security concepts.',
      'awards.item1': 'Google Analytics Certified Developer',
      'awards.item2': 'Mobile Web Specialist - Google Certification',
      'awards.item3': '1st Place - University of Colorado Boulder - Emerging Tech Competition 2009',
      'awards.item4': '1st Place - University of Colorado Boulder - Adobe Creative Jam 2008 (UI Design Category)',
      'awards.item5': '2nd Place - University of Colorado Boulder - Emerging Tech Competition 2008',
      'awards.item6': '1st Place - James Buchanan High School - Hackathon 2006',
      'awards.item7': '3rd Place - James Buchanan High School - Hackathon 2005'
    }
  };

  // Additional period/date translations
  // (these keys are used for date spans in the markup)
  translations.es['experience.job1.period'] = 'Julio 2025 - Septiembre 2025';
  translations.es['education.institution1.period'] = 'Septiembre 2024 - Actualidad';
  translations.es['education.institution2.period'] = 'Septiembre 2022 - Junio 2024';
  translations.en['experience.job1.period'] = 'July 2025 - September 2025';
  translations.en['education.institution1.period'] = 'September 2024 - Present';
  translations.en['education.institution2.period'] = 'September 2022 - June 2024';

  // Inline SVG flags (simple stylized versions)
  const FLAG_ES = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bandera España"><rect width="30" height="20" fill="#C60B1E"/><rect y="6" width="30" height="8" fill="#FFC400"/></svg>';
  const FLAG_GB = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flag UK"><rect width="30" height="20" fill="#012169"/><rect x="11" width="8" height="20" fill="#FFFFFF"/><rect x="11" width="8" height="20" fill="#C8102E" style="transform:translateX(1px)"/><rect y="6" width="30" height="8" fill="#FFFFFF"/><rect y="6" width="30" height="8" fill="#C8102E" style="transform:translateY(1px)"/></svg>';

  function setLang(lang){
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(node => {
      const key = node.getAttribute('data-i18n');
      const text = translations[lang] && translations[lang][key];
      if(text) node.innerHTML = text;
    });
    localStorage.setItem('site_lang', lang);
    // update active button styling
    updateButtons(lang);
  }

  function updateButtons(lang){
    const es = document.getElementById('btn-lang-es');
    const en = document.getElementById('btn-lang-en');
    const toggle = document.getElementById('lang-toggle');
    // If separate ES/EN buttons exist, keep original styling behavior
    if(es && en){
      if(lang === 'es'){
        es.classList.remove('btn-outline-light');
        es.classList.add('btn-light');
        en.classList.remove('btn-light');
        en.classList.add('btn-outline-light');
      } else {
        en.classList.remove('btn-outline-light');
        en.classList.add('btn-light');
        es.classList.remove('btn-light');
        es.classList.add('btn-outline-light');
      }
    }
    // If a single toggle button exists, update its flag/icon and aria state
    if(toggle){
      const isEs = lang === 'es';
      toggle.innerHTML = isEs ? FLAG_ES : FLAG_GB;
      toggle.setAttribute('aria-pressed', String(isEs));
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    const stored = localStorage.getItem('site_lang') || 'es';
    // attach handlers
    const btnEs = document.getElementById('btn-lang-es');
    const btnEn = document.getElementById('btn-lang-en');
    const langToggle = document.getElementById('lang-toggle');
    if(btnEs) btnEs.addEventListener('click', () => setLang('es'));
    if(btnEn) btnEn.addEventListener('click', () => setLang('en'));
    if(langToggle) langToggle.addEventListener('click', () => {
      const cur = localStorage.getItem('site_lang') || 'es';
      const next = cur === 'es' ? 'en' : 'es';
      setLang(next);
    });
    // initialize
    setLang(stored);
  });
})();
