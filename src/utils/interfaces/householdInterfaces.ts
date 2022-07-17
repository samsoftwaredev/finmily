// used by create household endpoint
export interface householdProps {
  name?: string;
  created_by?: string;
  description?: string;
  picture?: string;
  blocked_at?: Date;
  deactivated_at?: Date;
  created_at?: Date;
  deleted_at?: Date;
  updated_at?: Date;
}
// used by update household endpoint

export interface householdRequiredProps {
  name: string;
  created_by: string;
}
