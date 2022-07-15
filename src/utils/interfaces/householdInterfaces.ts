// used by create household endpoint
export interface householdProps {
  name?: string;
  created_by?: string;
  description?: string;
  picture?: string;
  blocked_at?: string;
  deactivated_at?: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}

// used by update household endpoint
export interface householdWithIdProps extends householdProps {
  id: string;
}

export interface householdRequiredProps extends householdProps {
  name: string;
  created_by: string;
}

export interface householdListProps extends householdProps {
  id: string;
}
[];
