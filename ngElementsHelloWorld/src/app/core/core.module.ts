import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LoadTitleSPService } from '@app/core/services/loadTitleSP/loadTitleSP.service';
import { PermissionsService } from '@app/core/services/permissions/permissions.service';
import { MockPlanningFolderService } from '@app/core/services/planningFolders/mockplanningfolder.service';
import { PlanningFolderService } from '@app/core/services/planningFolders/planningFolders.service';
import { TableGenericService } from '@app/core/services/table/tablegeneric.service';
import { TrackerService } from '@app/core/services/trackers/trackers.service';
import { IsOnlineService } from '@app/core/services/helpers/isOnline.service';
import { DownloadService } from '@app/core/services/helpers/download.service';
import { HttpInterceptorService } from '@app/core/services/helpers/httpinterceptor.service';
/* our own custom services  */

@NgModule({
    imports: [
        /* 3rd party libraries */
        CommonModule,
        HttpClientModule,
        HttpModule,
    ],
    providers: [
        /* our own custom services  */
        IsOnlineService,
        LoadTitleSPService,
        MockPlanningFolderService,
        PermissionsService,
        PlanningFolderService,
        TableGenericService,
        TrackerService,
        HttpInterceptorService,
        DownloadService
    ],
})
export class CoreModule {
    /* make sure CoreModule is imported only by one NgModule the AppModule */
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule,
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
    }
}