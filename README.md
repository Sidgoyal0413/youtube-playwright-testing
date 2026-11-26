# YouTube Automation Testing - Playwright

Software Testing semester project. E2E automation of **youtube.com** using **Playwright (JavaScript)** with the **Page Object Model**.

## Setup
```bash
npm install
npx playwright install
```

## Run
```bash
npm test                 # all tests, all projects (headless)
npm run test:chromium    # Chrome only
npm run test:headed      # visible browser
npm run report           # open HTML report
```

## Visual Demo Mode (watch tests run live)
```bash
npm run demo           # all tests, visible browser, slowed down, video recorded
npm run demo:search    # only search tests
npm run demo:video     # only video/player tests
npm run test:ui        # Playwright UI mode: timeline + DOM snapshots per step
npm run debug          # step-by-step with Inspector
```
On screen: a banner with the current test-case step, a red cursor dot, click ripples, and a yellow outline on typed-into fields.
Speed: change `slowMo` in `playwright.demo.config.js`. Videos are saved in `test-results/` and embedded in the HTML report.

## Structure
```
pages/   Page objects (HomePage, SearchResultsPage, WatchPage)
tests/   Spec files grouped by feature
utils/   fixtures.js (visual overlays), helpers.js (consent, ad skip)
playwright.config.js        normal runs
playwright.demo.config.js   visual demo runs
```

## Test Cases
| ID | Module | Description | Type |
|----|--------|-------------|------|
| TC-01 | Home | Title contains "YouTube" | Functional |
| TC-02 | Home | Logo & search bar visible/editable | UI |
| TC-03 | Home | Sign in shown for guest | Functional |
| TC-04 | Home | Sidebar guide toggles | UI |
| TC-05 | Search | Valid keyword returns results | Functional |
| TC-06 | Search | Search via button click | Functional |
| TC-07 | Search | Empty search does not navigate | Negative |
| TC-08 | Search | Special characters handled | Negative |
| TC-09 | Search | Gibberish query, no crash | Negative |
| TC-10 | Search | Suggestions appear while typing | Functional |
| TC-11 | Watch | Result click opens watch page | Functional |
| TC-12 | Watch | Player loaded | Functional |
| TC-13 | Watch | "k" toggles play/pause | Functional |
| TC-14 | Watch | "m" toggles mute | Functional |
| TC-15 | Watch | Subscribe prompts guest sign-in | Functional |
| TC-16 | Watch | Channel & related videos shown | UI |
| TC-17 | Watch | Comments load on scroll | Functional |
| TC-18 | Player | Direct URL loads correct video | Functional |
| TC-19 | Player | Valid duration | Functional |
| TC-20 | Player | Playback progresses | Functional |
| TC-21 | Player | Arrow-key seek | Functional |
| TC-22 | Responsive | Mobile home loads, search reachable | Compatibility |
| TC-23 | Responsive | No horizontal overflow | UI |
| TC-24 | Performance | DOMContentLoaded < 8s | Non-functional |
| TC-25 | Performance | No 4xx/5xx document responses | Non-functional |
| TC-26 | Negative | Invalid video ID shows error | Negative |

## Notes / Limitations
- Tests run as a guest (no login) to avoid CAPTCHA / 2FA.
- YouTube's DOM changes often; selectors live in `pages/` for one-place fixes.
- Ads can delay playback; `skipAdIfPresent` handles skippable ads.
