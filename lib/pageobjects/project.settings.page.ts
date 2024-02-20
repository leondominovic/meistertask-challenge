import { Locator, Page } from "@playwright/test";
export class ProjectSettingsPage {
  protected readonly page: Page;
  protected readonly projectSettingsThreeDotMenu: Locator;
  protected readonly deleteProjectOptionSettings: Locator;
  protected readonly deleteConfirmationInput: Locator;
  protected readonly deleteSubmitConfirmationButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.projectSettingsThreeDotMenu = page
      .locator(
        "div[data-test-id='dialog-ProjectInformation'] >> div[data-test-id='icon-text-button']",
      )
      .last();
    this.deleteProjectOptionSettings = page.locator(
      "div[data-test-id='list-item-trash']",
    );
    this.deleteConfirmationInput = page.locator("input[placeholder='DELETE']");
    this.deleteSubmitConfirmationButton = page.locator(
      "div[data-test-id='confirm'] div[class='kr-text']",
    );
  }
  async deleteProject() {
    await this.projectSettingsThreeDotMenu.isVisible();
    await this.projectSettingsThreeDotMenu.click();
    await this.deleteProjectOptionSettings.click();
    await this.deleteConfirmationInput.waitFor();
    await this.deleteConfirmationInput.fill("DELETE");
    await this.deleteSubmitConfirmationButton.click();
  }
}
