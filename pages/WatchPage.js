const { skipAdIfPresent } = require('../utils/helpers');

class WatchPage {
  constructor(page) {
    this.page = page;
    this.player = page.locator('#movie_player');
    this.video = page.locator('video.html5-main-video');
    this.title = page.locator('h1.ytd-watch-metadata, #title h1').first();
    this.channelName = page.locator('ytd-watch-metadata #channel-name a, #owner #channel-name a').first();
    this.subscribeButton = page.locator('#subscribe-button-shape button, ytd-subscribe-button-renderer button').first();
    this.likeButton = page.locator('like-button-view-model button, #segmented-like-button button').first();
    this.comments = page.locator('ytd-comments#comments');
    this.related = page.locator('#related, ytd-watch-next-secondary-results-renderer').first();
  }

  async waitUntilPlayerReady() {
    await this.player.waitFor({ state: 'visible' });
    await this.video.waitFor({ state: 'attached' });
    await skipAdIfPresent(this.page);
  }

  isPaused() { return this.video.evaluate(v => v.paused); }
  currentTime() { return this.video.evaluate(v => v.currentTime); }
  duration() { return this.video.evaluate(v => v.duration); }
  isMuted() { return this.video.evaluate(v => v.muted); }
}

module.exports = { WatchPage };
