/* ══════════════════════════════════════════════════════════
   DEMO KIT — shared animation engine for wireframe demos
   Used by home + every project page. One system, one place to fix bugs.
   See context/DESIGN-SYSTEM.md for full usage docs + examples.
   ══════════════════════════════════════════════════════════ */
(function(global){
  'use strict';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. 3D tilt + spotlight hover — attach to any card/frame ---- */
  function tilt3D(el, opts){
    if(!el || reduced) return;
    opts = opts || {};
    var maxX = opts.maxX != null ? opts.maxX : 4, maxY = opts.maxY != null ? opts.maxY : 5;
    el.classList.add('ds-card-3d');
    el.addEventListener('pointermove', function(e){
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.transform = 'rotateX(' + ((py - .5) * -maxX).toFixed(2) + 'deg) rotateY(' + ((px - .5) * maxY).toFixed(2) + 'deg) translateY(-3px)';
      el.style.setProperty('--lx', (px * 100).toFixed(1) + '%');
      el.style.setProperty('--ly', (py * 100).toFixed(1) + '%');
      el.classList.add('ds-hover');
    });
    el.addEventListener('pointerleave', function(){
      el.style.transform = '';
      el.classList.remove('ds-hover');
    });
  }

  /* ---- 2. Timer helper — each demo instance gets its own isolated timer queue ---- */
  function makeTimers(){
    var t = [];
    return {
      after: function(ms, fn){ t.push(setTimeout(fn, reduced ? 1 : ms)); },
      clear: function(){ t.forEach(clearTimeout); t = []; }
    };
  }

  /* ---- 3. Single visitor cursor (ring + dot, pulses) — for a single walkthrough ---- */
  function cursor(container){
    var c = document.createElement('div');
    c.className = 'wf-cur';
    c.innerHTML = '<span class="wf-cur-ring"></span><span class="wf-cur-dot"></span>';
    container.appendChild(c);
    return {
      el: c,
      moveTo: function(targetEl, offsetX, offsetY){
        var r = targetEl.getBoundingClientRect(), wr = container.getBoundingClientRect();
        c.style.left = (r.left - wr.left + (offsetX || 20)) + 'px';
        c.style.top = (r.top - wr.top + (offsetY || 20)) + 'px';
        c.classList.add('show');
      },
      hide: function(){ c.classList.remove('show'); }
    };
  }

  /* ---- 4. Multi-visitor cursors (colored arrow + tag) — for "several users at once" ---- */
  function visitorCursor(container, color, label){
    var u = document.createElement('div');
    u.className = 'wf-vcur';
    u.innerHTML = '<svg viewBox="0 0 24 24" fill="' + color + '"><path d="M4 2l16 8-7 2-2 7z"/></svg>' +
      '<span class="wf-vtag" style="background:' + color + '">' + label + '</span>';
    container.appendChild(u);
    return {
      el: u,
      moveTo: function(targetEl, cb, timers){
        var r = targetEl.getBoundingClientRect(), wr = container.getBoundingClientRect();
        u.style.left = (r.left - wr.left + 20) + 'px';
        u.style.top = (r.top - wr.top + 16) + 'px';
        u.classList.add('show');
        if(cb) (timers ? timers.after(750, cb) : setTimeout(cb, 750));
      },
      dropOff: function(targetEl, timers){
        var r = targetEl.getBoundingClientRect(), wr = container.getBoundingClientRect();
        var q = document.createElement('span'); q.className = 'wf-qmark'; q.textContent = '???';
        q.style.left = (r.left - wr.left + 30) + 'px'; q.style.top = (r.top - wr.top - 16) + 'px';
        container.appendChild(q);
        requestAnimationFrame(function(){ requestAnimationFrame(function(){ q.style.opacity = '1'; }); });
        var hide = function(){ u.style.opacity = '0'; };
        timers ? timers.after(900, hide) : setTimeout(hide, 900);
      }
    };
  }

  /* ---- 5. Funnel chart — pass values 0-100, renders + animates bars, flags the drop ---- */
  function funnel(container, values, labels, dropIndex, timers){
    var barsHtml = values.map(function(v, i){ return '<div class="wf-funnel-bar' + (i === dropIndex ? ' drop' : '') + '" id="wfb' + i + '" style="height:2px;"></div>'; }).join('');
    var lblHtml = labels.map(function(l){ return '<div class="wf-funnel-lbl">' + l + '</div>'; }).join('');
    container.innerHTML =
      '<div class="wf-funnel">' + barsHtml + '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(' + values.length + ',1fr);gap:6px;">' + lblHtml + '</div>';
    values.forEach(function(v, i){
      var fn = function(){ var el = document.getElementById('wfb' + i); if(el) el.style.height = (v * 0.6) + 'px'; };
      timers ? timers.after(i * 140, fn) : setTimeout(fn, i * 140);
    });
  }

  /* ---- 6. Segment table — checkbox-select rows in sequence, then reveal a replay list ----
     rows: [{id,color,name,meta}], picks: array of ids to check off in order,
     chipText: label for the resulting segment chip, replays: array of strings for the reveal list */
  function segmentTable(container, rows, picks, chipText, replays, timers){
    var rowsHtml = rows.map(function(r){
      return '<div class="wf-row" id="' + r.id + '"><span class="wf-cb" id="' + r.id + 'cb"></span>' +
        '<span class="wf-ud" style="background:' + r.color + '"></span>' + r.name +
        '<span class="wf-meta">' + r.meta + '</span></div>';
    }).join('');
    container.innerHTML =
      '<div class="wf-tbl">' + rowsHtml + '</div>' +
      '<span class="wf-chip" id="wfChip">' + chipText + '</span>' +
      '<div class="wf-replist" id="wfRepList"></div>';
    function pick(pi){
      if(pi >= picks.length){ timers.after(400, segment); return; }
      timers.after(pi === 0 ? 400 : 500, function(){
        var r = document.getElementById(picks[pi]), cb = document.getElementById(picks[pi] + 'cb');
        if(r){ r.classList.add('sel'); cb.textContent = '✓'; }
        pick(pi + 1);
      });
    }
    function segment(){
      var chip = document.getElementById('wfChip'); if(chip) chip.classList.add('in');
      timers.after(500, revealReplays);
    }
    function revealReplays(){
      var list = document.getElementById('wfRepList'); if(!list) return;
      replays.forEach(function(t, ti){
        timers.after(ti * 200, function(){
          var d = document.createElement('div'); d.className = 'wf-rep'; d.textContent = t;
          list.appendChild(d);
          requestAnimationFrame(function(){ requestAnimationFrame(function(){ d.classList.add('in'); }); });
        });
      });
    }
    pick(0);
  }

  /* ---- 7. Dual path — two panels animate in parallel, converge into a result ----
     handLabel/aiLabel: header text (pass real icon HTML if you have one),
     handArtboards: count of artboard placeholders, aiTree: array of {text} for the file list,
     mergeBadge/mergeText: the final converged result panel */
  function dualPath(container, opts, timers){
    var artHtml = Array(opts.handArtboards || 2).fill(0).map(function(_, i){
      return '<div class="wf-art" id="wfArt' + i + '"><i style="left:6px;top:6px;width:26px;height:4px"></i><i style="left:6px;top:14px;width:' + (30 + i * 8) + 'px;height:4px"></i></div>';
    }).join('');
    var treeHtml = opts.aiTree.map(function(item, i){
      return '<div id="wfTree' + i + '">' + item + '</div>';
    }).join('');
    container.innerHTML =
      '<div class="wf-paths">' +
        '<div class="wf-path"><div class="wf-path-h">' + opts.handLabel + '</div>' + artHtml + '</div>' +
        '<div class="wf-path"><div class="wf-path-h">' + opts.aiLabel + '</div><div class="wf-tree">' + treeHtml + '</div></div>' +
      '</div>' +
      '<div class="wf-merge" id="wfMerge"><div class="wf-merge-badge">' + opts.mergeBadge + '</div>' +
      '<div style="font-size:11px;color:var(--text-secondary,#aaa);margin-top:4px;">' + opts.mergeText + '</div></div>';
    for(var i = 0; i < (opts.handArtboards || 2); i++){
      (function(i){ timers.after(400 + i * 500, function(){ var e = document.getElementById('wfArt' + i); if(e) e.classList.add('in'); }); })(i);
    }
    opts.aiTree.forEach(function(_, i){
      timers.after(500 + i * 450, function(){ var e = document.getElementById('wfTree' + i); if(e) e.classList.add('in'); });
    });
    timers.after(2200, function(){ var e = document.getElementById('wfMerge'); if(e) e.classList.add('in'); });
  }

  /* ---- 8. Scroll zoom — element scales in from `from` as it enters viewport ----
     Uses IntersectionObserver (all browsers). On supported browsers, CSS
     scroll-driven (@keyframes + animation-timeline:view()) is faster but
     this JS version works everywhere and is the safe default.
     Returns the IntersectionObserver so caller can unobserve early if needed. */
  function scrollZoom(el, opts){
    if(!el || reduced) return;
    opts = opts || {};
    var fromScale = opts.from != null ? opts.from : 0.65;
    var dur = opts.dur || 700;
    var easing = opts.easing || 'cubic-bezier(.22,1,.36,1)';
    el.style.transform = 'scale(' + fromScale + ')';
    el.style.opacity = '0';
    el.style.transition = 'transform ' + dur + 'ms ' + easing + ', opacity ' + Math.round(dur * 0.7) + 'ms ease-out';
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        entry.target.style.transform = 'scale(1)';
        entry.target.style.opacity = '1';
        io.unobserve(entry.target);
      });
    }, { threshold: opts.threshold || 0.2 });
    io.observe(el);
    return io;
  }

  /* ---- 9. Region zoom — click targets zoom into a specific area, spring + annotation ----
     el: the panel that will scale.
     opts.scale: target scale factor (default 2.2).
     opts.dur: transition duration ms (default 600).
     Returns { activate(ox%, oy%, annEl), reset(), isZoomed() }
     activate() is idempotent — second call resets.
     annEl (optional): element whose opacity is toggled after spring settles. */
  function regionZoom(el, opts){
    if(!el) return;
    opts = opts || {};
    var scale = opts.scale || 2.2;
    var dur = opts.dur || 600;
    var spring = 'cubic-bezier(.34,1.56,.64,1)';
    var zoomed = false;
    var annTimers = [];
    el.style.transition = 'transform ' + dur + 'ms ' + spring;
    function activate(ox, oy, annEl){
      if(!zoomed){
        el.style.transformOrigin = ox + '% ' + oy + '%';
        el.style.transform = 'scale(' + scale + ')';
        zoomed = true;
        if(annEl && !reduced){
          annTimers.push(setTimeout(function(){
            annEl.style.opacity = '1';
            annTimers.push(setTimeout(function(){ annEl.style.opacity = '0'; }, 2000));
          }, 550)); /* 550ms = after spring settles, not during overshoot */
        }
      } else {
        annTimers.forEach(clearTimeout); annTimers = [];
        if(annEl) annEl.style.opacity = '0';
        el.style.transform = 'scale(1)';
        zoomed = false;
      }
    }
    return {
      activate: activate,
      reset: function(){
        annTimers.forEach(clearTimeout); annTimers = [];
        el.style.transform = 'scale(1)';
        zoomed = false;
      },
      isZoomed: function(){ return zoomed; }
    };
  }

  /* ---- 10. Spotlight — radial gradient veil follows cursor over a stage ----
     stage: the container element (position:relative expected).
     veil: an absolutely-positioned overlay element already in the DOM.
     opts.radius: spotlight circle radius px (default 160).
     opts.dark: overlay opacity 0-1 (default 0.80).
     opts.color: dark overlay RGB string (default '6,6,14').
     Returns a destroy() function to remove event listeners. */
  function spotlight(stage, veil, opts){
    if(!stage || !veil || reduced) return function(){};
    opts = opts || {};
    var r = opts.radius || 160;
    var alpha = opts.dark != null ? opts.dark : 0.80;
    var col = opts.color || '6,6,14';
    veil.style.position = 'absolute';
    veil.style.inset = '0';
    veil.style.pointerEvents = 'none';
    veil.style.background = 'radial-gradient(circle ' + r + 'px at var(--sx,50%) var(--sy,50%), transparent 0%, rgba(' + col + ',' + alpha + ') 100%)';
    function onMove(e){
      var rect = stage.getBoundingClientRect();
      veil.style.setProperty('--sx', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
      veil.style.setProperty('--sy', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
    }
    function onLeave(){
      veil.style.setProperty('--sx', '50%');
      veil.style.setProperty('--sy', '50%');
    }
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    return function destroy(){
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
    };
  }

  /* ---- 11. Clip reveal — sweeps UI into view via clip-path ----
     opts.dir: 'ltr'(default) | 'rtl' | 'ttb' | 'btt'
     opts.dur: ms (default 700). opts.radius: border-radius kept during anim (default '10px').
     Returns { reveal(), hide(), toggle(force?) } — force=true reveals, false hides. */
  function clipReveal(el, opts){
    if(!el) return;
    opts = opts || {};
    var dur = opts.dur || 700;
    var easing = opts.easing || 'cubic-bezier(.22,1,.36,1)';
    var rad = opts.radius || '10px';
    var dir = opts.dir || 'ltr';
    var hidden = {
      ltr: 'inset(0 100% 0 0 round ' + rad + ')',
      rtl: 'inset(0 0 0 100% round ' + rad + ')',
      ttb: 'inset(0 0 100% 0 round ' + rad + ')',
      btt: 'inset(100% 0 0 0 round ' + rad + ')'
    };
    var shown = 'inset(0 0% 0 0 round ' + rad + ')';
    el.style.clipPath = hidden[dir] || hidden.ltr;
    if(!reduced) el.style.transition = 'clip-path ' + dur + 'ms ' + easing;
    function isVisible(){ return el.style.clipPath === shown; }
    return {
      reveal: function(){ el.style.clipPath = shown; },
      hide:   function(){ el.style.clipPath = hidden[dir] || hidden.ltr; },
      toggle: function(force){
        var show = force != null ? force : !isVisible();
        el.style.clipPath = show ? shown : (hidden[dir] || hidden.ltr);
      }
    };
  }

  /* ---- 12. Stagger reveal — reveals a list of elements in sequence ----
     els: NodeList or array.
     opts.delay: ms between items (default 80). opts.dur: each item transition ms (default 300).
     opts.dy: translateY start distance px (default 8). opts.timers: shared timer queue (optional). */
  function staggerReveal(els, opts){
    if(!els || !els.length) return;
    opts = opts || {};
    var delay = opts.delay || 80;
    var dur = opts.dur || 300;
    var easing = opts.easing || 'ease-out';
    var dy = opts.dy != null ? opts.dy : 8;
    var timers = opts.timers;
    Array.prototype.forEach.call(els, function(el, i){
      el.style.opacity = '0';
      el.style.transform = 'translateY(' + dy + 'px)';
      var fn = function(){
        if(!reduced) el.style.transition = 'opacity ' + dur + 'ms ' + easing + ', transform ' + dur + 'ms ' + easing;
        el.style.opacity = '1';
        el.style.transform = 'none';
      };
      timers ? timers.after(i * delay, fn) : setTimeout(fn, reduced ? 1 : i * delay);
    });
  }

  /* ---- 13. Animate counter — KPI number counts up with ease-out-cubic ----
     opts.dur: total duration ms (default 1400).
     opts.format: function(value) → string (default toLocaleString). */
  function animateCounter(el, from, to, opts){
    if(!el) return;
    opts = opts || {};
    var dur = opts.dur || 1400;
    var fmt = opts.format || function(v){ return Math.round(v).toLocaleString(); };
    if(reduced){ el.textContent = fmt(to); return; }
    var start = performance.now();
    function tick(now){
      var t = Math.min((now - start) / dur, 1);
      var ease = 1 - Math.pow(1 - t, 3); /* ease-out-cubic */
      el.textContent = fmt(from + (to - from) * ease);
      if(t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  global.DemoKit = {
    tilt3D: tilt3D,
    makeTimers: makeTimers,
    cursor: cursor,
    visitorCursor: visitorCursor,
    funnel: funnel,
    segmentTable: segmentTable,
    dualPath: dualPath,
    scrollZoom: scrollZoom,
    regionZoom: regionZoom,
    spotlight: spotlight,
    clipReveal: clipReveal,
    staggerReveal: staggerReveal,
    animateCounter: animateCounter,
    reducedMotion: reduced
  };
})(window);
