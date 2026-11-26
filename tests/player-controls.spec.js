const { test, expect, say } = require('../utils/fixtures');
const { WatchPage } = require('../pages/WatchPage');

// Stable public video used as a fixed test fixture
const VIDEO_URL = '/watch?v=jNQXAC9IVRw'; // "Me at the zoo" - first YouTube video

test.describe('TC-18..21 | Player controls (fixed video)', () => {
  let watch;
  test.beforeEach(async ({ page }) => {
    watch = new WatchPage(page);
    await page.goto(VIDEO_URL);
    await watch.waitUntilPlayerReady();
  });

  test('TC-18: direct URL loads the correct video', async ({ page }) => {
    await say(page, 'TC-18: Verifying video loaded from direct URL');
    await expect(page).toHaveURL(/jNQXAC9IVRw/);
    await expect(watch.title).toContainText(/zoo/i);
  });

  test('TC-19: video has a valid duration', async ({ page }) => {
    await say(page, 'TC-19: Checking video duration');
    await expect.poll(() => watch.duration()).toBeGreaterThan(0);
  });

  test('TC-20: playback progresses over time', async ({ page }) => {
    await say(page, 'TC-20: Checking playback progress');
    if (await watch.isPaused()) await page.keyboard.press('k');
    const t1 = await watch.currentTime();
    await page.waitForTimeout(3000);
    expect(await watch.currentTime()).toBeGreaterThan(t1);
  });

  test('TC-21: seek with arrow keys moves playback position', async ({ page }) => {
    await say(page, 'TC-21: Pressing Right Arrow to seek +5s');
    await watch.player.hover();
    const t1 = await watch.currentTime();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => watch.currentTime()).toBeGreaterThan(t1);
  });
});
