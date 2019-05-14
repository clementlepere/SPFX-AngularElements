import '../../styles/headings.css';
import '../../styles/styles.css';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    CustomMessageValidationComponent,
} from '@app/shared/components/custom-message-validation/custom-message-validation.component';
import { SharedLoaderTableComponent } from '@app/shared/components/loader-table/shared-loader-table.component';
import { SharedLoaderComponent } from '@app/shared/components/loader/shared-loader.component';
import { NoContentComponent } from '@app/shared/components/no-content/no-content.component';
import {
    SharedTableGenericComponent,
} from '@app/shared/components/table/shared-table-generic/shared-table-generic.component';
import { SelectModule } from 'ng2-select';
import { Ng2TableModule } from 'ng2-table';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { PickListModule } from 'primeng/components/picklist/picklist';

@NgModule({
    imports: [
        ButtonsModule.forRoot(),
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        Ng2TableModule,
        PaginationModule.forRoot(),
        SelectModule,
        TooltipModule.forRoot(),
        // LocalStorageModule.forRoot({
        //     prefix: 'my-app',
        //     storageType: 'localStorage',
        // }),
        PickListModule,
        ConfirmDialogModule
    ],
    declarations: [
        SharedLoaderTableComponent,
        SharedLoaderComponent,
        SharedTableGenericComponent,
        CustomMessageValidationComponent,
        NoContentComponent,
    ],
    exports: [
        CommonModule,

        CustomMessageValidationComponent,
        SharedTableGenericComponent,
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
    constructor() { }

    // ngDoBootstrap(appRef: ApplicationRef) {
    //     const rootElements = document.querySelectorAll('app-root');
    //     for (const element of rootElements as any as HTMLElement[]) {
    //       appRef.bootstrap(AppComponent, element);
    //     }
    //   }
};
