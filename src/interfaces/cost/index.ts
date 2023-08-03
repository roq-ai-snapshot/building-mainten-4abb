import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CostInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  total_cost?: number;
  date?: any;
  material_usage_details?: string;
  organization?: OrganizationInterface[];

  _count?: {
    organization?: number;
  };
}

export interface CostGetQueryInterface extends GetQueryInterface {
  id?: string;
  material_usage_details?: string;
}
