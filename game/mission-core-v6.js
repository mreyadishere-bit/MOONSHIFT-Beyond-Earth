/* Mission transactions and radio model. No audio callback owns mission state. */
(function(root){'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function relayTransmit(s,opts={}){const tolerance=opts.tolerance??12,cost=opts.cost??8;if(s.status==='COMPLETED'||s.sent>=3)return {ok:false,reason:'All three packets are delivered.'};if(s.energy<cost)return{ok:false,reason:'Not enough energy. Restart this training run.'};s.attempts=(s.attempts||0)+1;if(Math.abs(s.aim-s.target)>tolerance)return{ok:false,reason:'Align the cyan antenna with the amber target first.'};s.sent=clamp(s.sent+1,0,3);s.energy-=cost;if(s.sent===3){s.status='COMPLETED';return {ok:true,complete:true,reason:'All three packets delivered. Link restored!'}}s.target=Math.min(170,s.target+10);return{ok:true,complete:false,reason:'Packet delivered. Track the next target.'};}
const results={};
const KEY='moonshift-missions-v6';let ledger={version:6,missions:{}};try{const d=JSON.parse(root.MoonshiftStorage?.getItem(KEY)||'null');if(d?.version===6&&d.missions)ledger=d}catch{}
function save(){try{root.MoonshiftStorage?.setItem(KEY,JSON.stringify(ledger))}catch(e){console.warn('Mission save unavailable',e)}}
function record(w,id,status){const key=w+'_'+id;const old=ledger.missions[key];if(old?.status==='COMPLETED'&&status!=='COMPLETED')return old;ledger.missions[key]={...old,status,updatedAt:Date.now()};save();return ledger.missions[key]}
function commit(w,id,callback,options={}){if(options.practice){record('practice_'+w,id,'COMPLETED');callback?.(id);return}const sim=root.Sim,story=root.Story;record(w,id,'COMPLETED');const chapter={stationTelemetry:1,greenhouseLight:2,powerRouting:3,co2Scrubber:4,waterRecovery:4,stormShutter:5,dsnAlign:6};const actual=w!=='moon'||(story?.currentAct||0)>=(chapter[id]||0);
 if(actual&&sim){if(id==='stormShutter'){sim.shelterSealed=true;sim.stormShelterShieldLocked=true;sim.solarStormActive=false;sim.solarStormProgress=0;sim.interiorRadiation=12+(Number(sim.exteriorRadiation)||0)*.1;root.Audio?.stopAlarm?.()}
 if(id==='waterRecovery'){sim.waterPurityPercent=99.8;sim.recyclingEfficiency=Math.max(Number(sim.recyclingEfficiency)||0,.98)}
 if(id==='co2Scrubber'){sim.scrubberOperational=true;sim.oxygenGeneratorOperational=true}
 if(id==='dsnAlign'){sim.antennaAligned=true;sim.dsnLinkQuality=100}
 sim.updateAlerts?.();}
 if(actual&&w==='moon'&&story&&!story.completedTasks?.has(id)){story.clearDialogueHandlers?.();story.dialogueQueue=[];story.isDialogueActive=false;root.Voice?.stop?.();root.document?.getElementById('dialogueBox')?.remove()}
 callback?.(id);root.Save?.schedule?.();}
const api={results,relayTransmit,record,commit,snapshot:()=>JSON.parse(JSON.stringify(ledger))};root.MoonshiftMissionCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
