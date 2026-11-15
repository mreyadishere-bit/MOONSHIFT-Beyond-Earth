(()=>{
'use strict';
if(!window.Minigames || window.Minigames.__gardenV2)return;
window.Minigames.__gardenV2=true;
const css=document.createElement('style');
css.textContent='.task-overlay:has(.gd-game){backdrop-filter:none!important;background:rgba(3,10,17,.92)!important}.task-modal:has(.gd-game){width:min(1060px,96vw)!important;max-width:1060px!important;max-height:95dvh!important;overflow:auto!important;border:1px solid #3b6578!important;background:#091a26!important;box-shadow:0 24px 80px #000b!important}.task-modal:has(.gd-game) .task-header{padding:13px 20px!important;background:#112b3a!important}.task-modal:has(.gd-game) .task-body{padding:0!important;background:#091a26!important;max-height:none!important}.task-modal:has(.gd-game) .task-footer{padding:12px 20px!important;background:#102738!important;gap:10px}.task-modal:has(.gd-game) #taskGuideBtn{display:none}.task-modal:has(.gd-game) #taskActionBtn{background:#efac70!important;color:#0b1d26!important;border:0!important;border-radius:12px!important;padding:13px 22px!important;font-weight:900}.task-modal:has(.gd-game) .task-subtitle{font-size:12px!important}.gd-game{font:14px system-ui,Arial,sans-serif;color:#eaf6fa;padding:18px 19px 15px}.gd-intro{display:flex;gap:15px;justify-content:space-between;align-items:center;margin-bottom:15px}.gd-intro strong{font-size:19px;letter-spacing:-.03em}.gd-pill{display:inline-flex;align-items:center;gap:8px;background:#173644;border:1px solid #345b6c;border-radius:99px;padding:9px 12px;font-weight:750;white-space:nowrap}.gd-cols{display:grid;grid-template-columns:minmax(0,1fr) 210px;gap:16px}.gd-board{background:linear-gradient(145deg,#112c3b,#081923);border:1px solid #345568;border-radius:20px;padding:20px 16px;min-width:0;overflow:hidden}.gd-boardtop{display:flex;align-items:center;justify-content:space-between;color:#a6cfda;font-weight:800;letter-spacing:.05em;font-size:11px;margin:0 7px 14px}.gd-tiles{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;max-width:620px;margin:auto}.gd-tile{position:relative;aspect-ratio:1/1;border-radius:15px;border:1px solid #355769;background:linear-gradient(150deg,#1c4253,#112c3a);color:#e8f5fa;display:grid;place-items:center;padding:0;cursor:pointer;touch-action:manipulation;transition:border-color .16s,background .16s}.gd-tile:focus-visible{outline:3px solid #a0edfa;outline-offset:1px}.gd-tile:not(:disabled):hover{border-color:#85dbe6;background:#244d5e}.gd-tile:disabled{cursor:default}.gd-tile.empty{background:transparent;border:0;pointer-events:none}.gd-tile svg{width:85%;height:85%;display:block;transition:transform .17s ease}.gd-tile svg path{fill:none;stroke:#c8e1ec;stroke-width:14;stroke-linecap:round;stroke-linejoin:round}.gd-tile svg .inner{stroke:#3e819d;stroke-width:5}.gd-tile.wet{border-color:#5df0bb;background:#17484b}.gd-tile.wet svg path{stroke:#80f0d7}.gd-tile.wet svg .inner{stroke:#30c4e5}.gd-tile.leak{border-color:#eb8d7c;background:#432c36}.gd-tile .gd-label{position:absolute;bottom:1px;font-size:9px;font-weight:900;letter-spacing:.055em;color:#b2d6e3}.gd-tile .gd-tileicon{position:absolute;top:3px;right:6px;color:#efac70;font-size:13px}.gd-side{display:flex;flex-direction:column;gap:11px}.gd-stat{padding:14px;border:1px solid #315567;border-radius:16px;background:#102b3b}.gd-stat small{display:block;color:#95b8c9;font-size:11px;margin-bottom:5px}.gd-stat strong{font-size:25px;font-variant-numeric:tabular-nums}.gd-stat em{font-style:normal;color:#80dbbd;font-size:10px}.gd-meter{height:7px;background:#294657;border-radius:99px;margin-top:10px;overflow:hidden}.gd-meter i{display:block;height:100%;background:linear-gradient(90deg,#f1ab70,#77e3b3);width:100%;transition:width .3s}.gd-instruction{color:#bfd4dc;font-size:12px;margin:13px 5px 0}.gd-note{margin-top:15px;border-top:1px solid #254454;padding:12px 4px 0;color:#92b3c4;font-size:11px}.gd-note a{color:#a7e5ec}.gd-result{display:none;margin-top:14px;padding:14px;border-radius:14px;border:1px solid #589b8f;background:#173d41}.gd-result.show{display:block}.gd-result strong{display:block;font-size:17px;margin-bottom:4px}.gd-result p{margin:0;font-size:12px;line-height:1.5}.gd-status{color:#94d9e4}.gd-tile .gd-endpoint{font-size:25px}.gd-tiles .gd-tile:disabled{opacity:1}@media(max-width:720px){.gd-game{padding:12px}.gd-cols{grid-template-columns:1fr}.gd-side{display:grid;grid-template-columns:repeat(3,1fr)}.gd-stat{padding:9px}.gd-stat strong{font-size:19px}.gd-board{padding:12px 6px}.gd-tiles{gap:4px}.gd-tile{border-radius:9px}.gd-tile .gd-label{font-size:7px}.gd-intro strong{font-size:15px}.gd-instruction{font-size:11px}.task-modal:has(.gd-game) .task-footer{padding:8px!important}}';
document.head.appendChild(css);
window.Minigames.openGreenhouseLight=function(){
 const mgr=this, world=window.Engine?.currentWorld||'moon';
 const modal=mgr.createModal(world==='mars'?'MARS GREEN DOME':'MOON GARDEN','Repair the irrigation circuit and save the crop.','🌱');
 mgr.toggleGuide(false);
 const body=modal.querySelector('#taskBody'),hint=modal.querySelector('#taskHint'),cta=modal.querySelector('#taskActionBtn');
 const types=[
  null,{kind:'corner',rot:0,solve:1,x:1,y:0},{kind:'tee',rot:2,solve:1,x:2,y:0},{kind:'corner',rot:0,solve:2,x:3,y:0},null,
  {kind:'source',rot:0,x:0,y:1},{kind:'corner',rot:1,solve:3,x:1,y:1},{kind:'valve',closed:false,x:2,y:1},{kind:'corner',rot:2,solve:0,x:3,y:1},{kind:'target',rot:0,x:4,y:1}
 ];
 const cells=types.map(t=>t?{...t}:null); const D=['N','E','S','W'],delta=[[0,-1],[1,0],[0,1],[-1,0]];
 let seconds=90,water=100,health=42,started=false,finished=false,testing=false,leakSeen=false,delivered=false;
 body.innerHTML='<div class="gd-game"><div class="gd-intro"><strong>Restore water to the plants</strong><span class="gd-pill" id="gdClock">◷ 01:30</span></div><div class="gd-cols"><section class="gd-board"><div class="gd-boardtop"><span>IRRIGATION · CIRCUIT B</span><span class="gd-status" id="gdFlow">● OFFLINE</span></div><div class="gd-tiles" id="gdTiles"></div><p class="gd-instruction" id="gdHelp">Tap pipes to rotate · Close the red leak valve.</p></section><aside class="gd-side"><div class="gd-stat"><small>Water remaining</small><strong id="gdWater">100%</strong><div class="gd-meter"><i id="gdMeter"></i></div></div><div class="gd-stat"><small>Crop health</small><strong id="gdHealth">42%</strong></div><div class="gd-stat"><small>Flow to plants</small><strong id="gdDelivery">0%</strong></div></aside></div><div class="gd-result" id="gdResult"><strong id="gdResultTitle"></strong><p id="gdResultText"></p></div><div class="gd-note">Inspired by NASA <a href="https://www.nasa.gov/exploration-research-and-technology/growing-plants-in-space/" target="_blank" rel="noopener">Veggie</a> and <a href="https://technology.nasa.gov/patent/KSC-TOPS-81" target="_blank" rel="noopener">PONDS</a>: roots need both water and air. Plumbing, timer and scores are educational game models, not NASA measurements.</div></div>';
 const $=id=>body.querySelector('#'+id);
 const paths={corner:'M50 12 V50 H88',tee:'M50 12 V88 M50 50 H88',valve:'M50 12 V50',source:'M50 50 H88',target:'M12 50 H50'};
 const ports=t=>{
  if(t.kind==='source')return [1];if(t.kind==='target')return [3];if(t.kind==='valve')return [0];
  const base=t.kind==='corner'?[0,1]:[0,1,2];return base.map(x=>(x+t.rot)%4);
 };
 const pos=(x,y)=>cells[y*5+x]||null;
 const evaluate=()=>{
  const reachable=new Set([5]),queue=[5];let leak=false,reaches=false;
  while(queue.length){
   const i=queue.shift(),t=cells[i],x=i%5,y=Math.floor(i/5);
   for(const d of ports(t)){
    const xx=x+delta[d][0],yy=y+delta[d][1],n=pos(xx,yy);if(!n)continue;
    if(n.kind==='valve'){if(d===2&&!n.closed)leak=true;continue;}
    if(!ports(n).includes((d+2)%4))continue;
    const ni=yy*5+xx;if(reachable.has(ni))continue;reachable.add(ni);queue.push(ni);
    if(n.kind==='target')reaches=true;
   }
  }
  return {reachable,leak,reaches};
 };
 const draw=()=>{
  const e=evaluate();$('gdTiles').replaceChildren();
  cells.forEach((t,i)=>{
   const b=document.createElement('button');b.type='button';b.className='gd-tile'+(!t?' empty':'')+(t&&e.reachable.has(i)?' wet':'')+(t?.kind==='valve'&&!t.closed?' leak':'');
   if(!t){b.disabled=true;$('gdTiles').append(b);return;}
   b.setAttribute('aria-label',t.kind==='valve'?'Toggle leak valve':t.kind==='source'?'Water tank':t.kind==='target'?'Crop tray':'Rotate pipe');
   if(t.kind==='source'||t.kind==='target'){b.disabled=true;b.innerHTML='<span class="gd-endpoint">'+(t.kind==='source'?'💧':'🌱')+'</span><span class="gd-label">'+(t.kind==='source'?'TANK':'TRAY B')+'</span>';}
   else{const icon=t.kind==='valve'?(t.closed?'✓':'×'):'↻';b.innerHTML='<svg viewBox="0 0 100 100" aria-hidden="true"><path d="'+paths[t.kind]+'"></path><path class="inner" d="'+paths[t.kind]+'"></path></svg><span class="gd-tileicon">'+icon+'</span><span class="gd-label">'+(t.kind==='valve'?'LEAK VALVE':'ROTATE')+'</span>';b.querySelector('svg').style.transform='rotate('+t.rot*90+'deg)';b.addEventListener('click',()=>{if(finished||testing)return;start();if(t.kind==='valve')t.closed=!t.closed;else t.rot=(t.rot+1)%4;window.Audio?.uiClick?.();draw();});}
   $('gdTiles').append(b);
  });
 };
 const refresh=()=>{
  $('gdClock').textContent='◷ '+String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
  $('gdWater').textContent=Math.round(water)+'%';$('gdMeter').style.width=water+'%';$('gdHealth').textContent=Math.round(health)+'%';$('gdDelivery').textContent=delivered?'100%':'0%';
 };
 const start=()=>{
  if(started)return;started=true;hint.textContent='Repair the pipe route before time runs out.';
  mgr.activeDrillTimer=setInterval(()=>{if(document.hidden)return;
   if(!modal.isConnected||finished||testing)return;
   seconds--;water=Math.max(0,water-.48);health=Math.max(0,health-.12);refresh();
   if(seconds<=0||water<=0)finish(false,'The reservoir ran dry. Try another route.');
  },1000);
 };
 const finish=(win,message)=>{
  if(finished)return;finished=true;testing=false;
  clearInterval(mgr.activeDrillTimer);mgr.activeDrillTimer=null;
  const result=$('gdResult');result.classList.add('show');$('gdResultTitle').textContent=win?'Greenhouse restored!':'Mission failed';
  $('gdResultText').textContent=message;
  $('gdFlow').textContent=win?'● FLOW RESTORED':'● OFFLINE';
  cta.textContent=win?'RETURN TO STATION':'RETRY MISSION';cta.disabled=false;
  if(win){health=96;delivered=true;window.Audio?.taskSuccess?.();
    cta.onclick=()=>{if(!modal.isConnected)return;const sim=window.Sim;if(sim){sim.greenhouseCropHealth=96;sim.greenhouseIrrigationFixed=true;window.Story?.decisions?.push({type:'gardenIrrigationRepair',waterSavedPercent:Math.round(water),missionHour:sim.missionTimeHours});}window.Save?.schedule?.();mgr.close();mgr.onComplete?.('greenhouseLight');};
  }else cta.onclick=()=>mgr.openGreenhouseLight();
  refresh();
 };
 cta.textContent='TEST WATER FLOW';
 cta.onclick=()=>{
  if(finished||testing)return;start();testing=true;cta.disabled=true;$('gdFlow').textContent='● PRESSURIZING…';
  const e=evaluate();leakSeen=e.leak;
  const timer=setTimeout(()=>{
   if(!modal.isConnected)return;
   water=Math.max(0,water-(e.leak?13:3));testing=false;
   if(e.reaches&&!e.leak){delivered=true;finish(true,'You restored water without a leak and saved '+Math.round(water)+'% of the reserve.');}
   else if(water<6)finish(false,'Too much water escaped through the faulty route.');
   else{$('gdFlow').textContent=e.leak?'● LEAK DETECTED':'● NO CONNECTION';$('gdHelp').textContent=e.leak?'Water is leaking. Close the red valve.':'A pipe is disconnected. Trace the route to Tray B.';hint.textContent=e.leak?'Seal the leaking branch before retrying.':'Rotate the corners until the route connects.';cta.disabled=false;refresh();}
  },1000);
 };
 hint.textContent='Rotate the junctions, close the valve, then test.';
 draw();refresh();
};
})();