import { LocalStorageService } from 'angular-2-local-storage';

export class DirectoryPlanningFolder {
    loadingChildren: boolean = false;
    id: string;
    name: string;
    directories: Array<any>;
    files: Array<any>;
    icon: string;
    expanded: boolean = false;
    checked: boolean;
    openclose: string;
    total: string;
    active: boolean;
    openpriority: Array<any>;
    planningfolderid: string;
    est: string;
    rem: string;
    act: string;
    pts: string;
    loadingShow: boolean = false;
    public localStorageService: LocalStorageService;
    startdate: Date;
    enddate: Date;
    justName: string;
    status: string;
    constructor(id, name, directories, files, openclose, total, planningfolderid, est, rem, act, pts, active, openpriority, expanded, localStorageService, startdate, enddate, justName, status) {
        this.id = id;
        this.name = name;
        this.files = files;
        this.directories = directories;
        this.expanded = expanded;
        this.checked = false;
        this.openclose = openclose;
        this.total = total;
        this.planningfolderid = planningfolderid;
        this.est = est;
        this.rem = rem;
        this.act = act;
        this.pts = pts;
        this.active = active;
        this.openpriority = openpriority;
        this.expanded = expanded;
        this.localStorageService = localStorageService;
        this.startdate = startdate;
        this.enddate = enddate;
        this.justName = justName;
        this.status = status;
    }
    toggle() {
        this.expanded = !this.expanded;
        this.localStorageService.set("planningFolder_" + this.name, this.expanded);
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