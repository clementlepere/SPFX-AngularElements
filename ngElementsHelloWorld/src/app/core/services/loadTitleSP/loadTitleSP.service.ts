import { Injectable } from '@angular/core';

@Injectable()
export class LoadTitleSPService {
    titles: any = [
        { hash: '#/home', title: "Home" },
        { hash: '#/summaryTracker/true', title: "Trackers summary migrated" },
        { hash: '#/summaryTracker/false', title: "Trackers summary" },
        { hash: '#/createTracker', title: "Create tracker" },
        { hash: '#/updateTracker', title: "Edit tracker" },
        { hash: '#/transitions', title: "Status transitions" },
        { hash: '#/editTransitions', title: "Edit transition status" },
        { hash: '#/createSourceCode', title: "Create source code" },
        { hash: '#/artefactsListOfTracker', title: "Artifacts list of tracker" },
        { hash: '#/planningFolder', title: "Planning folders summary" },
        { hash: '#/kanbanBoardConfig', title: "Kanban board configuration" },
        { hash: '#/openKanban', title: "Kanban details" },
        { hash: '#/statusType', title: "Status types" },
        { hash: '#/kanbanList', title: "Kanbans Summary" },
        { hash: '#/packages', title: "Packages summary" },
        { hash: '#/package', title: "Releases summary" },
        { hash: '#/searchAdvancedTracker', title: "Tracker Search Criteria" },
        { hash: '#/sourceCodeSpecificPermissions', title: "Source Code Specific Permissions" },
        { hash: '#/sourceCodePermissions', title: "Source Code Permissions" },
        { hash: '#/savedAllShared', title: "Search Advanced - All Trackers" },
        { hash: '#/searchAdvancedAllTracker', title: "Search Advanced - All Trackers" },
        { hash: '#/siteUsage', title: 'Site Usage' },
        { hash: '#/userGroupMatrix', title: 'User Group Matrix' },
        // Default
        { hash: '#/', title: "Home" },
    ];

    public loadTitle(overrideTitle: string = ""): void {
        setTimeout(() => {
            if (overrideTitle == "") {
                if (document.getElementById("mainTitleAngular") != null) {
                    let searchTitle = this.titles.filter(title => location.hash.indexOf(title.hash) != -1);
                    let title = (searchTitle.length >= 1) ? searchTitle[0].title : "";

                    document.getElementById("mainTitleAngular").innerText = title;
                    document.getElementById("mainTitleAngular").title = overrideTitle;
                }
            } else {
                if (document.getElementById("mainTitleAngular") != null)
                    document.getElementById("mainTitleAngular").innerText = overrideTitle;
                document.getElementById("mainTitleAngular").title = overrideTitle;
            }
        }, 2000);
    }

    constructor() { }
}
