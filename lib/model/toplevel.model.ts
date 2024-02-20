import { Project, Variables } from "./create.project.model";

export interface TopLevel {
  query: string;
  operationName: string;
  operationType: string;
  variables?: Variables;
}
export interface Variables {
  project: Project;
}
export interface Project {
  id?: string;
  status?: string;
  name?: string;
  notes?: string;
  share_mode?: number;
  create_default_sections?: boolean;
}
