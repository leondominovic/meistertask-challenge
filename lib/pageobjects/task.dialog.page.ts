import { Locator, Page } from "@playwright/test";

export class TaskDialogPage {
  protected readonly page: Page;
  protected readonly submitCommentButton: Locator;
  protected readonly commentBox: Locator;
  protected readonly addCheckListButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.submitCommentButton = page
      .locator(
        "//div[@data-test-id='dialog-TaskDialog']/div/div[2]/div[1]/div[6]/div[2]/div[1]//div[@data-test-id='icon-text-button']",
      )
      .last();
    this.commentBox = page.getByText("Click to add a comment");
    this.addCheckListButton = page.locator(
      "div[data-test-id='add-checklist-item']",
    );
  }
  async addComment(comment: string) {
    await this.addCheckListButton.waitFor();
    const box = await this.commentBox.boundingBox();
    await this.page.mouse.click(box!.x, box!.y);
    await this.page.keyboard.insertText(comment);
    const box2 = await this.submitCommentButton.boundingBox();
    await this.page.mouse.click(box2!.x, box2!.y);
  }
}
