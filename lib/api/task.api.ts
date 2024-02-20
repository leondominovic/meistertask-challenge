import { APIRequestContext, expect } from "@playwright/test";
import { CreateProjectResponse } from "../model/create.project.response.model";
import { createProjectRequest, deleteProject } from "../utils/data.factory";

export class MeisterTaskApi {
  protected readonly request: APIRequestContext;
  protected readonly headers: any;
  constructor(request: APIRequestContext) {
    this.request = request;

    this.headers = {
      headers: {
        Accept: "application/json, texat/plain, */*",
      },
    };
  }

  async createProject(name: string, description: string) {
    const response = await this.request.post(
      `/internal/api/graphql?m=CreateProject`,
      {
        data: createProjectRequest(name, description),
        ...this.headers,
      },
    );
    expect(response.status()).toBe(200);

    return (await response.json()) as CreateProjectResponse;
  }

  async deleteProject(id: number) {
    const response = await this.request.post(
      `/internal/api/graphql?m=UpdateProject`,
      {
        data: deleteProject(id),
        ...this.headers,
      },
    );
    expect(response.status()).toBe(200);
  }
}
