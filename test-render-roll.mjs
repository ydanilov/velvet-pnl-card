import { chromium } from 'playwright'; import fs from 'fs';
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1500,height:1100}});
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/velvet-pnl-card.html'); await p.waitForTimeout(3000); await p.click('#playBtn');
const D = +(await p.$eval('#dur',e=>e.value));
let i=0; for (const t of [3.0,3.08,3.16,3.24]) { await p.$eval('#scrub',(s,v)=>{s.dispatchEvent(new Event('pointerdown'));s.value=v;s.dispatchEvent(new Event('input'))}, Math.round(t/D*1000)); await p.waitForTimeout(120);
 const d = await p.evaluate(()=>document.getElementById('cv').toDataURL()); fs.writeFileSync(`r${i++}.png`, Buffer.from(d.split(',')[1],'base64')); }
console.log(errs.join('\n')||'ok', D); await b.close();
