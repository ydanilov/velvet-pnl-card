import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:1500,height:1100}});
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/velvet-pnl-card.html');
await p.waitForTimeout(4000); await p.click('#playBtn');
for (const t of [0.3,3,6,8.9,10]) {
  
  await p.evaluate(t=>{const s=document.getElementById('scrub'); s.dispatchEvent(new Event('pointerdown')); s.value=Math.round(t/10*1000); s.dispatchEvent(new Event('input'));}, t);
  await p.waitForTimeout(150);
  const data = await p.evaluate(()=>document.getElementById('cv').toDataURL('image/png'));
  (await import('fs')).writeFileSync(`s_${t}.png`, Buffer.from(data.split(',')[1],'base64'));
}
await p.screenshot({path:'ui.png'});
console.log(errs.join('\n')||'no errors');
await b.close();
