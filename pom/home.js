export default class HomePage {
  constructor(driver, until, Key) {
    this.driver = driver;
    this.until = until;
    this.Key = Key;
    this.url = `https://www.homes.com/`;
    this.homePageTitle = `Homes.com - Homes for Sale, Homes for Rent and Real Estate Listings`;

    this.hamburgerMenu = {
      css: `button.hamburger-button`,
    };
    this.hamburgerMenuX = {
      css: `#sapper > nav > div.flex.items-center > button`,
    };

    this.menuItems = {
      css: `#sapper > nav > div.bg-white.absolute.menu.svelte-hsfr3l.active > ul > li`,
    };

    this.navHomesForSale = { linkText: `Homes For Sale` };
    this.navHomesForRent = { linkText: `Homes For Rent` };
    this.navHomeValues = { linkText: `Home Values` };
    this.navHowTo = { linkText: `How To` };
    this.navHowToDropDownButton = {
      css: `#sapper > nav > div > ul > li:nth-child(5) > div > button`,
    };
    this.navHowToBuy = { linkText: `How To Buy` };
    this.navHowToSell = { linkText: `How To Sell` };
    this.navHowToRent = { linkText: `How To Rent` };
    this.navHowToFinance = { linkText: `How To Finance` };
    this.navHowToBuild = { linkText: `How To Build` };

    // this.signInSignUp = { linkText: `Sign In/Sign Up`};
    this.signInSignUp = { partialLinkText: `Sign In` };

    this.searchByLocation = {
      css: `input.border-gray`,
    };
    this.searchButton = {
      css: `button.search-button`,
    };
  }

  async openPage(url = this.url) {
    await this.driver.get(url);
    await this.driver.wait(this.until.titleIs(this.homePageTitle), 1000);
  }

  async getPageTitle(title = this.title) {
    return await this.driver.getTitle();
  }

  async openHamburgerMenu() {
    const hamburgerMenuEle = await this.driver.findElement(this.hamburgerMenu);
    await hamburgerMenuEle.click();
  }

  async closeHamburgerMenu() {
    const hamburgerMenuXEle = await this.driver.findElement(
      this.hamburgerMenuX
    );
    await hamburgerMenuXEle.click();
  }

  async getNumberOfNavCategories() {
    const menuItemsEle = await this.driver.findElements(this.menuItems);
    return menuItemsEle.length;
  }

  async hoverNavBar() {
    const navHomesForSale = await this.driver.wait(
      this.until.elementLocated(this.navHomesForSale)
    );
    const navHomesForRent = await this.driver.wait(
      this.until.elementLocated(this.navHomesForRent)
    );
    const navHomeValues = await this.driver.wait(
      this.until.elementLocated(this.navHomeValues)
    );
    const navHowTo = await this.driver.wait(
      this.until.elementLocated(this.navHowTo)
    );

    await this.driver
      .actions({ bridge: true })
      .move({ origin: navHomesForSale })
      .pause(300)
      .move({ origin: navHomesForRent })
      .pause(300)
      .move({ origin: navHomeValues })
      .pause(300)
      .move({ origin: navHowTo })
      .pause(300)
      .perform();
  }

  async expandNavHowTo() {
    const navHowToDropDownButton = await this.driver.findElement(
      this.navHowToDropDownButton
    );
    await navHowToDropDownButton.click();

    const navHowToBuy = await this.driver.wait(
      this.until.elementLocated(this.navHowToBuy)
    );
    const navHowToSell = await this.driver.wait(
      this.until.elementLocated(this.navHowToSell)
    );
    const navHowToRent = await this.driver.wait(
      this.until.elementLocated(this.navHowToRent)
    );
    const navHowToFinance = await this.driver.wait(
      this.until.elementLocated(this.navHowToFinance)
    );
    const navHowToBuild = await this.driver.wait(
      this.until.elementLocated(this.navHowToBuild)
    );

    await this.driver
      .actions({ bridge: true })
      .move({ origin: navHowToBuy })
      .pause(300)
      .move({ origin: navHowToSell })
      .pause(300)
      .move({ origin: navHowToRent })
      .pause(300)
      .move({ origin: navHowToFinance })
      .pause(300)
      .move({ origin: navHowToBuild })
      .pause(300)
      .perform();
  }

  async clickSignInSignUp() {
    const signInSignUpEle = await this.driver.findElement(this.signInSignUp);
    await signInSignUpEle.click();
  }

  async searchLocation(location) {
    const searchByLocationEle = await this.driver.findElement(
      this.searchByLocation
    );
    const searchButtonEle = await this.driver.findElement(this.searchButton);
    await searchByLocationEle.clear();
    // await searchByLocationEle.sendKeys(`${location}`, this.Key.ENTER);
    await searchByLocationEle.sendKeys(location, this.Key.ENTER);
    await this.driver.sleep(1000);
    await searchButtonEle.click();
  }
  // async clickNavDresses() {
  //   const navDresses = await this.driver.findElement(this.navDresses);
  //   await navDresses.click();
  //   await this.driver.wait(this.until.titleIs(this.PCPTitle), 300);
  // }
}
//homes-for-sale
