import { chromium } from 'playwright';
import fs from 'fs';
const file = 'file://' + process.cwd() + '/dist/index.html';
const browser = await chromium.launch();
const errors = [];
async function run(width, height, tag) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`[${tag}] ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`[${tag}] console: ${m.text()}`); });
  const shot = async name => { await page.waitForTimeout(150); await page.screenshot({ path: `tests/shots/${tag}-${name}.png`, fullPage: false }); };
  const goto = async h => { await page.goto(file + h); await page.waitForTimeout(200); };
  await goto('#today'); await shot('today');
  // horizontal overflow check
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (over > 1) errors.push(`[${tag}] horizontal overflow on today: ${over}px`);
  await goto('#course'); await shot('course');
  await goto('#lesson/1'); await shot('lesson-top');
  // answer check questions 1..5
  for (let i = 0; i < 5; i++) { const btns = await page.$$('#b-check .checkq .opt:not([disabled])'); if (!btns.length) break; await btns[0].click(); await page.waitForTimeout(100); }
  await page.evaluate(() => document.getElementById('b-check').scrollIntoView()); await shot('lesson-checks');
  const over2 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (over2 > 1) errors.push(`[${tag}] horizontal overflow on lesson: ${over2}px`);
  await page.fill('#applied', 'Test applied answer'); await page.click('text=Mark complete'); await page.waitForTimeout(100);
  await goto('#glossary'); await page.fill('#gsearch', 'sigma'); await shot('glossary');
  await goto('#calc/sigma'); await shot('calc-sigma');
  const sig = await page.textContent('#calcout'); if (!sig.includes('3.96')) errors.push(`[${tag}] sigma calc wrong: ${sig.slice(0, 80)}`);
  await goto('#calc/cap'); const cap = await page.textContent('#calcout'); if (!cap.includes('1.00') || !cap.includes('1.33')) errors.push(`[${tag}] cap calc wrong`);
  await goto('#practice'); await shot('practice');
  // drill
  await page.click('text=Start drill'); await page.waitForTimeout(200); await shot('drill');
  await page.keyboard.press('1'); await page.waitForTimeout(100); await shot('drill-answered');
  // partial mock
  await goto('#practice'); await page.click('text=Partial mock'); await page.waitForTimeout(300); await shot('mock');
  const n = await page.evaluate(() => JSON.parse(localStorage.getItem('tollgate.v1')).active.order.length);
  for (let i = 0; i < n; i++) { await page.keyboard.press(String(1 + (i % 4))); if (i === 2) await page.keyboard.press('f'); await page.keyboard.press('n'); }
  await page.waitForTimeout(100); await shot('mock-last');
  await page.evaluate(() => openOverlay('nav')); await shot('mock-nav');
  await page.evaluate(() => openOverlay('ref')); await shot('mock-ref');
  await page.evaluate(() => { refTab = 'z'; render(); }).catch(() => {});
  await page.evaluate(() => openOverlay('calc')); await page.evaluate(() => { calcKey('7'); calcKey('×'); calcKey('6'); calcKey('='); }); await shot('mock-calc');
  const disp = await page.textContent('#calcdisp'); if (disp.trim() !== '42') errors.push(`[${tag}] calculator 7×6 = ${disp}`);
  await page.evaluate(() => openOverlay('submit')); await shot('mock-submit');
  await page.click('.sheet button.primary'); await page.waitForTimeout(300); await shot('results');
  const over3 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (over3 > 1) errors.push(`[${tag}] horizontal overflow on results: ${over3}px`);
  await page.click('text=/Review \\d+ wrong/'); await page.waitForTimeout(200); await shot('review');
  await goto('#progress'); await shot('progress');
  await goto('#settings'); await page.click('text=Dark'); await page.waitForTimeout(100); await goto('#today'); await shot('today-dark');
  await goto('#lesson/1'); await shot('lesson-dark');
  // reload persistence
  await goto('#today'); const done = await page.evaluate(() => JSON.parse(localStorage.getItem('tollgate.v1')).lessons['1'].complete); if (!done) errors.push(`[${tag}] lesson completion not persisted`);
  const mocks = await page.evaluate(() => JSON.parse(localStorage.getItem('tollgate.v1')).mocks.length); if (mocks !== 1) errors.push(`[${tag}] mock not saved`);
  await ctx.close();
}
await run(360, 780, 'm');
await run(1280, 800, 'd');
// normal fixtures
const ctx = await browser.newContext(); const page = await ctx.newPage(); await page.goto(file);
const fx = JSON.parse(fs.readFileSync('tests/fixtures/normal.json'));
const res = await page.evaluate(fx => { const out = []; for (const [z, p] of fx.normCdf) { const v = TG.normCdf(z); if (Math.abs(v - p) > 2e-6) out.push(`cdf(${z})=${v} vs ${p}`); } for (const [p, z] of fx.normInv) { const v = TG.normInv(p); if (Math.abs(v - z) > 2e-6) out.push(`inv(${p})=${v} vs ${z}`); } return out; }, fx);
errors.push(...res.map(r => '[fixture] ' + r));
await browser.close();
if (errors.length) { console.log('FAILURES:\n' + errors.join('\n')); process.exit(1); } else console.log('smoke ok');
