interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Building Owner'],
  customerRoles: ['Service Provider'],
  tenantRoles: ['Building Owner', 'Property Manager', 'Maintenance Staff'],
  tenantName: 'Organization',
  applicationName: 'building maintenance system  v2',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
