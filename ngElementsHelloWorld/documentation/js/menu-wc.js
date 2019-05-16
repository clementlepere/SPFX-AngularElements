'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ng-elements-hello-world documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppComponent.html" data-type="entity-link">AppComponent</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-component-AppComponent-db6cfe0256a52d74a9d61d9652858d1f"' : 'data-target="#xs-components-links-component-AppComponent-db6cfe0256a52d74a9d61d9652858d1f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-component-AppComponent-db6cfe0256a52d74a9d61d9652858d1f"' :
                                            'id="xs-components-links-component-AppComponent-db6cfe0256a52d74a9d61d9652858d1f"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-e696d06039e6d32c4f8351f218347f3d"' : 'data-target="#xs-components-links-module-AppModule-e696d06039e6d32c4f8351f218347f3d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e696d06039e6d32c4f8351f218347f3d"' :
                                            'id="xs-components-links-module-AppModule-e696d06039e6d32c4f8351f218347f3d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-e696d06039e6d32c4f8351f218347f3d"' : 'data-target="#xs-injectables-links-module-AppModule-e696d06039e6d32c4f8351f218347f3d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e696d06039e6d32c4f8351f218347f3d"' :
                                        'id="xs-injectables-links-module-AppModule-e696d06039e6d32c4f8351f218347f3d"' }>
                                        <li class="link">
                                            <a href="injectables/BackendRequestClass.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BackendRequestClass</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-0c3fbce27fd38f28bc729112b1ed7444"' : 'data-target="#xs-injectables-links-module-CoreModule-0c3fbce27fd38f28bc729112b1ed7444"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-0c3fbce27fd38f28bc729112b1ed7444"' :
                                        'id="xs-injectables-links-module-CoreModule-0c3fbce27fd38f28bc729112b1ed7444"' }>
                                        <li class="link">
                                            <a href="injectables/DownloadService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DownloadService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpInterceptorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>HttpInterceptorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/IsOnlineService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>IsOnlineService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoadTitleSPService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoadTitleSPService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PermissionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PlanningFolderService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PlanningFolderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TableGenericService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TableGenericService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TrackerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TrackerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-acd9561af216c9aba2fe3f140b5bbc54"' : 'data-target="#xs-components-links-module-SharedModule-acd9561af216c9aba2fe3f140b5bbc54"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-acd9561af216c9aba2fe3f140b5bbc54"' :
                                            'id="xs-components-links-module-SharedModule-acd9561af216c9aba2fe3f140b5bbc54"' }>
                                            <li class="link">
                                                <a href="components/CustomMessageValidationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomMessageValidationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SharedLoaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SharedLoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SharedLoaderTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SharedLoaderTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SharedTableGenericComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SharedTableGenericComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TrackersModule.html" data-type="entity-link">TrackersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TrackersModule-2ac4c02c79241c07d79f71fb2d0020dd"' : 'data-target="#xs-components-links-module-TrackersModule-2ac4c02c79241c07d79f71fb2d0020dd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TrackersModule-2ac4c02c79241c07d79f71fb2d0020dd"' :
                                            'id="xs-components-links-module-TrackersModule-2ac4c02c79241c07d79f71fb2d0020dd"' }>
                                            <li class="link">
                                                <a href="components/SummaryListTrackersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SummaryListTrackersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CustomMessageValidationComponent.html" data-type="entity-link">CustomMessageValidationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NoContentComponent.html" data-type="entity-link">NoContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SharedLoaderComponent.html" data-type="entity-link">SharedLoaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SharedLoaderTableComponent.html" data-type="entity-link">SharedLoaderTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SharedTableGenericComponent.html" data-type="entity-link">SharedTableGenericComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SummaryListTrackersComponent.html" data-type="entity-link">SummaryListTrackersComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BackEndRequest.html" data-type="entity-link">BackEndRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColumnsTable.html" data-type="entity-link">ColumnsTable</a>
                            </li>
                            <li class="link">
                                <a href="classes/CTracker.html" data-type="entity-link">CTracker</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardContact.html" data-type="entity-link">DashboardContact</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardContactDetails.html" data-type="entity-link">DashboardContactDetails</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardHomeDescriptionModel.html" data-type="entity-link">DashboardHomeDescriptionModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardHomeNewsModel.html" data-type="entity-link">DashboardHomeNewsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DirectoryArtifacts.html" data-type="entity-link">DirectoryArtifacts</a>
                            </li>
                            <li class="link">
                                <a href="classes/DirectoryPlanningFolder.html" data-type="entity-link">DirectoryPlanningFolder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExportedArtifact.html" data-type="entity-link">ExportedArtifact</a>
                            </li>
                            <li class="link">
                                <a href="classes/FavoriteFolder.html" data-type="entity-link">FavoriteFolder</a>
                            </li>
                            <li class="link">
                                <a href="classes/FavoriteTracker.html" data-type="entity-link">FavoriteTracker</a>
                            </li>
                            <li class="link">
                                <a href="classes/FavoriteUrl.html" data-type="entity-link">FavoriteUrl</a>
                            </li>
                            <li class="link">
                                <a href="classes/Graph.html" data-type="entity-link">Graph</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link">Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/HomePageConfig.html" data-type="entity-link">HomePageConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/HomeTools.html" data-type="entity-link">HomeTools</a>
                            </li>
                            <li class="link">
                                <a href="classes/Link.html" data-type="entity-link">Link</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageValidation.html" data-type="entity-link">MessageValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockPeoplePickerService.html" data-type="entity-link">MockPeoplePickerService</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockPermissionsService.html" data-type="entity-link">MockPermissionsService</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockPlanningFolderService.html" data-type="entity-link">MockPlanningFolderService</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgSelect.html" data-type="entity-link">NgSelect</a>
                            </li>
                            <li class="link">
                                <a href="classes/Options.html" data-type="entity-link">Options</a>
                            </li>
                            <li class="link">
                                <a href="classes/Package.html" data-type="entity-link">Package</a>
                            </li>
                            <li class="link">
                                <a href="classes/Release.html" data-type="entity-link">Release</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResultPasteArtifact.html" data-type="entity-link">ResultPasteArtifact</a>
                            </li>
                            <li class="link">
                                <a href="classes/SiteUsage.html" data-type="entity-link">SiteUsage</a>
                            </li>
                            <li class="link">
                                <a href="classes/SourceCodeFolderPermissions.html" data-type="entity-link">SourceCodeFolderPermissions</a>
                            </li>
                            <li class="link">
                                <a href="classes/SourceCodePermissions.html" data-type="entity-link">SourceCodePermissions</a>
                            </li>
                            <li class="link">
                                <a href="classes/SourceCodeServer.html" data-type="entity-link">SourceCodeServer</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpecificPermissions.html" data-type="entity-link">SpecificPermissions</a>
                            </li>
                            <li class="link">
                                <a href="classes/spList.html" data-type="entity-link">spList</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatusType.html" data-type="entity-link">StatusType</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatutTransition.html" data-type="entity-link">StatutTransition</a>
                            </li>
                            <li class="link">
                                <a href="classes/SvnRepository.html" data-type="entity-link">SvnRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableStatutTransition.html" data-type="entity-link">TableStatutTransition</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableTracker.html" data-type="entity-link">TableTracker</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tracker.html" data-type="entity-link">Tracker</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrackerGraph.html" data-type="entity-link">TrackerGraph</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnitOfTracker.html" data-type="entity-link">UnitOfTracker</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppState.html" data-type="entity-link">AppState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BackendRequestClass.html" data-type="entity-link">BackendRequestClass</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DownloadService.html" data-type="entity-link">DownloadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpInterceptorService.html" data-type="entity-link">HttpInterceptorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IsOnlineService.html" data-type="entity-link">IsOnlineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadTitleSPService.html" data-type="entity-link">LoadTitleSPService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PeoplePickerService.html" data-type="entity-link">PeoplePickerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link">PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlanningFolderService.html" data-type="entity-link">PlanningFolderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TableGenericService.html" data-type="entity-link">TableGenericService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrackerService.html" data-type="entity-link">TrackerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/DataResolver.html" data-type="entity-link">DataResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});