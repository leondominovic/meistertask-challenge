import { test as setup } from "@playwright/test";
import { AccountsLoginPage } from "../lib/pageobjects/accounts.login.page";
import { config } from "../lib/utils/config";
import { BASIC_USER_STORAGE, THREE_SECOND } from "../lib/global.constants";
import { HomepagePage } from "../lib/pageobjects/homepage.page";
import { sleep } from "../lib/utils/generic.utils";

setup("Authenticate as a basic user to Accounts", async ({ page }) => {
  const homePage = new HomepagePage(page);
  await homePage.goto();
  await homePage.logInButton.click();

  await page.waitForURL("https://accounts.meister.co/*");

  const loginPage = new AccountsLoginPage(page);
  await loginPage.logInWithWait(
    // To avoid recaptcha
    config.app.userEmail,
    config.app.userPassword,
  );

  await sleep(THREE_SECOND);

  if (await page.getByText("Welcome to MeisterTask").isVisible()) {
    await page.locator("#form_sign_up_product_terms_of_service").check();
    await page.getByText("Continue").click();
  }

  if (await page.getByText("Choose Your MeisterTask Plan.").isVisible()) {
    await page.getByRole("button", { name: "Stay Basic" }).first().click();
  }

  await page.waitForURL("https://www.meistertask.com/app/dashboard");

  await page.context().storageState({ path: BASIC_USER_STORAGE });
});
