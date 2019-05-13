export class ExportedArtifact {

    Artifact_Id: string;
    Title: string;
    Priority: number;
    Assigned_to: string;
    Planning_Folder: string;
    Status: string;
    Group: string;
    Category: string;
    Est_Effort: string;
    Rem_Effort: string;
    Act_Effort: string;
    Points: string;

    Dependency_Parent: string;
    Dependency_Children: string;

    TrackerId: string;
    TrackerName: string;

    constructor(Artifact_Id, Title, Priority, Assigned_to, Planning_Folder, Status, Group, Category, Est_Effort, Rem_Effort, Act_Effort, Points, Dependency_Parent, Dependency_Children, TrackerId, trackerName: string) {

        this.Artifact_Id = Artifact_Id;
        this.Title = Title;
        this.Priority = Priority;
        this.Assigned_to = Assigned_to;
        this.Planning_Folder = Planning_Folder;
        this.Status = Status;
        this.Group = Group;
        this.Category = Category;
        this.Est_Effort = Est_Effort;
        this.Rem_Effort = Rem_Effort;
        this.Act_Effort = Act_Effort;
        this.Points = Points;
        this.Dependency_Parent = Dependency_Parent;
        this.Dependency_Children = Dependency_Children;
        this.TrackerId = TrackerId;
        this.TrackerName = trackerName;


    }

}
