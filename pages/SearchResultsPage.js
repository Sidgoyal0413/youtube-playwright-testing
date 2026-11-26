class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.videoResults = page.locator('ytd-video-renderer');
    this.videoTitles = page.locator('ytd-video-renderer a#video-title');
    this.filterButton = page.getByRole('button', { name: /search filters/i });
  }

  async waitForResults() {
    await this.videoResults.first().waitFor({ state: 'visible' });
  }

  async openFirstVideo() {
    const first = this.videoTitles.first();
    const title = (await first.getAttribute('title')) || (await first.innerText());
    await first.click();
    await this.page.waitForURL(/\/watch\?v=/);
    return title.trim();
  }
}

module.exports = { SearchResultsPage };
