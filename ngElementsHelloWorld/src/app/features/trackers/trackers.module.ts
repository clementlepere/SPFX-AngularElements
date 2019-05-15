import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2TableModule } from 'ng2-table';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '@app/shared/shared.module';
import { SummaryListTrackersComponent } from '@app/features/trackers/summary-list-trackers/summary-list-trackers.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        Ng2TableModule,
        PaginationModule.forRoot(),
        SharedModule,
    ],
    declarations: [
        SummaryListTrackersComponent,
    ],
    exports: [SummaryListTrackersComponent],
})
export class TrackersModule { }

