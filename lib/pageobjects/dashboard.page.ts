import { Locator, Page } from "@playwright/test";
import { config } from "../utils/config";

export class DashboardPage {
  protected readonly page: Page;
  protected readonly mainHeader: Locator;
  protected readonly addProjectButton: Locator;
  protected readonly newEmptyProjectOption: Locator;
  protected readonly projectNameInput: Locator;
  protected readonly projectNameDescription: Locator;
  protected readonly newProjectDialog: Locator;
  protected readonly submitProjectButton: Locator;
  protected readonly openSectionHeader: Locator;
  protected readonly addTaskIcon: Locator;
  protected readonly addTaskDialog: Locator;
  protected readonly taskNameInput: Locator;
  protected readonly taskDialogSubmit: Locator;
  protected readonly threeDotMenuOnHover: Locator;
  protected readonly projectSettingsThreeDotMenu: Locator;
  protected readonly deleteProjectOptionSettings: Locator;
  protected readonly taskDialog: Locator;
  protected readonly submitCommentButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.mainHeader = page.getByText("Projects", { exact: true }).first();
    this.addProjectButton = page.locator(
      "div[data-test-id='navbar-projects-plus']",
    );
    this.newEmptyProjectOption = page.locator(
      "div[data-test-id='list-item-newProject']",
    );
    this.projectNameInput = page.locator(
      "textarea[data-test-id='project-create-dialog-input-name']",
    );
    this.projectNameDescription = page.locator(
      "textarea[data-test-id='project-create-dialog-input-description']",
    );
    this.submitProjectButton = page.locator(
      "div[data-test-id='project-create-dialog-button-submit']",
    );
    this.newProjectDialog = page.locator(
      "[data-test-id='dialog-ProjectCreate']",
    );
    this.openSectionHeader = page.locator(
      "(//div[@class='kr-text'][normalize-space()='Open'])[1]",
    );
    this.addTaskIcon = page
      .locator(
        "//div[contains(text(),'Share')]/parent::div//parent::div//parent::div//div[@data-test-id='icon-text-button']",
      )
      .first();
    this.addTaskDialog = page.locator("[data-test-id='dialog-task-adder']");
    this.taskNameInput = page.locator(
      "[data-test-id='dialog-task-adder-name-input']",
    );
    this.taskDialogSubmit = page.locator(
      "[data-test-id='task-adder-dialog-submit']",
    );
    this.threeDotMenuOnHover = page.locator(
      "[data-test-id='navbar-project-more']",
    );
    this.projectSettingsThreeDotMenu = page
      .locator(
        "div[data-test-id='dialog-ProjectInformation'] >> div[data-test-id='icon-text-button']",
      )
      .last();
    this.deleteProjectOptionSettings = page.locator(
      "div[data-test-id='list-item-trash']",
    );
    this.taskDialog = page.locator("div[data-test-id='dialog-TaskDialog']");
    this.submitCommentButton = page
      .locator(
        "//div[@data-test-id='dialog-TaskDialog']/div/div[2]/div[1]/div[6]/div[2]/div[1]//div[@data-test-id='icon-text-button']",
      )
      .last();
  }

  async goto() {
    await this.page.goto(config.app.baseUrl + "app/dashboard");
    await this.mainHeader.waitFor();
  }

  async createNewEmptyProject(projectName: string, projectDescription: string) {
    await this.addProjectButton.click();
    await this.newEmptyProjectOption.click();
    await this.newProjectDialog.waitFor();
    await this.projectNameInput.fill(projectName);
    await this.projectNameDescription.fill(projectDescription);
    await this.submitProjectButton.click();
  }

  async openProject(projectName: string) {
    await this.page.getByText(projectName, { exact: true }).first().click();
    await this.openSectionHeader.waitFor();
  }

  async createDefaultTask(taskName: string) {
    await this.addTaskIcon.click();
    await this.addTaskDialog.waitFor();
    await this.taskNameInput.fill(taskName);
    await this.taskDialogSubmit.click();
    await this.taskDialogSubmit.waitFor({ state: "hidden" });
  }
  async openTask(taskName: string) {
    await this.page.getByText(taskName, { exact: true }).waitFor();
    await this.page.getByText(taskName, { exact: true }).click();
    await this.taskDialog.waitFor();
  }
  async openProjectsSettings(projectName: string) {
    await this.page.getByText(projectName, { exact: true }).first().hover();
    await this.page
      .locator(
        `//div[contains(text(),'${projectName}')]/parent::div/parent::div/parent::div//div[@data-test-id='navbar-project-more-right']`,
      )
      .click();
  }
}
