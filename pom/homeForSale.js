import scrollIntoView from "../helper/scrollIntoView";
export default class HomesForSale {
  constructor(driver, until, Key, location) {
    this.driver = driver;
    this.until = until;
    this.Key = Key;
    this.location = location;
    this.url = `https://www.homes.com/tustin-ca/homes-for-sale/`;
    this.pageTitle = `${this.location} Homes For Sale | Homes.com`;
    this.importantHeadingH1 = {
      css: `h1`,
    };

    this.listingTiles = {
      css: `ul[data-testid="srp-listing-container"] > li`,
    };
    this.listingTileNumber = 1;
    this.listingTile = {
      css: `ul[data-testid="srp-listing-container"] > li:nth-child(${this.listingTileNumber})`,
    };
    this.buttonNext = {
      css: `button[data-testid="SR-PaginationNext"]`,
    };
    this.listingTilesCounter = 0;
  }

  async openPage(url = this.url) {
    await this.driver.get(url);
    await this.driver.wait(this.until.titleIs(this.homePageTitle), 1000);
  }

  async getPageTitle() {
    const currentLocation = await this.driver.getTitle();
    const locationgTitleObj = {
      currentLocation: currentLocation,
      expectedLocation: this.pageTitle,
    };
    return locationgTitleObj;
  }

  async getHeadingH1LocationText() {
    const headingH1Text = await this.driver
      .findElement(this.importantHeadingH1)
      .getText();
    const forSaleIn = `Homes For Sale in `;
    const locationIndex = headingH1Text.indexOf(forSaleIn);
    const startOfLocationIndex = locationIndex + forSaleIn.length;
    const locationInHeadingH1 = headingH1Text.slice(startOfLocationIndex);
    return locationInHeadingH1;
  }

  async getNumberOfListingsFromHeadingH1() {
    const headingH1Text = await this.driver
      .findElement(this.importantHeadingH1)
      .getText();
    const numberOfListingsFromHeadingH1 = parseInt(headingH1Text.split(" ")[0]);
    return numberOfListingsFromHeadingH1;
  }

  async nextButtonExists() {
    const nextButtonArr = await this.driver.findElements(this.buttonNext);
    return nextButtonArr.length ? true : false;
  }

  async pressNextButton() {
    await scrollIntoView(this.driver, this.until, this.buttonNext);
    while (await this.nextButtonExists()) {
      await this.driver.findElement(this.buttonNext).click();
      await this.driver.sleep(1500);
    }
  }

  async incrementListingTilesCounter() {
    await this.driver.sleep(1000);
    const listingTilesArr = await this.driver.findElements(this.listingTiles);
    const numberOfListingTilesThisPage = listingTilesArr.length;
    this.listingTilesCounter =
      this.listingTilesCounter + numberOfListingTilesThisPage;
  }

  async countNumberOfListingTiles() {
    while (await this.nextButtonExists()) {
      await scrollIntoView(this.driver, this.until, this.buttonNext);
      await this.incrementListingTilesCounter();
      await this.driver.findElement(this.buttonNext).click();
    }
    await this.incrementListingTilesCounter();
    return this.getListingTilesCounter();
  }

  async getListingTilesCounter() {
    return this.listingTilesCounter;
  }
}
