/* next/shared.js — helpers que van con shared.css.
   Un componente = un lugar donde vive su lógica, no HTML tipeado a mano
   en cada escena que lo usa. */

/* Stepper.render(el, steps, activeIndex)
   steps: array de strings. activeIndex: 0-based.
   Reemplaza cualquier <div class="stepper"> tipeado a mano por escena. */
var Stepper = {
  render: function (el, steps, activeIndex) {
    if (!el) return;
    el.innerHTML = steps.map(function (label, i) {
      var cls = i === activeIndex ? 'on' : (i < activeIndex ? 'done' : '');
      var mark = i < activeIndex ? ' ✓' : '';
      return '<span class="' + cls + '">' + (i + 1) + ' · ' + label + mark + '</span>';
    }).join('');
  }
};
