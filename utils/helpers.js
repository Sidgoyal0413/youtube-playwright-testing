/** Dismiss cookie/consent dialogs if they appear (region dependent). */
async function dismissConsent(page) {
  const buttons = [
    page.getByRole('button', { name: /accept all/i }),
    page.getByRole('button', { name: /reject all/i }),
  ];
  for (const b of buttons) {
    if (await b.first().isVisible().catch(() => false)) {
      await b.first().click().catch(() => {});
      return;
    }
  }
}

/** Skip a pre-roll ad if the skip button shows up. */
async function skipAdIfPresent(page) {
  const skip = page.locator('.ytp-skip-ad-button, .ytp-ad-skip-button-modern');
  try {
    await skip.first().waitFor({ state: 'visible', timeout: 8000 });
    await skip.first().click();
  } catch { /* no ad */ }
}

module.exports = { dismissConsent, skipAdIfPresent };
