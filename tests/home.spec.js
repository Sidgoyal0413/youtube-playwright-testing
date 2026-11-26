const { test, expect, say } = require('../utils/fixtures');
const { HomePage } = require('../pages/HomePage');

test.describe('TC-01..04 | Home page', () => {
  let home;
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('TC-01: page title contains "YouTube"', async ({ page }) => {
    await say(page, 'TC-01: Checking page title');
    await expect(page).toHaveTitle(/YouTube/);
  });

  test('TC-02: logo and search bar are visible', async ({ page }) => {
    await say(page, 'TC-02: Checking logo & search bar');
    await expect(home.logo).toBeVisible();
    await expect(home.searchInput).toBeVisible();
    await expect(home.searchInput).toBeEditable();
  });

  test('TC-03: Sign in option is shown for guest user', async ({ page }) => {
    await say(page, 'TC-03: Checking Sign in button for guest');
    await expect(home.signInButton).toBeVisible();
  });

  test('TC-04: sidebar guide menu toggles', async ({ page }) => {
    await say(page, 'TC-04: Toggling sidebar menu');
    await expect(home.guideButton).toBeVisible();
    await home.guideButton.click();
    await home.guideButton.click();
    await expect(home.guideButton).toBeVisible();
  });
});
