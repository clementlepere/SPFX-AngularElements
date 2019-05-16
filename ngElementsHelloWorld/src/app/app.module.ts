import '../styles/headings.css';
import '../styles/styles.css';

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationRef, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { APP_RESOLVER_PROVIDERS } from '@app/app.resolver';
import { ROUTES } from '@app/app.routes';
import { AppState, InternalStateType } from '@app/app.service';
import { BackendRequestClass } from '@app/backend.request';
import { CoreModule } from '@app/core/core.module';
import { TrackersModule } from '@app/features/trackers/trackers.module';
import { LocalStorageModule } from 'angular-2-local-storage';
import { DragulaModule } from 'ng2-dragula';
import { SelectModule } from 'ng2-select';
import { Ng2TableModule } from 'ng2-table';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { PickListModule } from 'primeng/components/picklist/picklist';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ConfirmDialogModule,
    PickListModule,
    BrowserModule,
    ButtonsModule,
    CoreModule,
    DragulaModule,
    ModalModule,
    Ng2TableModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    SelectModule,
    TrackersModule,
    TooltipModule.forRoot(),
    // HttpModule,
    HttpClientModule,
    // LocalStorageModule.forRoot({
    //   prefix: 'my-app',
    //   storageType: 'localStorage',
    // }),
    TooltipModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage',
    }),
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })

  ],
  providers: [
    BackendRequestClass,
    {
      provide: APP_INITIALIZER, useFactory: (config: BackendRequestClass) => () => config.load(),
      deps: [BackendRequestClass], multi: true
    },
  ],
  entryComponents: [AppComponent]
})
export class AppModule {
  appState: any;
  appRef: any;
  constructor(private injector: Injector) {   }

  ngDoBootstrap(appRef: ApplicationRef) {
   
    // const rootElements = document.querySelectorAll('app-root');

    // for (const element of rootElements as any as HTMLElement[]) {
    //   console.log('element', element);
    //   appRef.bootstrap(AppComponent, element);
    // }

    if (!customElements.get('app-root')) {
      const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
      const helloElement = createCustomElement(AppComponent, { injector: this.injector, strategyFactory });
      customElements.define('app-root', helloElement);
    }

    // if (!customElements.get('summary-list-trackers')) {
    //   const AppElement1 = createCustomElement(SummaryListTrackersComponent, { injector: this.injector });
    //   customElements.define('summary-list-trackers', AppElement1);
    // }
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    //
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  // public hmrOnDestroy(store: StoreType) {
  //   const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
  //   // save state
  //   const state = this.appState._state;
  //   store.state = state;
  //   // recreate root elements
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   // save input values
  //   store.restoreInputValues = createInputTransfer();
  //   // remove styles
  //   removeNgStyles();
  // }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
