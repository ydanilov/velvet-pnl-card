import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1500,height:1100}});
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/velvet-pnl-card.html'); await p.waitForTimeout(3000);
for (const [id,v] of [['candlesR','90'],['durR','12.5'],['tradesR','9'],['boostR','2.2']]) { await p.$eval('#'+id,(e,v)=>{e.value=v;e.dispatchEvent(new Event('input'))},v); }
const box = await p.locator('#hL').boundingBox(); await p.mouse.move(box.x+7,box.y+30); await p.mouse.down(); await p.mouse.move(box.x+250,box.y+30,{steps:8}); await p.mouse.up();
await p.waitForTimeout(400);
const get = () => p.evaluate(()=>['candles','dur','trades','boost'].map(i=>document.getElementById(i).value).concat(document.getElementById('rangeText').textContent));
const before = await get(); await p.reload(); await p.waitForTimeout(3000); const after = await get();
await p.screenshot({path:'ui.png'});
console.log(JSON.stringify({before,after,errs}));
await b.close();
