const { dismissConsent } = require('../utils/helpers');

class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[name="search_query"]');
    this.searchButton = page.locator('button[aria-label="Search"], #search-icon-legacy').first();
    this.logo = page.locator('ytd-topbar-logo-renderer, #logo').first();
    this.guideButton = page.locator('#guide-button button, button[aria-label="Guide"]').first();
    this.signInButton = page.getByRole('link', { name: /sign in/i }).first();
  }

  async goto() {
    await this.page.goto('/');
    await dismissConsent(this.page);
  }

  async search(term) {
    await this.searchInput.click();
    await this.searchInput.pressSequentially(term, { delay: 60 });
    await this.searchInput.press('Enter');
    await this.page.waitForURL(/results\?search_query=/);
  }
}

module.exports = { HomePage };
