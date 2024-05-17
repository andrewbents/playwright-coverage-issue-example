import { test, expect } from '@playwright/test';

test('same domain', async ({ context,page }) => {
  await page.coverage.startJSCoverage({ resetOnNavigation: false })
  await page.goto('https://playwright.dev/');

  const newPagePromise = page.waitForEvent('popup')
  await page.evaluate(() => window.open('https://playwright.dev/docs/release-notes', 'popup'))
  const newPage = await newPagePromise
  await newPage.coverage.startJSCoverage({ resetOnNavigation:false })

  await page.waitForTimeout(2000)

  const info = []
  for (const page of context.pages()) {
    const coverage = await page.coverage.stopJSCoverage()
    const files = coverage.map((a) => a.url);
    expect.soft(files).not.toHaveLength(0)
    info.push([page.url(), files])
  }
  console.log(info)
});

test('same domain reversed', async ({ context,page }) => {
  await page.coverage.startJSCoverage({ resetOnNavigation: false })
  await page.goto('https://playwright.dev/');

  const newPagePromise = page.waitForEvent('popup')
  await page.evaluate(() => window.open('https://playwright.dev/docs/release-notes', 'popup'))
  const newPage = await newPagePromise
  await newPage.coverage.startJSCoverage({ resetOnNavigation:false })

  await page.waitForTimeout(2000)

  const info = []
  for (const page of context.pages().reverse()) {
    const coverage = await page.coverage.stopJSCoverage()
    const files = coverage.map((a) => a.url);
    expect.soft(files).not.toHaveLength(0)
    info.push([page.url(), files])
  }
  console.log(info)
});

test.skip('different domain', async ({ context,page }) => {
  await page.coverage.startJSCoverage({ resetOnNavigation: false })
  await page.goto('https://playwright.dev/');

  const newPagePromise = page.waitForEvent('popup')
  await page.evaluate(() => window.open('https://bing.com', 'popup'))
  const newPage = await newPagePromise
  await newPage.coverage.startJSCoverage({ resetOnNavigation:false })

  await newPage.waitForTimeout(2000)

  const info = []
  for (const page of context.pages()) {
    const coverage = await page.coverage.stopJSCoverage()
    const files = coverage.map((a) => a.url);
    expect.soft(files).not.toHaveLength(0)
    info.push([page.url(), files])
  }
  console.log(info)
});