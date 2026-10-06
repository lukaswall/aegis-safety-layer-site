// pixel-dissolve intro: coarse noise blocks that shrink in resolution until the page shows through
(function(){const c=document.getElementById('pix'),x=c.getContext('2d'),r=document.getElementById('reveal');
let lvl=48;function draw(){const w=Math.max(4,Math.round(innerWidth/lvl)),h=Math.max(4,Math.round(innerHeight/lvl));c.width=w;c.height=h;
for(let i=0;i<w;i++)for(let j=0;j<h;j++){if(Math.random()<.22+lvl/70){const g=10+Math.random()*30;x.fillStyle=`rgb(${g},${g},${g+14})`;x.fillRect(i,j,1,1)}}
lvl=Math.floor(lvl*.8);if(lvl>1)setTimeout(draw,110);else{r.classList.add('done');document.body.classList.add('ready');setTimeout(()=>r.remove(),900)}}
draw()})();
// AI artwork replaces the procedural starfield and galaxy backgrounds.
// nav, statement scrub, fade-in, counters
const nav=document.getElementById('nav');const onS=()=>nav.classList.toggle('solid',scrollY>innerHeight*.8);addEventListener('scroll',onS);onS();
const h=document.getElementById('scrub');const words=h.textContent.split(' ');h.innerHTML=words.map(w=>`<span>${w}</span>`).join(' ');const sp=[...h.children];
function scrub(){const r=h.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(innerHeight*.5)));sp.forEach((s,i)=>s.classList.toggle('on',i/sp.length<p))}addEventListener('scroll',scrub);scrub();
document.querySelectorAll('.card,.steer,.statement h2.big,.st,.safety h2').forEach(e=>e.classList.add('fade'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');const b=e.target.querySelector&&e.target.querySelector('b[data-n]');if(b)cnt(b);io.unobserve(e.target)}}),{threshold:0,rootMargin:"0px 0px -5% 0px"});
document.querySelectorAll('.fade').forEach(e=>io.observe(e));
function cnt(b){const n=+b.dataset.n,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-k,3);b.textContent=b.dataset.s+Math.round(n*e)+b.dataset.e;if(k<1)requestAnimationFrame(f)})(t0)}
// fallback reveal on scroll (covers jump-scrolling and throttled observers)
function chk(){document.querySelectorAll('.fade:not(.in)').forEach(e=>{if(e.getBoundingClientRect().top<innerHeight*.95){e.classList.add('in');const b=e.querySelector('b[data-n]');if(b)cnt(b)}})}
addEventListener('scroll',chk,{passive:true});setInterval(chk,400);chk();
