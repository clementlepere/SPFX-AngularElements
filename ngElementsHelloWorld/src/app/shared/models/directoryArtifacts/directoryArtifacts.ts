import { LocalStorageService } from 'angular-2-local-storage';

export class DirectoryArtifacts {
    loadingChildren: boolean = false;
    id: string;
    TrackerId: string;
    title: string;
    directories: Array<any>;
    files: Array<any>;
    icon: string;
    expanded: boolean = false;
    checked: boolean;
    artifactid: string;
    priority: Array<any>;
    assignedTo: string;
    status: string;
    group: string;
    category: string;
    plannedFor: string;
    EstimatedEffort: string;
    RemainingEffort: string;
    ActualEffort: string;
    SumPoint: string;
    Description: string;
    loadingShow: boolean = false;
    statustype: string;
    justName: string;

    CalculateEffort: string;
    trackerName: string;


    public localStorageService: LocalStorageService;
    constructor(id, TrackerId, title, directories, files, artifactid, priority, assignedTo, status, group, category, plannedFor, EstimatedEffort, RemainingEffort, ActualEffort, SumPoint, Description, expanded, localStorageService, statustype, justN, CalculateEffort, trackerName) {
        this.id = id;
        this.TrackerId = TrackerId;
        this.title = title;
        this.files = files;
        this.directories = directories;
        this.artifactid = artifactid;
        this.priority = priority;
        this.assignedTo = assignedTo;
        this.status = status;
        this.group = group;
        this.category = category;
        this.plannedFor = plannedFor;
        this.EstimatedEffort = EstimatedEffort;
        this.RemainingEffort = RemainingEffort;
        this.ActualEffort = ActualEffort;
        this.SumPoint = SumPoint;
        this.Description = Description;
        this.expanded = expanded;
        this.checked = false;
        this.expanded = expanded;
        this.localStorageService = localStorageService;
        this.statustype = statustype;
        this.justName = justN;
        this.CalculateEffort = CalculateEffort;
        this.trackerName = trackerName;

    }
    toggle() {
        this.expanded = !this.expanded;
        this.localStorageService.set("artifacts_" + this.title, this.expanded);
    }
    check() {
        let newState = !this.checked;
        this.checked = newState;
        this.checkRecursive(newState);
    }
    checkRecursive(state) {
        this.directories.forEach(d => {
            d.checked = state;
            d.checkRecursive(state);
        });
    }
}