(()=>{
'use strict';
const g=window.Minigames;
if(!g||g.__taskRoutingV3)return;
g.__taskRoutingV3=true;
const previous=g.startTask.bind(g);
const styles=document.createElement('style');
styles.id='ms-mission-redesign-v3';
styles.textContent=".task-overlay.v23-overlay{position:fixed!important;inset:0!important;display:grid!important;place-items:center!important;padding:14px!important;background:rgba(3,12,19,.88)!important;backdrop-filter:none!important}.task-overlay.v23-overlay>.v23-lab{width:min(880px,94vw)!important;height:auto!important;min-height:0!important;max-height:84dvh!important;max-width:880px!important;margin:auto!important;border-radius:19px!important;border:1px solid #497385!important;box-shadow:0 25px 70px #000a!important;align-self:center!important;justify-self:center!important}.v23-lab .v23-header{padding:15px 22px 13px!important;gap:12px!important}.v23-lab .v23-header h2{font-size:21px!important;margin:2px 0!important;line-height:1.2!important;letter-spacing:-.025em}.v23-lab .v23-header p{font-size:12px!important;max-width:520px!important;margin:4px 0 0!important;line-height:1.4!important}.v23-lab .v23-eyebrow{font-size:9px!important}.v23-lab .v23-steps{display:none!important}.v23-lab .v23-content{flex:0 1 auto!important;min-height:0!important;max-height:calc(84dvh - 150px)!important;padding:13px!important;gap:13px!important;grid-template-columns:minmax(0,1.25fr) minmax(255px,.75fr)!important;overflow:auto!important}.v23-lab .v23-scene{padding:12px!important;border-radius:15px!important;min-height:220px!important;background:linear-gradient(155deg,#123144,#091d2a)!important}.v23-lab .v23-graphic{max-height:280px!important}.v23-lab .v23-info{gap:8px!important}.v23-lab .v23-card{padding:11px 13px!important;border-radius:12px!important}.v23-lab .v23-card h3{font-size:15px!important;margin:4px 0!important}.v23-lab .v23-card p,.v23-lab .v23-preview{font-size:11px!important;line-height:1.4!important}.v23-lab .v23-info .v23-card:first-child{display:none!important}.v23-lab .v23-info .v23-controls{padding:0!important;gap:9px!important}.v23-lab .v23-hint{padding:8px 10px!important;font-size:11px!important;min-height:0!important}.v23-lab .v23-range-label{margin:4px 0!important;padding:8px 10px!important;border-radius:10px!important}.v23-lab .v23-footer{padding:10px 15px!important;gap:10px!important}.v23-lab .v23-footer>span{font-size:9px!important;max-width:42ch!important}.v23-lab .v23-continue{padding:10px 17px!important;border-radius:11px!important;min-height:40px!important;font-size:12px!important;font-weight:850!important}.v23-lab .v23-help,.v23-lab .v30-tool-row,.v23-lab .nx-lab-evidence{display:none!important}.v23-lab .v23-x{width:34px!important;height:34px!important}.task-overlay:has(.gd-game){display:grid!important;place-items:center!important;padding:14px!important;background:rgba(3,12,19,.87)!important}.task-modal:has(.gd-game){width:min(850px,94vw)!important;max-width:850px!important;height:auto!important;min-height:0!important;max-height:84dvh!important;margin:auto!important;border-radius:19px!important}.task-modal:has(.gd-game) .task-header{padding:12px 18px!important}.task-modal:has(.gd-game) .task-header h2{font-size:21px!important}.task-modal:has(.gd-game) .task-footer{padding:10px 16px!important}.task-modal:has(.gd-game) .gd-board{padding:12px!important}.task-modal:has(.gd-game) .gd-game{padding:13px!important}.task-modal:has(.gd-game) .gd-tiles{max-width:460px!important}.task-modal:has(.gd-game) .gd-intro{margin-bottom:8px!important}.task-modal:has(.gd-game) .gd-note{font-size:10px!important}@media(max-width:680px){.task-overlay.v23-overlay>.v23-lab,.task-modal:has(.gd-game){width:97vw!important;max-height:92dvh!important}.v23-lab .v23-content{grid-template-columns:1fr!important;max-height:calc(92dvh - 140px)!important;padding:9px!important}.v23-lab .v23-scene{min-height:160px!important}.v23-lab .v23-graphic{max-height:195px!important}.v23-lab .v23-header{padding:10px 13px!important}.v23-lab .v23-footer{padding:8px 11px!important}.v23-lab .v23-footer>span{display:none!important}}";
document.head.appendChild(styles);
function compactLegacyLab(){
 const lab=document.querySelector('.v23-lab');
 if(!lab)return;
 const practice=lab.querySelector('[data-phase="try"]');
 const mission=lab.querySelector('[data-phase="mission"]');
 if(practice&&mission){practice.click();mission.click();}
 const primary=lab.querySelector('#v23Next');
 if(primary)primary.textContent='CHECK MY SOLUTION';
}
g.startTask=function(id,onComplete){
 const w=window.Story?.world||window.StationMap?.currentWorld||'moon';
 if(id==='greenhouseLight'&&(w==='mars'||w==='moon')&&typeof this.openGreenhouseLight==='function'){
  this.onComplete=onComplete;
  this.currentTaskId=w+'_'+id;
  const result=this.openGreenhouseLight();
  this.activeMinigame='Green Dome Rescue';
  return result;
 }
 const result=previous(id,onComplete);
 compactLegacyLab();
 return result;
};
window.MoonshiftTaskRoutingV3={maps:{moon:3,orbit:9,mars:9},version:'3.1',compact:compactLegacyLab};
})();