import { Locator, Page } from "@playwright/test";
import { sleep } from "../utils/generic.utils";
import { en, Faker } from "@faker-js/faker";

export class AccountsLoginPage {
  protected readonly page: Page;
  protected readonly emailInput: Locator;
  protected readonly passwordInput: Locator;
  protected readonly passwordPlaceholder: Locator;
  protected readonly logInButton: Locator;
  protected readonly logInTitle: Locator;
  protected readonly meHeader: Locator;
  protected readonly FAKER;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#login_email_login");
    this.passwordPlaceholder = page.getByText("Password", { exact: true });
    this.passwordInput = page.locator("#login_email_password");
    this.logInButton = page.locator("#btn_signin");
    this.logInTitle = page.getByRole("heading", { name: "Log In" });
    this.meHeader = page.getByRole("heading", { name: "Me" });
    this.FAKER = new Faker({ locale: [en] });
  }
  async logIn(userEmail: string, userPassword: string) {
    await this.emailInput.click();
    await this.emailInput.fill(userEmail);
    await this.passwordPlaceholder.click();
    await this.passwordInput.fill(userPassword);
    await this.logInButton.click();
  }

  async logInWithWait(userEmail: string, userPassword: string) {
    await this.emailInput.click();
    await this.emailInput.fill(userEmail);
    await sleep(this.FAKER.number.int({ min: 1000, max: 4000 })); // To avoid recaptcha
    await this.passwordPlaceholder.click();
    await this.passwordInput.fill(userPassword);
    await this.logInButton.click();
  }
}
