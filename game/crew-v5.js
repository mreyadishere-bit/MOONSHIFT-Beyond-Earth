(()=>{
  'use strict';
  if(window.MoonshiftCrewArtwork?.installed)return;
  const Klass=window.CrewClass;
  if(!Klass?.prototype?.render){console.warn('[MOONSHIFT CREW] Crew renderer not ready');return;}
  const proto=Klass.prototype;
  const original=proto.render;
  const ATLAS='/crew/atlas.avif?v=20261115';
  const entries={Abdelrahman:0,Rawan:1,Rewaa:2};
  const atlas=new Image();
  atlas.decoding='async';
  atlas.src=ATLAS;
  const SW=96,SH=156,DH=104,DW=Math.round(DH*SW/SH);
  let atlasReady=false;
  atlas.onload=()=>{atlasReady=atlas.naturalWidth===288&&atlas.naturalHeight===156; console.info('[MOONSHIFT CREW] 3 original portraits loaded',atlasReady)};
  atlas.onerror=()=>console.warn('[MOONSHIFT CREW] Atlas unavailable; original NPC art retained.');
  function tag(ctx,npc,near) {
    const y=-DH+2;
    ctx.save();
    ctx.textAlign='center';ctx.textBaseline='alphabetic';
    ctx.font='800 12px system-ui,Segoe UI,sans-serif';
    const w=Math.max(70,ctx.measureText(npc.name).width+22);
    ctx.fillStyle='rgba(8,30,43,.91)';
    ctx.beginPath();
    if(ctx.roundRect)ctx.roundRect(-w/2,y-25,w,21,7);else ctx.rect(-w/2,y-25,w,21);
    ctx.fill();
    ctx.fillStyle='#f2fafb';
    ctx.fillText(npc.name,0,y-10);
    if(near){
      ctx.font='800 10px system-ui,Segoe UI,sans-serif';
      ctx.fillStyle='#90ecdf';
      ctx.fillText('E  ·  TALK',0,y-32);
    }
    ctx.restore();
  }
  proto.render=function(ctx){
    const npcs=Array.isArray(this.npcs)?this.npcs:[];
    if(!atlasReady||!npcs.length)return original.call(this,ctx);
    const other=npcs.filter(n=>entries[n.name]===undefined);
    if(other.length){
      try{this.npcs=other;original.call(this,ctx)}
      finally{this.npcs=npcs}
    }
    const player=window.Engine?.player;
    for(const npc of npcs){
      const index=entries[npc.name];if(index===undefined)continue;
      ctx.save();ctx.translate(npc.x,npc.y);
      ctx.fillStyle='rgba(0,8,18,.30)';
      ctx.beginPath();ctx.ellipse(0,12,22,7,0,0,Math.PI*2);ctx.fill();
      ctx.imageSmoothingEnabled=true;
      if('imageSmoothingQuality' in ctx)ctx.imageSmoothingQuality='high';
      ctx.drawImage(atlas,index*SW,0,SW,SH,-DW/2,-DH+13,DW,DH);
      const near=!!player&&Math.hypot(player.x-npc.x,player.y-npc.y)<100;
      tag(ctx,npc,near);
      ctx.restore();
    }
  };
  function positionCrew(){
    const map=window.StationMap,scene=window.Engine?.crew;
    const list=Array.isArray(map?.interactables)?map.interactables:[];
    const npcs=scene?.npcs;
    if(!list.length||!Array.isArray(npcs))return;
    const distance=(x,y)=>Math.min(...list.filter(t=>Number.isFinite(t.x)&&Number.isFinite(t.y)).map(t=>Math.hypot(x-t.x,y-t.y)-Math.max(t.radius||0,35)),999);
    for(const npc of npcs){
      if(entries[npc.name]===undefined)continue;
      const nearNPC=npcs.filter(n=>n!==npc).some(n=>Math.hypot(npc.x-n.x,npc.y-n.y)<85);
      if(distance(npc.x,npc.y)>90&&!nearNPC)continue;
      const room=map.getRoomAt?.(npc.x,npc.y)?.name;
      const options=[[0,-100],[115,0],[-115,0],[0,115],[110,95],[-110,95],[115,-100],[-115,-100]].map(([dx,dy])=>({x:npc.x+dx,y:npc.y+dy,shift:Math.hypot(dx,dy)})).filter(p=>{
        if(!map.isPassable?.(p.x,p.y,23))return false;
        if(room&&map.getRoomAt?.(p.x,p.y)?.name!==room)return false;
        if(distance(p.x,p.y)<105)return false;
        if(npcs.some(n=>n!==npc&&Math.hypot(p.x-n.x,p.y-n.y)<95))return false;
        return true;
      });
      options.sort((a,b)=>a.shift-b.shift);
      if(options.length){npc.x=options[0].x;npc.y=options[0].y;}
    }
  }
  const setWorld=proto.setWorld;
  if(typeof setWorld==='function'){
    proto.setWorld=function(world){const r=setWorld.apply(this,arguments);positionCrew();return r;};
  }
  positionCrew();
  window.MoonshiftCrewArtwork={
    installed:true,
    ready:()=>atlasReady,
    source:ATLAS,
    names:Object.keys(entries),
    status:()=>({loaded:atlasReady,positions:window.Engine?.crew?.npcs?.filter(n=>entries[n.name]!==undefined).map(n=>({name:n.name,x:n.x,y:n.y}))||[]})
  };
})();