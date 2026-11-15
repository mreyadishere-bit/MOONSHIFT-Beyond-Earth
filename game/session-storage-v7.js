/* Explicit opt-in storage. Legacy game modules use this facade, never native storage. */
(function(root){'use strict';
function createSessionStorage(native,options={}){
 const PREF='moonshift.saveProgress.v7',SAVE='moonshift.progress.v7',BACKUP=SAVE+'.backup';
 const preferences=new Set(['moonshift.voice.enabled','moonshift.audio.settings.v1','moonshift.audio.v1','moonshift.difficulty','moonshift.v23.mode','moonshift.v32.volume']);
 const isPreference=k=>preferences.has(k)||/audio|volume|music|voice\.enabled/.test(k);
 const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16)};
 const decode=raw=>{try{const e=JSON.parse(raw);if(e?.schema!==7||!Number.isSafeInteger(e.revision)||typeof e.payload!=='string'||hash(e.payload)!==e.checksum)return null;const values=JSON.parse(e.payload);if(!values||Array.isArray(values)||typeof values!=='object'||Object.values(values).some(x=>typeof x!=='string'))return null;return {...e,values}}catch{return null}};
 const read=k=>{try{return native.getItem(k)}catch{return null}};
 let enabled=read(PREF)==='true',memory=new Map(),revision=0,locked=false,error='',pending=false;
 const writer=options.writer||('session-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));const providers=new Map(),listeners=new Set();
 if(enabled){const current=decode(read(SAVE)),backup=decode(read(BACKUP)),valid=current||backup;if(valid){memory=new Map(Object.entries(valid.values));revision=valid.revision;if(!current)error='Recovered the last valid backup.'}else if(read(SAVE))error='Previous save could not be verified. A fresh adventure is running; the old data is untouched.'}
 const notify=()=>listeners.forEach(fn=>fn({enabled,revision,error}));
 function capture(){for(const [key,fn] of providers){try{const value=fn();if(value!==undefined&&value!==null)memory.set(key,typeof value==='string'?value:JSON.stringify(value))}catch(e){error='One checkpoint could not be captured.'}}}
 function flush({claim=false}={}){pending=false;if(!enabled||locked)return false;capture();const previous=read(SAVE),latest=decode(previous);if(!claim&&latest&&latest.revision>revision&&latest.writer!==writer){error='A newer save exists in another tab. This session is safe in memory; reload to restore that save.';notify();return false}const next=Math.max(revision,latest?.revision||0)+1,payload=JSON.stringify(Object.fromEntries(memory)),envelope=JSON.stringify({schema:7,revision:next,writer,savedAt:Date.now(),payload,checksum:hash(payload)});try{if(latest)native.setItem(BACKUP,previous);native.setItem(SAVE,envelope);revision=next;error='';notify();return true}catch(e){error='Saving is unavailable in this browser. Keep this tab open to retain this adventure.';notify();return false}}
 function queue(){if(!enabled||locked||pending)return;pending=true;(options.defer||queueMicrotask)(()=>flush())}
 const api={
 getItem(key){key=String(key);return isPreference(key)?read(key):(memory.get(key)??null)},
 setItem(key,value){if(locked)return;key=String(key);value=String(value);if(isPreference(key)){try{native.setItem(key,value)}catch{}return}memory.set(key,value);queue()},
 removeItem(key){if(locked)return;key=String(key);if(isPreference(key)){try{native.removeItem(key)}catch{}return}memory.delete(key);queue()},
 key(i){return [...memory.keys()][i]??null},get length(){return memory.size},
 clear(){if(locked)return;memory.clear();queue()},
 get enabled(){return enabled},get status(){return{enabled,revision,error,locked}},
 register(key,fn){providers.set(key,fn);return()=>providers.delete(key)},
 subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},
 setEnabled(value){if(locked)return false;enabled=!!value;try{native.setItem(PREF,String(enabled))}catch{error='This browser cannot remember the saving preference.'}const ok=enabled?flush({claim:true}):true;notify();return ok},
 checkpoint:flush,
 restart(){if(locked)return;memory.clear();providers.clear();if(enabled)flush({claim:true});locked=true;notify();options.reload?.()},
 erase(){try{native.removeItem(SAVE);native.removeItem(BACKUP);for(let i=native.length-1;i>=0;i--){const key=native.key(i);if(key?.startsWith('moonshift')&&!isPreference(key)&&key!==PREF)native.removeItem(key)}error='';notify();return true}catch{error='Unable to erase the stored save.';notify();return false}},
 snapshot:()=>Object.fromEntries(memory),decode
 };return api;
}
if(typeof module!=='undefined')module.exports={createSessionStorage};
if(root?.document&&!root.MoonshiftStorage){root.MoonshiftStorage=createSessionStorage(root.localStorage,{reload:()=>root.location.reload()});root.addEventListener('pagehide',()=>root.MoonshiftStorage.checkpoint());}
})(typeof window!=='undefined'?window:globalThis);
