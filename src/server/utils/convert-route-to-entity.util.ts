const mapping: Record<string, string> = {
  costs: 'Cost',
  organizations: 'organization',
  tasks: 'task',
  'task-summaries': 'task_summary',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
