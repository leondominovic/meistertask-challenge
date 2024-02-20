import { test, expect } from "@playwright/test";
import { BASIC_USER_STORAGE, ONE_SECOND } from "../lib/global.constants";
import { DashboardPage } from "../lib/pageobjects/dashboard.page";
import { en, Faker } from "@faker-js/faker";
import { MeisterTaskApi } from "../lib/api/task.api";
import { CreateProjectResponse } from "../lib/model/create.project.response.model";
import { sleep } from "../lib/utils/generic.utils";
import { ProjectSettingsPage } from "../lib/pageobjects/project.settings.page";
import { TaskDialogPage } from "../lib/pageobjects/task.dialog.page";

test.use({ storageState: BASIC_USER_STORAGE });
test.describe.configure({ mode: "serial" });

const FAKER = new Faker({ locale: [en] });
const projectName = `New testing project ${FAKER.number.int({ min: 1000, max: 10000 })}`;
const taskName = FAKER.lorem.word();

test("Task-1: User can create a new project", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();
  await dashboardPage.createNewEmptyProject(
    projectName,
    FAKER.lorem.sentences(),
  );

  await expect(page.getByText(projectName)).toBeVisible();
});

test.describe("", async () => {
  let meisterTaskApi: MeisterTaskApi;
  let project: CreateProjectResponse;

  test("Task-2: User can see a created project", async ({ page }) => {
    const projectName = `New testing project ${FAKER.number.int({ min: 1000, max: 10000 })}`;
    meisterTaskApi = new MeisterTaskApi(page.request);
    project = await meisterTaskApi.createProject(
      projectName,
      FAKER.lorem.sentences(1),
    );

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();

    await expect(page.getByText(projectName)).toBeVisible();
  });

  test.afterEach(async () => {
    await meisterTaskApi.deleteProject(project.data.create_project.project.id);
  });
});

test("Task-3: User can create a new task in a project", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();
  await dashboardPage.openProject(projectName);

  if (await page.getByText("This is Timeline").isVisible()) {
    await page.getByText(projectName, { exact: true }).click();
  }

  await dashboardPage.createDefaultTask(taskName);

  await expect(page.getByText("Click to add a comment")).toBeVisible();
  await expect(page.getByText("Click to add a description")).toBeVisible();
});

test("Task-9: User can add a comment to some created task", async ({
  page,
}) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();
  await dashboardPage.openProject(projectName);

  if (await page.getByText("This is Timeline").isVisible()) {
    await page.getByText(projectName, { exact: true }).click();
  }

  const comment = FAKER.lorem.sentences(1);

  await dashboardPage.openTask(taskName);
  const taskDialog = new TaskDialogPage(page);
  await taskDialog.addComment(comment);

  await sleep(ONE_SECOND); // WAIT FOR STATE TO BE CLEAR

  await expect(page.getByText("Click to add a comment")).toBeVisible();
  await expect(page.getByText(comment)).toBeVisible();
});

test("Task-11: User can delete a project", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();
  await dashboardPage.openProject(projectName);
  await dashboardPage.openProjectsSettings(projectName);
  const projectSettingsPage = new ProjectSettingsPage(page);
  await projectSettingsPage.deleteProject();

  await expect(page.getByText("Project Deleted")).toBeVisible();
});
