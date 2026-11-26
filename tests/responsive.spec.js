const { test, expect, say } = require('../utils/fixtures');

test.describe('TC-22..23 | Responsive / cross-viewport', () => {
  test('TC-22: home loads with search reachable', async ({ page }) => {
    await page.goto('/');
    await say(page, 'TC-22: Checking search is reachable');
    await expect(page).toHaveTitle(/YouTube/);
    const search = page.locator('input[name="search_query"], button[aria-label="Search YouTube"], button[aria-label="Search"]').first();
    await expect(search).toBeVisible();
  });

  test('TC-23: no horizontal overflow on viewport', async ({ page }) => {
    await page.goto('/');
    await say(page, 'TC-23: Checking horizontal overflow');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 5
    );
    expect(overflow).toBeFalsy();
  });
});
