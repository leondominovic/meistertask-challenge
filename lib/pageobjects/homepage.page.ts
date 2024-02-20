import { Locator, Page } from "@playwright/test";
import { config } from "../utils/config";

export class HomepagePage {
  protected readonly page: Page;
  readonly logInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInButton = page.getByText("Log In", { exact: true });
  }

  async goto() {
    await this.page.goto(config.app.baseUrl);
    await this.page.getByText("Your Team.", { exact: true });
  }
}
