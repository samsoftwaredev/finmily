import { ColorScheme } from '../../utils';

// used by create household endpoint
export interface userHouseholdProps {
  id?: string;
  is_admin?: boolean;
  looked_at?: Date;
  color?: ColorScheme;
}
// used by update household endpoint
export interface userHouseholdWithIdProps {
  id: string;
}
