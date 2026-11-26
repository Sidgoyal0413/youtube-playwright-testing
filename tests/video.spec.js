const { test, expect, say } = require('../utils/fixtures');
const { HomePage } = require('../pages/HomePage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');
const { WatchPage } = require('../pages/WatchPage');

test.describe('TC-11..17 | Video playback & watch page', () => {
  let watch;

  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);
    watch = new WatchPage(page);
    await home.goto();
    await home.search('lofi hip hop music');
    await results.waitForResults();
    await results.openFirstVideo();
    await watch.waitUntilPlayerReady();
  });

  test('TC-11: clicking a result opens the watch page', async ({ page }) => {
    await say(page, 'TC-11: Verifying watch page opened');
    await expect(page).toHaveURL(/\/watch\?v=/);
    await expect(watch.title).toBeVisible();
    await expect(watch.title).not.toBeEmpty();
  });

  test('TC-12: video player is loaded', async ({ page }) => {
    await say(page, 'TC-12: Verifying video player');
    await expect(watch.player).toBeVisible();
    await expect(watch.video).toBeAttached();
  });

  test('TC-13: keyboard "k" toggles play/pause', async ({ page }) => {
    await say(page, 'TC-13: Pressing K to play/pause');
    await watch.player.hover();
    const before = await watch.isPaused();
    await page.keyboard.press('k');
    await expect.poll(() => watch.isPaused()).toBe(!before);
  });

  test('TC-14: keyboard "m" toggles mute', async ({ page }) => {
    await say(page, 'TC-14: Pressing M to mute/unmute');
    await watch.player.hover();
    const before = await watch.isMuted();
    await page.keyboard.press('m');
    await expect.poll(() => watch.isMuted()).toBe(!before);
  });

  test('TC-15: subscribe button is visible; guest is prompted to sign in', async ({ page }) => {
    await say(page, 'TC-15: Clicking Subscribe as guest');
    await expect(watch.subscribeButton).toBeVisible();
    await watch.subscribeButton.click();
    await expect(page.getByText(/sign in/i).first()).toBeVisible();
  });

  test('TC-16: channel name and related videos are displayed', async ({ page }) => {
    await say(page, 'TC-16: Checking channel name & related videos');
    await expect(watch.channelName).toBeVisible();
    await expect(watch.related).toBeVisible();
  });

  test('TC-17: comments section loads on scroll', async ({ page }) => {
    await say(page, 'TC-17: Scrolling to load comments');
    await page.mouse.wheel(0, 1200);
    await expect(watch.comments).toBeAttached({ timeout: 20_000 });
  });
});
