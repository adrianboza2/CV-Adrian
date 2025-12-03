// Simple language switcher for the CV
// Stores chosen language in localStorage under 'site_lang'

(function(){
  const translations = {
    es: {
      'nav.about': 'Sobre mí',
      'nav.experience': 'Experiencia',
      'nav.education': 'Educación',
      'nav.skills': 'Habilidades',
      'about.lead': 'Soy un estudiante de administración de sistemas informáticos en red con gran motivación para adquirir experiencia en el sector. Estoy dispuesto a aprender, trabajar en equipo y aportar mis conocimientos en tecnología para contribuir al crecimiento de la empresa.',
      'section.experience': 'Experiencia',
      'section.education': 'Educación',
      'section.skills': 'Habilidades'
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
      /* awards removed */
    },
    en: {
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.education': 'Education',
      'nav.skills': 'Skills',
      'about.lead': 'I am a student of network systems administration with strong motivation to gain experience in the sector. I am willing to learn, work in teams and contribute my technical knowledge to help the company grow.',
      'section.experience': 'Experience',
      'section.education': 'Education',
      'section.skills': 'Skills'
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
      /* awards removed */
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

  // Emoji flags
  const FLAG_ES = '🇪🇸';
  const FLAG_GB = '🇬🇧';

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
    const toggle = document.getElementById('lang-toggle');
    if(toggle){
      // Show the flag of the language that will be selected when clicking (i.e. the "next" language)
      const next = lang === 'es' ? 'en' : 'es';
      const isNextEs = next === 'es';
      // Create span for emoji only - preserve existing HTML (the icon)
      let emojiSpan = toggle.querySelector('.lang-emoji');
      if(!emojiSpan) {
        emojiSpan = document.createElement('span');
        emojiSpan.className = 'lang-emoji';
        toggle.appendChild(emojiSpan);
      }
      emojiSpan.textContent = isNextEs ? FLAG_ES : FLAG_GB;
      
      // Title indicates the action, localized by current language
      if(lang === 'es') {
        toggle.setAttribute('title', isNextEs ? 'Cambiar a Español' : 'Cambiar a Inglés');
        toggle.setAttribute('aria-label', isNextEs ? 'Cambiar a Español' : 'Cambiar a Inglés');
      } else {
        toggle.setAttribute('title', isNextEs ? 'Switch to Spanish' : 'Switch to English');
        toggle.setAttribute('aria-label', isNextEs ? 'Switch to Spanish' : 'Switch to English');
      }
      // aria-pressed indicates whether the next language is currently active (false most of the time)
      toggle.setAttribute('aria-pressed', String(false));
      // For visual distinction: if next language is ES, show lighter background so it's visible — keep as outline otherwise
      if(isNextEs){
        toggle.classList.remove('btn-outline-light');
        toggle.classList.add('btn-light');
      } else {
        toggle.classList.remove('btn-light');
        toggle.classList.add('btn-outline-light');
      }
      // Mirror flag into mobile toggle if it exists
      const mobile = document.getElementById('mobile-lang-toggle');
      if(mobile){
        mobile.textContent = toggle.textContent;
        // mirror title and aria labels
        mobile.setAttribute('title', toggle.getAttribute('title'));
        mobile.setAttribute('aria-label', toggle.getAttribute('aria-label'));
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    const stored = localStorage.getItem('site_lang') || 'es';
    // attach handler to single language toggle
    const langToggle = document.getElementById('lang-toggle');
    if(langToggle) langToggle.addEventListener('click', () => {
      const cur = localStorage.getItem('site_lang') || 'es';
      const next = cur === 'es' ? 'en' : 'es';
      setLang(next);
    });
    // initialize
    setLang(stored);
  });
})();
