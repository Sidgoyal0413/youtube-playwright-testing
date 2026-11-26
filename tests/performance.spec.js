const { test, expect, say } = require('../utils/fixtures');

test.describe('TC-24..26 | Performance, network & negative', () => {
  test('TC-24: home page DOM content loads within 8s', async ({ page }) => {
    const start = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const elapsed = Date.now() - start;
    await say(page, `TC-24: DOMContentLoaded in ${elapsed} ms`);
    console.log(`DOMContentLoaded in ${elapsed} ms`);
    expect(elapsed).toBeLessThan(8000);
  });

  test('TC-25: no failed main-document responses (4xx/5xx)', async ({ page }) => {
    const bad = [];
    page.on('response', r => {
      if (r.request().resourceType() === 'document' && r.status() >= 400) bad.push(r.url());
    });
    await page.goto('/');
    await say(page, 'TC-25: Checking for failed responses');
    expect(bad).toEqual([]);
  });

  test('TC-26: invalid video ID shows an error state', async ({ page }) => {
    await page.goto('/watch?v=INVALID_ID_00');
    await say(page, 'TC-26: Checking error for invalid video ID');
    await expect(page.getByText(/video unavailable|isn't available|unavailable/i).first()).toBeVisible({ timeout: 15_000 });
  });
});
