import { Builder, By, Key, until } from "selenium-webdriver";
import HomePage from "./pom/home";
import HomesForSale from "./pom/homeForSale";

let chrome = require("selenium-webdriver/chrome");
let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(
    new chrome.Options().addArguments("--disable-notifications")
  )
  .build();
// const LOCATION = `Irvine, CA`;
// const LOCATION = `Silverado, CA`;
const LOCATION = `Tustin, CA`;
//let driver = new Builder().forBrowser("safari").build();

describe(`Homes.com testing`, () => {
  beforeAll(async () => {
    await driver.manage().window().setRect({ width: 1400, height: 768 });
    // await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.sleep(2000);
    await driver.close();
  });

  beforeEach(async () => {});

  test("Home Page has title", async () => {
    let homePage = new HomePage(driver, until);
    await homePage.openPage(homePage.url);
    expect(await homePage.getPageTitle()).toBe(homePage.homePageTitle);
  });

  test("Excercise hamburger menu", async () => {
    let homePage = new HomePage(driver, until, Key);
    const numberOfNavCategories = 6;
    await homePage.openHamburgerMenu();
    expect(await homePage.getNumberOfNavCategories()).toBe(
      numberOfNavCategories
    );
    await homePage.hoverNavBar();
    await homePage.expandNavHowTo();
    await homePage.closeHamburgerMenu();
  });

  test(`page title for ${LOCATION}`, async () => {
    let homePage = new HomePage(driver, until, Key);
    let homesForSale = new HomesForSale(driver, until, Key, LOCATION);
    await homePage.searchLocation(LOCATION);
    const pageTitle = await homesForSale.getPageTitle();
    expect(pageTitle.currentLocation).toBe(pageTitle.expectedLocation);
  });

  test(`correct city of ${LOCATION} listed on page`, async () => {
    let homesForSale = new HomesForSale(driver, until, Key, LOCATION);
    const locationFromPage = await homesForSale.getHeadingH1LocationText();
    expect(LOCATION).toBe(locationFromPage);
  });

  test(`number of listing tiles in ${LOCATION}`, async () => {
    let homesForSale = new HomesForSale(driver, until, Key, LOCATION);
    const actualNumberOfListingTiles =
      await homesForSale.countNumberOfListingTiles();
    // console.log(
    //   `actual number of listing tiles: ${actualNumberOfListingTiles}`
    // );
    const numberOfListingsFromHeadingH1 =
      await homesForSale.getNumberOfListingsFromHeadingH1();
    // console.log(
    //   `number of listings from heading: ${numberOfListingsFromHeadingH1}`
    // );
    expect(numberOfListingsFromHeadingH1).toBe(actualNumberOfListingTiles);
  });
});
