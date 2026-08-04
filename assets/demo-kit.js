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

  global.DemoKit = {
    tilt3D: tilt3D,
    makeTimers: makeTimers,
    cursor: cursor,
    visitorCursor: visitorCursor,
    funnel: funnel,
    segmentTable: segmentTable,
    dualPath: dualPath,
    reducedMotion: reduced
  };
})(window);
