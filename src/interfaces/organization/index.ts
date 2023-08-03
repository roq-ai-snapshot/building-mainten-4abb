import { UserInterface } from 'interfaces/user';
import { CostInterface } from 'interfaces/cost';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  Cost_id: string;

  user?: UserInterface;
  Cost?: CostInterface;
  _count?: {};
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
  Cost_id?: string;
}
