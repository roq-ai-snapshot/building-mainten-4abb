import { GetQueryInterface } from 'interfaces';

export interface TaskSummaryInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  task_summaris: string;

  _count?: {};
}

export interface TaskSummaryGetQueryInterface extends GetQueryInterface {
  id?: string;
  task_summaris?: string;
}
