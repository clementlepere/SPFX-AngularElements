export class SourceCodeFolderPermissions {


    Folder: { Path: string, Id: number };
    Permissions: [{ ScPermission: string, HasPermission: boolean }];
    SelectedPermission: string;
    RepositoryId: number;
    Action: string;

}
