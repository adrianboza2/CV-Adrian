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
      'education.track': 'Computer Science - Web Development Track',
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
    if(!es || !en) return;
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

  document.addEventListener('DOMContentLoaded', function(){
    const stored = localStorage.getItem('site_lang') || 'es';
    // attach handlers
    const btnEs = document.getElementById('btn-lang-es');
    const btnEn = document.getElementById('btn-lang-en');
    if(btnEs) btnEs.addEventListener('click', () => setLang('es'));
    if(btnEn) btnEn.addEventListener('click', () => setLang('en'));
    // initialize
    setLang(stored);
  });
})();
