/* ── PORTFOLIO V2 — JS ENGINE ── */
(function(){

/* ── MESH ENGINE ── */
window.V2Mesh = function(canvas, opts){
  if(!canvas) return;
  opts = opts || {};
  var opacity = opts.opacity !== undefined ? opts.opacity : 1;
  var speed   = opts.speed   !== undefined ? opts.speed   : 0.5;
  var ctx = canvas.getContext('2d');
  var t=0, W=800, H=600, mx=0.65, my=0.45;
  function resize(){
    var rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width  = rect.width  > 10 ? rect.width  : window.innerWidth;
    H = canvas.height = rect.height > 10 ? rect.height : window.innerHeight;
  }
  /* Delay resize until layout is painted */
  setTimeout(resize, 0);
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', function(e){
    var r = canvas.getBoundingClientRect();
    if(r.width < 1) return;
    mx = (e.clientX - r.left) / W;
    my = (e.clientY - r.top)  / H;
  });
  var CO=16, RO=11, CE=52;
  var CA=Math.cos(Math.PI/6), SA=Math.sin(Math.PI/6);
  function iso(x,y,z){ return { x:(x-y)*CA, y:(x+y)*SA-z }; }
  function ht(c,r,t){
    var nx=c/CO, ny=r/RO, dx=nx-mx, dy=ny-my, d=Math.sqrt(dx*dx+dy*dy);
    return (Math.sin(nx*7+t*speed)*Math.cos(ny*5+t*speed*0.8)
           +Math.sin(d*9-t*speed*2)*0.4
           +Math.cos(nx*4-ny*3+t*speed*0.6)*0.25)*22;
  }
  function frame(){
    if(W < 10 || H < 10){ setTimeout(function(){ requestAnimationFrame(frame); }, 100); return; }
    ctx.clearRect(0,0,W,H);
    var ox=W*0.7, oy=H*0.52, sc=Math.min(W,H)/440;
    var pts=[], r, c;
    for(r=0;r<=RO;r++){
      pts[r]=[];
      for(c=0;c<=CO;c++){
        var wx=(c-CO/2)*CE, wy=(r-RO/2)*CE, z=ht(c,r,t), p=iso(wx,wy,z*sc*1.3);
        pts[r][c]={sx:ox+p.x*sc, sy:oy+p.y*sc, z:z};
      }
    }
    for(r=0;r<RO;r++){
      for(c=0;c<CO;c++){
        var p00=pts[r][c],p10=pts[r][c+1],p01=pts[r+1][c],p11=pts[r+1][c+1];
        var az=(p00.z+p10.z+p01.z+p11.z)/4, n=(az+22)/44;
        ctx.beginPath();
        ctx.moveTo(p00.sx,p00.sy); ctx.lineTo(p10.sx,p10.sy);
        ctx.lineTo(p11.sx,p11.sy); ctx.lineTo(p01.sx,p01.sy);
        ctx.closePath();
        ctx.fillStyle='rgba('+Math.floor(n*140+10)+','+Math.floor(n*90+6)+','+Math.floor(n*10)+','+(0.018+n*0.032)*opacity+')';
        ctx.fill();
        ctx.strokeStyle='rgba(200,168,75,'+(0.04+n*0.15)*opacity+')';
        ctx.lineWidth=0.35; ctx.stroke();
      }
    }
    for(r=0;r<=RO;r++){
      for(c=0;c<=CO;c++){
        var p=pts[r][c], n=(p.z+22)/44;
        if(n>0.68){
          var ii=(n-0.68)/0.32;
          ctx.beginPath(); ctx.arc(p.sx,p.sy,ii*2.4,0,Math.PI*2);
          ctx.fillStyle='rgba(200,168,75,'+(ii*0.75)*opacity+')'; ctx.fill();
          if(ii>0.5){
            var g=ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,ii*14);
            g.addColorStop(0,'rgba(200,168,75,'+(ii*0.1)*opacity+')');
            g.addColorStop(1,'rgba(200,168,75,0)');
            ctx.beginPath(); ctx.arc(p.sx,p.sy,ii*14,0,Math.PI*2);
            ctx.fillStyle=g; ctx.fill();
          }
        }
      }
    }
    t+=0.011; requestAnimationFrame(frame);
  }
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    /* Start after first paint */
    requestAnimationFrame(function(){
      resize();
      requestAnimationFrame(frame);
    });
  }
};

/* ── SCROLL REVEAL ── */
function initReveal(){
  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('[data-v2]').forEach(function(el){ el.classList.add('v2-in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var siblings = Array.from(e.target.parentElement.querySelectorAll('[data-v2]:not(.v2-in)'));
      var idx = siblings.indexOf(e.target);
      setTimeout(function(){ e.target.classList.add('v2-in'); }, idx * 90);
      io.unobserve(e.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-v2]').forEach(function(el){ io.observe(el); });
}

/* ── KEYWORD UNDERLINE on scroll ── */
function initKwSection(){
  if(!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('v2-vis'); io.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.kw-s').forEach(function(el){ io.observe(el); });
}

/* ── CARD 3D TILT ── */
function initCardTilt(){
  document.querySelectorAll('.project-card').forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var r = card.getBoundingClientRect();
      var x = (e.clientX-r.left)/r.width  - 0.5;
      var y = (e.clientY-r.top) /r.height - 0.5;
      card.style.transform = 'perspective(900px) rotateX('+(-y*5)+'deg) rotateY('+(x*3)+'deg) translateY(-6px)';
    });
    card.addEventListener('mouseleave', function(){
      card.style.transform = '';
    });
  });
}

/* ── COUNTER ANIMATION ── */
window.V2Counter = function(el, target, suffix, prefix, duration){
  if(!el) return;
  prefix   = prefix   || '';
  suffix   = suffix   || '';
  duration = duration || 1400;
  var start=0, step=16;
  var timer = setInterval(function(){
    start += Math.ceil(target/(duration/step));
    if(start >= target){ start=target; clearInterval(timer); }
    el.textContent = prefix + start + suffix;
  }, step);
};

/* ── INIT ── */
initReveal();
initKwSection();
initCardTilt();
/* Init meshes after layout */
requestAnimationFrame(function(){
  requestAnimationFrame(function(){
    document.querySelectorAll('canvas[data-mesh]').forEach(function(c){
      new V2Mesh(c, {
        opacity: parseFloat(c.dataset.opacity || '1'),
        speed:   parseFloat(c.dataset.speed   || '0.5')
      });
    });
  });
});

})();
