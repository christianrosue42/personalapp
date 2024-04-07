const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

/*
describe('End-to-end test', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  }, 10000);

  afterAll(async () => {
    // show browser for 5 seconds before quitting
    await new Promise(resolve => setTimeout(resolve, 10000));
    await driver.quit();
  }, 10000);

  test('navigates to user list when Mitarbeiterliste is clicked', async () => {
    await driver.get('https://perverapp.s3.eu-central-1.amazonaws.com/index.html');
    await driver.findElement(By.linkText('Mitarbeiter Liste')).click();
    await driver.wait(until.urlIs('https://perverapp.s3.eu-central-1.amazonaws.com/user-list'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('https://perverapp.s3.eu-central-1.amazonaws.com/user-list');
  }, 10000);
});
*/

// add New Mitarbeiter
describe('End-to-end test', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  }, 10000);

  afterAll(async () => {
    // show browser for 5 seconds before quitting
    await new Promise(resolve => setTimeout(resolve, 10000));
    await driver.quit();
  }, 10000);

  test('navigates to user list when Mitarbeiterliste is clicked', async () => {
    await driver.get('https://perverapp.s3.eu-central-1.amazonaws.com/index.html');
    await driver.findElement(By.linkText('Mitarbeiter hinzufügen')).click();
    await driver.wait(until.urlIs('https://perverapp.s3.eu-central-1.amazonaws.com/create-user'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('https://perverapp.s3.eu-central-1.amazonaws.com/create-user');
  }, 10000);
});