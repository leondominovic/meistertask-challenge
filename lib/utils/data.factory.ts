import { TopLevel } from "../model/toplevel.model";

export function createProjectRequest(
  name: string,
  description: string,
): TopLevel {
  return {
    query:
      "mutation CreateProject($project: ProjectCreateInput!){create_project(project: $project){project{id,name,notes,token,status,team_id,mail_token,share_token,share_mode,tasks_active_count,share_token_enabled,tasks_assigned_count,created_at,deletion_date,creator_name,creator_id,team{id,active_users,active_person_ids,active_admins_ids,domain,name,users,mt_plan{name,max_user_limit},branding{include_on_export,url}},dashboard_order{id,item_id,item_type,sequence,person_id,team_id},project_rights{id,role_id,watching,person_id,project_id},active_sections{id,name,color,limit,status,sequence,indicator,project_id,description,automationsCount},public_project_settings{id,name,value,project_id}}}}",
    operationName: "CreateProject",
    operationType: "mutation",
    variables: {
      project: {
        name: name,
        notes: description,
        share_mode: 2,
        create_default_sections: true,
      },
    },
  };
}

export function deleteProject(projectId: number): TopLevel {
  return {
    query:
      "mutation UpdateProject($project: ProjectUpdateInput!){update_project(project: $project){project{id,name,notes,token,status,team_id,mail_token,share_token,share_mode,tasks_active_count,share_token_enabled,tasks_assigned_count,created_at,deletion_date,creator_name,creator_id,team{id,active_users,active_person_ids,active_admins_ids,domain,name,users,mt_plan{name,max_user_limit},branding{include_on_export,url}}}}}",
    operationName: "UpdateProject",
    operationType: "mutation",
    variables: {
      project: {
        id: projectId,
        status: "TRASHED",
      },
    },
  };
}
