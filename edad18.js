/* Aviso de mayoría de edad (+18) para kiosco-isi-loterias.es y combinario.es.
   Se muestra la primera vez; la respuesta «soy mayor» se recuerda en este navegador
   (almacenamiento técnico necesario para el propio aviso; no es una cookie de seguimiento).
   Color principal: atributo data-color del <script> (por defecto verde Combinario). */
(function () {
  'use strict';
  var CLAVE = 'aviso-18-ok';
  try { if (localStorage.getItem(CLAVE) === '1') return; } catch (e) { /* sin almacenamiento: se pregunta cada vez */ }
  var yo = document.currentScript;
  var color = (yo && yo.getAttribute('data-color')) || '#13352B';

  function montar() {
    if (document.getElementById('av18')) return;
    var css = document.createElement('style');
    css.textContent =
      '#av18,#av18 *{box-sizing:border-box}#av18{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:16px;' +
      'background:rgba(10,20,16,.72);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);' +
      'font:400 16px/1.5 Poppins,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
      '#av18 .c{background:#fff;color:#1d2420;max-width:420px;width:100%;border-radius:18px;padding:24px 22px;' +
      'box-shadow:0 20px 50px rgba(0,0,0,.35);text-align:center}' +
      '#av18 .n{display:inline-grid;place-items:center;width:64px;height:64px;border-radius:50%;' +
      'border:4px solid #b3261e;color:#b3261e;font-weight:800;font-size:22px;margin-bottom:8px}' +
      '#av18 h2{margin:4px 0 8px;font-size:22px;line-height:1.25;color:#1d2420}' +
      '#av18 p{margin:0 0 10px;color:#3c4741}' +
      '#av18 .b{display:block;width:100%;min-height:48px;margin-top:10px;border-radius:12px;font-family:inherit;font-weight:600;font-size:16px;line-height:1.2;' +
      'cursor:pointer;border:2px solid ' + color + '}' +
      '#av18 .si{background:' + color + ';color:#fff}' +
      '#av18 .no{background:#fff;color:' + color + '}' +
      '#av18 .b:focus-visible{outline:3px solid #c9a227;outline-offset:2px}' +
      '#av18 .p{font-size:13px;color:#56605a;margin-top:14px}' +
      '#av18 a{color:#1d2420;font-weight:600}' +
      'html.av18-on,html.av18-on body{overflow:hidden!important}' +
      '@media (prefers-color-scheme:dark){#av18 .c{background:#17211c;color:#edefea}#av18 .n{color:#f28b82;border-color:#f28b82}#av18 h2{color:#edefea}' +
      '#av18 p{color:#c9d1cb}#av18 .p{color:#aab4ad}#av18 a{color:#edefea}#av18 .no{background:#17211c;color:#edefea;border-color:#7fb79f}}';
    document.head.appendChild(css);

    var caja = document.createElement('div');
    caja.id = 'av18';
    caja.setAttribute('role', 'dialog');
    caja.setAttribute('aria-modal', 'true');
    caja.setAttribute('aria-labelledby', 'av18-t');
    caja.setAttribute('aria-describedby', 'av18-d');
    caja.innerHTML =
      '<div class="c">' +
      '<div class="n" aria-hidden="true">+18</div>' +
      '<h2 id="av18-t">Solo para mayores de 18 años</h2>' +
      '<p id="av18-d">Esta web trata sobre juegos de azar. Para entrar, confirma que eres mayor de edad.</p>' +
      '<button type="button" class="b si" id="av18-si">Soy mayor de 18 años</button>' +
      '<button type="button" class="b no" id="av18-no">Soy menor de 18 años</button>' +
      '<p class="p"><b>La ludopatía es un riesgo del juego.</b> Juega con responsabilidad. ' +
      'Información: <a href="https://www.juegoseguro.es" rel="noopener">www.juegoseguro.es</a></p>' +
      '</div>';

    // El resto de la página queda inactiva mientras está el aviso
    var otros = [].slice.call(document.body.children);
    otros.forEach(function (el) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); });
    document.body.appendChild(caja);
    document.documentElement.classList.add('av18-on');
    var si = document.getElementById('av18-si');
    si.focus();

    // Tabulador dentro del aviso
    caja.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = caja.querySelectorAll('button,a[href]');
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { z.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === z) { a.focus(); e.preventDefault(); }
    });

    si.addEventListener('click', function () {
      try { localStorage.setItem(CLAVE, '1'); } catch (e) {}
      otros.forEach(function (el) { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); });
      document.documentElement.classList.remove('av18-on');
      caja.remove();
    });

    document.getElementById('av18-no').addEventListener('click', function () {
      caja.querySelector('.c').innerHTML =
        '<div class="n" aria-hidden="true">+18</div>' +
        '<h2 id="av18-t" tabindex="-1">Esta web no es para menores de 18 años</h2>' +
        '<p id="av18-d">Los juegos de azar están prohibidos a los menores de edad.</p>' +
        '<p class="p">Si necesitas ayuda o información: ' +
        '<a href="https://www.juegoseguro.es" rel="noopener">www.juegoseguro.es</a></p>';
      document.getElementById('av18-t').focus();
    });
  }

  if (document.body) montar();
  else document.addEventListener('DOMContentLoaded', montar);
})();
