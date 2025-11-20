// Ofuscador de email: soporta data-b64 o data-user + data-domain
(function () {
  // Mapa de claves -> email en base64.
  // Nota: poner aquí la base64 evita que el email aparezca en el HTML/Elements,
  // pero seguirá en el archivo JS (Sources). Esto reduce exposición al inspeccionar Elements.
  var EMAIL_MAP = {
    // clave: base64(email)
    'a1': 'YWRyaWFuYm96YTQ3QGdtYWlsLmNvbQ=='
  };

  function deobfuscateFromBase64(b64) {
    try {
      return atob(b64);
    } catch (e) {
      return '';
    }
  }

  function drawTextOnCanvas(canvas, text, opts) {
    opts = opts || {};
    var ctx = canvas.getContext('2d');
    var font = opts.font || '16px Arial';
    var padding = opts.padding || 4;

    // set temporary font to measure
    ctx.font = font;
    var metrics = ctx.measureText(text);
    var textWidth = Math.ceil(metrics.width);
    // use available metrics if present
    var ascent = Math.ceil(metrics.actualBoundingBoxAscent || parseInt(font, 10));
    var descent = Math.ceil(metrics.actualBoundingBoxDescent || Math.max(2, parseInt(font, 10) * 0.2));
    var textHeight = ascent + descent;

    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    // redraw with proper size
    ctx = canvas.getContext('2d');
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.fillStyle = opts.color || '#000';
    ctx.fillText(text, padding, padding);

    // underline if requested
    if (opts.underline) {
      var lineY = padding + ascent + 1;
      var lineHeight = Math.max(1, Math.round(parseInt(font, 10) / 15));
      ctx.fillRect(padding, lineY, textWidth, lineHeight);
    }
  }

  function handleCanvasMode(el) {
    var key = el.dataset.key;
    var b64 = EMAIL_MAP[key];
    if (!b64) return;
    var email = deobfuscateFromBase64(b64);
    if (!email) return;
    // obtener estilos computados del elemento contenedor para aproximar el estilo original
    var parent = el.parentElement || el;
    var cs = window.getComputedStyle(parent);
    // prefer the shorthand font if available, fallback to composing
    var fontStr = cs.font || (cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily);
    var color = cs.color || '#000';
    var textDecoration = cs.textDecorationLine || cs.textDecoration || '';
    var underline = textDecoration.indexOf && textDecoration.indexOf('underline') !== -1;

    // dibujar email en el canvas con estilos similares
    drawTextOnCanvas(el, email, { font: fontStr, color: color, padding: 2, underline: underline });
    // Añadimos un comportamiento de clic para abrir el cliente de correo
    el.style.cursor = 'pointer';
    el.addEventListener('click', function () {
      window.location.href = 'mailto:' + email;
    });
  }

  function initObfuscatedEmails(selector) {
    selector = selector || '.email-obfuscado';
    document.querySelectorAll(selector).forEach(function (el) {
      var mode = el.dataset.mode || 'auto';
      if (mode === 'canvas') {
        // ensure it's actually a canvas element
        if (el.tagName.toLowerCase() !== 'canvas') return;
        handleCanvasMode(el);
        return;
      }
      // Fallback: leave previous behaviors (auto/click/entities) if required
      if (mode === 'entities') {
        var b64 = el.dataset.b64 || null;
        var emailEnt = '';
        if (b64) emailEnt = deobfuscateFromBase64(b64);
        else if (el.dataset.user && el.dataset.domain) emailEnt = el.dataset.user + '@' + el.dataset.domain;
        if (emailEnt) el.innerHTML = emailEnt.split('').map(function (c) { return '&#' + c.charCodeAt(0) + ';'; }).join('');
        return;
      }
      if (mode === 'auto') {
        var b64 = el.dataset.b64 || null;
        var email = '';
        if (b64) email = deobfuscateFromBase64(b64);
        else if (el.dataset.user && el.dataset.domain) email = el.dataset.user + '@' + el.dataset.domain;
        if (!email) return;
        var a = document.createElement('a');
        a.href = 'mailto:' + email;
        a.textContent = el.dataset.text || email;
        el.innerHTML = '';
        el.appendChild(a);
        return;
      }
      // click mode
      if (mode === 'click') {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = el.dataset.buttonText || 'Mostrar email';
        btn.addEventListener('click', function () {
          var b64 = el.dataset.b64 || null;
          var email = '';
          if (b64) email = deobfuscateFromBase64(b64);
          else if (el.dataset.user && el.dataset.domain) email = el.dataset.user + '@' + el.dataset.domain;
          if (!email) return;
          var a = document.createElement('a');
          a.href = 'mailto:' + email;
          a.textContent = el.dataset.text || email;
          el.innerHTML = '';
          el.appendChild(a);
        });
        el.appendChild(btn);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initObfuscatedEmails(); });
  } else {
    initObfuscatedEmails();
  }

  window.OfuscadorEmail = {
    init: initObfuscatedEmails,
    EMAIL_MAP: EMAIL_MAP
  };
})();
// Ofuscador de email: base64 + entidades + revelado bajo demanda

function obfuscateToBase64(email) {
  return btoa(email);
}

function deobfuscateFromBase64(b64) {
  try {
    return atob(b64);
  } catch (e) {
    return '';
  }
}

function obfuscateToEntities(email) {
  return email.split('').map(c => '&#' + c.charCodeAt(0) + ';').join('');
}

function revealEmailFromB64(el, showText) {
  const b64 = el.dataset.b64 || el.getAttribute('data-b64');
  if (!b64) return;
  const email = deobfuscateFromBase64(b64);
  if (!email) return;
  const a = document.createElement('a');
  a.href = 'mailto:' + email;
  a.textContent = showText || email;
  el.innerHTML = '';
  el.appendChild(a);
}

function initObfuscatedEmails(selector = '.email-obfuscado') {
  document.querySelectorAll(selector).forEach(el => {
    const mode = el.dataset.mode || 'auto'; // 'auto' | 'click' | 'entities'
    const b64 = el.dataset.b64;
    if (!b64) return;

    if (mode === 'entities') {
      const email = deobfuscateFromBase64(b64);
      el.innerHTML = obfuscateToEntities(email);
      return;
    }

    // modo 'auto' muestra el enlace inmediatamente (construido por JS)
    if (mode === 'auto') {
      revealEmailFromB64(el, el.dataset.text);
      return;
    }

    // modo 'click' deja un botón para revelar al pulsar
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = el.dataset.buttonText || 'Mostrar email';
    btn.addEventListener('click', () => revealEmailFromB64(el, el.dataset.text));
    el.appendChild(btn);
  });
}

// Auto-inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => initObfuscatedEmails());