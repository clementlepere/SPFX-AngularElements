export class Release {

    Id: string;
    ReleaseId: string;
    ReleaseName: string;
    Name: string;
    CreatedOn: string;
    Status: string;
    Files: number;
    LinkToDownload: string;
    Reported: number;
    Fixed: number;
    PlanningFolder: string;
    Maturity: string;
    public Download: string;
    PlanningFolderId: string;
    PlanningFolderURL: any[];
    AttachmentsURL: any[];


    constructor(Id: string, ReleaseId: string, Name: string, CreatedOn: string, Status: string, Files: number, LinkToDownload: string, Reported: number, Fixed: number, PlanningFolder: string, Maturity: string, Download: string, PlanningFolderId: string, PlanningFolderURL: any[], AttachmentsURL: any[], ReleaseName: string) {

        this.Id = Id;
        this.ReleaseId = ReleaseId;
        this.Name = Name;
        this.CreatedOn = CreatedOn;
        this.Status = Status;
        this.Files = Files;
        this.LinkToDownload = LinkToDownload;
        this.Reported = Reported;
        this.Fixed = Fixed;
        this.PlanningFolder = PlanningFolder;
        this.Maturity = Maturity;
        this.Download = Download;
        this.PlanningFolderId = PlanningFolderId;
        this.PlanningFolderURL = PlanningFolderURL;
        this.AttachmentsURL = AttachmentsURL;
        this.ReleaseName = ReleaseName;


    }
}