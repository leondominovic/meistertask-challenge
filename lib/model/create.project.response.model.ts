export interface CreateProjectResponse {
  data: Data;
}

export interface Data {
  create_project: CreateProject;
}

export interface CreateProject {
  project: Project;
}

export interface Project {
  id: number;
  name: string;
  notes: string;
  token: string;
  status: number;
  team_id: number;
  mail_token: string;
  share_token: null;
  share_mode: number;
  tasks_active_count: number;
  share_token_enabled: boolean;
  tasks_assigned_count: number;
  created_at: string;
  deletion_date: null;
  creator_name: string;
  creator_id: number;
  team: Team;
  dashboard_order: DashboardOrder;
  project_rights: ProjectRight[];
  active_sections: ActiveSection[];
  public_project_settings: PublicProjectSetting[];
}

export interface ActiveSection {
  id: number;
  name: string;
  color: string;
  limit: null;
  status: number;
  sequence: number;
  indicator: number;
  project_id: number;
  description: null;
  automationsCount: number;
}

export interface DashboardOrder {
  id: number;
  item_id: number;
  item_type: string;
  sequence: number;
  person_id: number;
  team_id: number;
}

export interface ProjectRight {
  id: number;
  role_id: number;
  watching: null;
  person_id: number;
  project_id: number;
}

export interface PublicProjectSetting {
  id: number;
  name: string;
  value: string;
  project_id: number;
}

export interface Team {
  id: number;
  active_users: number;
  active_person_ids: number[];
  active_admins_ids: number[];
  domain: null;
  name: string;
  users: number;
  mt_plan: MTPlan;
  branding: null;
}

export interface MTPlan {
  name: string;
  max_user_limit: number;
}
