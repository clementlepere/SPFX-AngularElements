import { Routes } from '@angular/router';

// import { ArtefactsListOfTrackerComponent } from './Views/artefacts-list-of-tracker';
// import { DashboardHomeComponent } from './Views/dashboard-home';
// import { CreateKanbanComponent } from './Views/kanban/create-kanban';
// import { KanbanBoardConfigComponent } from './Views/kanban/kanban-board-config';
// import { KanbanListComponent } from './Views/kanban/kanban-list';
// import { OpenKanbanComponent } from './Views/kanban/open-kanban';
// import { UpdateKanbanComponent } from './Views/kanban/update-kanban';
// import { PackagesComponent } from './Views/packages';
// import { PlanningFolderComponent } from './Views/planning-folder';
// import { PlanningFolderSummaryComponent } from './Views/planning-folder-summary';
// import { ProjectAdministrationComponent } from './Views/project-administration';
// import { SiteUsageComponent } from './Views/project-administration/site-usage/site-usage.component';
// import { RegionalSettingsComponent } from './Views/regional-settings';
// import { ReleasesComponent } from './Views/releases';
// import { CreateSvnRepositoryComponent } from './Views/repository-management/create-svn-repository';
// import { SavedAllSharedComponent } from './Views/SavedAllShared/SavedAllShared.component';
// import { SavedSharedComponent } from './Views/SavedShared/SavedShared.component';
// import { SearchAdvancedAllTrackerComponent } from './Views/search-advanced-alltracker/search-advanced-alltracker.component';
// import { SearchAdvancedTrackerComponent } from './Views/search-advanced-tracker/search-advanced-tracker.component';
// import { CreateTrackerComponent } from './Views/site-admin/create-tracker';
// import { EditTransitionsComponent } from './Views/site-admin/edit-transitions';
// import { SiteAdminMainComponent } from './Views/site-admin/site-admin-main';
// import { StatusTypeComponent } from './Views/site-admin/status-type';
// import { TrackersComponent } from './Views/site-admin/trackers';
// import { TransitionsComponent } from './Views/site-admin/transitions';
// import { TreeDemoComponent } from './Views/site-admin/tree-demo';
// import { CreateSourceCodeComponent } from './Views/source-code/create-source-code';
// import { SourceCodePermissionsComponent } from './Views/source-code/source-code-permissions';
// import { SpecificPermissionsComponent } from './Views/source-code/source-code-specific-permission';
import { SummaryListTrackersComponent } from '@app/features/trackers/summary-list-trackers';
import { NoContentComponent } from './shared/components/no-content/no-content.component';
// import { GroupMatrixComponent } from './Views/user-group-matrix/user-group-matrix.component';

export const ROUTES: Routes = [
    // { path: '', component: DashboardHomeComponent },
    // { path: 'home', component: DashboardHomeComponent },
    // { path: 'treeDemo', component: TreeDemoComponent },
    // { path: 'siteAdmin', component: SiteAdminMainComponent },
    // { path: 'createTracker', component: CreateTrackerComponent },
    // { path: 'updateTracker', component: CreateTrackerComponent },
    // { path: 'transitions', component: TransitionsComponent },
    // { path: 'editTransitions', component: EditTransitionsComponent },
    // { path: 'createSourceCode', component: CreateSourceCodeComponent },
    // { path: 'sourceCodePermissions', component: SourceCodePermissionsComponent },
    // { path: 'sourceCodeSpecificPermissions', component: SpecificPermissionsComponent },
    // { path: 'createSvnRepository', component: CreateSvnRepositoryComponent },
    // { path: 'trackers', component: TrackersComponent },
    // { path: 'planningFolder', component: PlanningFolderComponent },
    // { path: 'statusType', component: StatusTypeComponent },
    // { path: 'planningFolderSummary', component: PlanningFolderSummaryComponent },
    // { path: 'artefactsListOfTracker', component: ArtefactsListOfTrackerComponent },
    // { path: 'createKanban', component: CreateKanbanComponent },
    // { path: 'updateKanban', component: UpdateKanbanComponent },
    // { path: 'kanbanBoardConfig', component: KanbanBoardConfigComponent },
    // { path: 'openKanban', component: OpenKanbanComponent },
    // { path: 'kanbanList', component: KanbanListComponent },
    // { path: 'packages', component: PackagesComponent },
    // { path: 'package', component: ReleasesComponent },
    // { path: 'searchAdvancedTracker', component: SearchAdvancedTrackerComponent },
    // { path: 'savedShared', component: SavedSharedComponent },
    // { path: 'searchAdvancedAllTracker', component: SearchAdvancedAllTrackerComponent },
    // { path: 'savedAllShared', component: SavedAllSharedComponent },
    // { path: 'regionalSettings', component: RegionalSettingsComponent },
    // { path: 'siteUsage', component: SiteUsageComponent },
    // { path: 'projectAdministration', component: ProjectAdministrationComponent },
    // { path: 'dashboardHome', component: DashboardHomeComponent },
    // { path: 'userGroupMatrix', component: GroupMatrixComponent },
    // { path: 'summaryTracker/:showMigrated', component: SummaryListTrackersComponent },

    // { path: 'file-releases', loadChildren: './Features/file-releases/file-releases.module#FileReleasesModule' },


    // { path: 'summaryTracker/:showMigrated', component: SummaryListTrackersComponent },

    // { path: '**', component: NoContentComponent },
    { path: '**', component: SummaryListTrackersComponent },

    // {
    //     path: '**',
    //     loadChildren: './features/trackers/trackers.module#TrackersModule'
    //   }
];
