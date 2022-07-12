
// used by create household endpoint 
export interface householdProps {
  name?: string,
  created_by?: string,
  description?: string,
  picture?: string,
  blocked_at?: Date,
  deactivated_at?: Date,
  created_at?: Date,
  deleted_at?: Date,
  updated_at?: Date,
}

// used by update household endpoint 
export interface householdWithIdProps extends householdProps {
  id: string,
}

export interface householdNecessaryProps extends householdProps {
  name: string,
  created_by: string,
}

export interface householdListProps extends householdProps {
  id: string,
}[]