// pixel-dissolve intro: coarse noise blocks that shrink in resolution until the page shows through
(function(){const c=document.getElementById('pix'),x=c.getContext('2d'),r=document.getElementById('reveal');
let lvl=48;function draw(){const w=Math.max(4,Math.round(innerWidth/lvl)),h=Math.max(4,Math.round(innerHeight/lvl));c.width=w;c.height=h;
for(let i=0;i<w;i++)for(let j=0;j<h;j++){if(Math.random()<.22+lvl/70){const g=10+Math.random()*30;x.fillStyle=`rgb(${g},${g},${g+14})`;x.fillRect(i,j,1,1)}}
lvl=Math.floor(lvl*.8);if(lvl>1)setTimeout(draw,110);else{r.classList.add('done');document.body.classList.add('ready');setTimeout(()=>r.remove(),900)}}
draw()})();
// starfield
(function(){const c=document.getElementById('stars'),x=c.getContext('2d');let s=[];
function size(){c.width=c.offsetWidth;c.height=c.offsetHeight;s=Array.from({length:260},()=>({x:Math.random()*c.width,y:Math.random()*c.height*.62,r:Math.random()*1.3+.2,p:Math.random()*6.3,v:.5+Math.random()*1.5}))}
size();addEventListener('resize',size);
(function f(t){x.clearRect(0,0,c.width,c.height);for(const a of s){x.globalAlpha=(.35+.65*Math.abs(Math.sin(a.p+t/1000*a.v*.8)))*(1-a.y/(c.height*.7));x.fillStyle='#fff';x.fillRect(a.x,a.y,a.r,a.r)}requestAnimationFrame(f)})(0)})();
// galaxy card
(function(){const c=document.getElementById('galaxy'),x=c.getContext('2d');function size(){c.width=c.offsetWidth;c.height=c.offsetHeight}size();addEventListener('resize',size);
const P=[];for(let i=0;i<900;i++){const arm=i%2,d=Math.random()**.6,a=d*7+arm*Math.PI;P.push({d,a,j:(Math.random()-.5)*.35,s:Math.random()*1.4+.3,h:200+Math.random()*80})}
const F=Array.from({length:120},()=>({x:Math.random(),y:Math.random(),s:Math.random()*1.2+.2}));
(function f(t){x.clearRect(0,0,c.width,c.height);for(const q of F){x.fillStyle='rgba(255,255,255,.6)';x.fillRect(q.x*c.width,q.y*c.height,q.s,q.s)}
const cx=c.width*.28,cy=c.height*.7,R=c.width*.2,rot=t/9000;
for(const p of P){const a=p.a+rot*(1.2-p.d),px=cx+Math.cos(a+p.j)*p.d*R,py=cy+Math.sin(a+p.j)*p.d*R*.42;x.fillStyle=`hsla(${p.h-p.d*40},80%,${75-p.d*25}%,${.9-p.d*.5})`;x.fillRect(px,py,p.s,p.s)}
const g=x.createRadialGradient(cx,cy,0,cx,cy,R*.3);g.addColorStop(0,'rgba(255,230,200,.9)');g.addColorStop(1,'transparent');x.fillStyle=g;x.fillRect(cx-R,cy-R,R*2,R*2);
requestAnimationFrame(f)})(0)})();
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
