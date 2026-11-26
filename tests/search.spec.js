const { test, expect, say } = require('../utils/fixtures');
const { HomePage } = require('../pages/HomePage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');

test.describe('TC-05..10 | Search', () => {
  let home, results;
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    results = new SearchResultsPage(page);
    await home.goto();
  });

  test('TC-05: valid keyword returns results', async ({ page }) => {
    await say(page, 'TC-05: Typing "playwright tutorial" and searching');
    await home.search('playwright tutorial');
    await results.waitForResults();
    expect(await results.videoResults.count()).toBeGreaterThan(3);
    await expect(page).toHaveURL(/search_query=playwright/);
  });

  test('TC-06: search via search button click', async ({ page }) => {
    await say(page, 'TC-06: Searching using the search button');
    await home.searchInput.click();
    await home.searchInput.pressSequentially('software testing', { delay: 60 });
    await home.searchButton.click();
    await page.waitForURL(/search_query=software/);
    await results.waitForResults();
  });

  test('TC-07: empty search does not navigate to results', async ({ page }) => {
    await say(page, 'TC-07: Pressing Enter with empty search box');
    await home.searchInput.click();
    await home.searchInput.press('Enter');
    await expect(page).not.toHaveURL(/results\?search_query=/);
  });

  test('TC-08: special characters are handled without error', async ({ page }) => {
    await say(page, 'TC-08: Searching special characters');
    await home.search('@#$% test &&');
    await expect(page).toHaveURL(/results\?search_query=/);
    await expect(page.locator('ytd-search, #page-manager').first()).toBeVisible();
  });

  test('TC-09: gibberish query shows no crash', async ({ page }) => {
    await say(page, 'TC-09: Searching gibberish text');
    await home.search('zxqwvbnm1234asdfghjkl9876');
    await expect(page).toHaveURL(/results/);
    await expect(page.locator('ytd-search')).toBeVisible();
  });

  test('TC-10: search suggestions appear while typing', async ({ page }) => {
    await say(page, 'TC-10: Typing "java" and waiting for suggestions');
    await home.searchInput.click();
    await home.searchInput.pressSequentially('java', { delay: 120 });
    await expect(page.locator('ul[role="listbox"] li, .sbsb_c li').first()).toBeVisible();
  });
});
