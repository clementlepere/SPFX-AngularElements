export class MockPermissionsService {
  getPermissionsForTracker(): Promise<boolean> {
    return Promise.resolve(true);
  }
  getPermissionsByList(listName: string, permissionName: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}