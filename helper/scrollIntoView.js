export default async (driver, until, locator) => {
  let singleProductElement = await driver.wait(
    until.elementLocated(locator),
    2000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    singleProductElement
  );
  await driver.wait(until.elementIsVisible(singleProductElement), 2000);
};
