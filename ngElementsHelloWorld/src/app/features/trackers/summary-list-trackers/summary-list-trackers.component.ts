import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IsOnlineService } from '@app/core/services/helpers/isOnline.service';
import { LoadTitleSPService } from '@app/core/services/loadTitleSP/loadTitleSP.service';
import { PermissionsService } from '@app/core/services/permissions/permissions.service';
import { TableGenericService } from '@app/core/services/table/tablegeneric.service';
import { TrackerService } from '@app/core/services/trackers/trackers.service';
import { CTracker } from '@app/shared/models/tracker/ctracker';
import { TableTracker } from '@app/shared/models/tracker/tabletracker';

@Component({
    selector: 'summary-list-trackers',
    styleUrls: ['./summary-list-trackers.component.css'],
    templateUrl: './summary-list-trackers.component.html',
})
export class SummaryListTrackersComponent implements OnInit {
    trackerIdSelected: string;
    trackerNameSelected: string;
    // Set our default values
    public title = 'List of my trackers';
    public showLoader = true;
    public disabledEdit = true;
    public editLink: number = null;
    public viewLink = '';
    public trackers: CTracker[];
    public permissionsTracker: boolean;
    public showMigrated: boolean;

    public sub: any;

    //Table
    public rows: Array<TableTracker>;
    public data: Array<TableTracker>;
    public dataSaved: Array<TableTracker> = this.data;
    public page = 1;
    public itemsPerPage = 30;
    public length = 0;
    public filters: any;

    public textModal = 'Are you sure to <b>delete</b> ';
    public titleModal = 'Deleting confirmation';
    public deleteNPMsg = 'it\'s not possible to delete the selected tracker';

    public errorMessage: string = null;
    public successMessage: string = null;
    public showModelPopup = false;

    //Define columns of table
    public columns: Array<any> = [
        {
            title: 'Icon', name: 'icon', sort: false,
        },
        {
            title: 'Favorite', name: 'favorite', sort: false, type: 'favorite', editFavorite: false,
        },
        {
            title: 'Tracker Name', name: 'trackerName', sort: 'asc', sortPossible: true,
        },
        {
            title: 'Open/Closed', name: 'openclose', sort: false,
        },
        {
            title: 'Total', name: 'total', sort: false,
        },
        {
            name: 'openpriority', title: 'Open by Priority', width: '24%', type: 'stackedbar', tooltip: '' +
                '<div class="panel-heading">Legend</div>' +
                '<div><span class="li1 badge badge-tooltip"> 1 </span><span class="marginLeft text-tooltip">Highest</span></div><br/>' +
                '<div><span class="li2 badge badge-tooltip"> 2 </span><span class="marginLeft text-tooltip">High</span></div><br/>' +
                '<div><span class="li3 badge badge-tooltip"> 3 </span><span class="marginLeft text-tooltip">Medium</span></div><br/>' +
                '<div><span class="li4 badge badge-tooltip"> 4 </span><span class="marginLeft text-tooltip">Low</span></div><br/>' +
                '<div><span class="li5 badge badge-tooltip"> 5 </span><span class="marginLeft text-tooltip">Lowest</span></div><br/>' +
                '<div><span class="li6 badge badge-tooltip"> 0 </span><span class="marginLeft text-tooltip">None</span></div><br/>' +
                '', tooltipPlacement: 'bottom', sort: false,

        },
        {
            title: 'TrackerID', name: 'trackerId', sortPossible: true,
        },
    ];

    // Define global config of table
    public config: any = {
        editMode: false,
        name: 'trackerSummary',
        paging: true,
        selecting: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table-striped', 'table-bordered'],
    };
    disabledDelete = true;

    // TypeScript public modifiers
    constructor(
        // public appState: AppState,
        public trackerService: TrackerService,
        public permissionService: PermissionsService,
        public tablegenericService: TableGenericService,
        public loadTitleSpService: LoadTitleSPService,
        public activatedRoute: ActivatedRoute,
        private isOnlineService: IsOnlineService,
    ) {
        if (this.isOnlineService.get() === true) {
            // this.getActivatedRoute();
            if (typeof this.activatedRoute.params !== 'undefined') {
                this.sub = this.activatedRoute.params.subscribe(params => {
                    // this.showMigrated = params['showMigrated']; // (+) converts string 'id' to a number
                    this.showMigrated = false; // (+) converts string 'id' to a number
                    this.tablegenericService.configureTable(this.columns, this.config);
                    this.loadTitleSpService.loadTitle();
                    this.getPermissionsForTracker();
                    this.getTrackersByListName();
                });
            }
        } else {
            this.showMigrated = false; // (+) converts string 'id' to a number
            this.tablegenericService.configureTable(this.columns, this.config);
            this.loadTitleSpService.loadTitle();
            this.trackers = [];
            const tracker: any = {
                AutoAssigned: null,
                Close: 0,
                Description: null,
                HiddenPoints: false,
                Icon: 'https://ddw-int.capgemini.com/sites/PerformanceTestS/Style%20Library/Images/icons/icon_39.png',
                Id: null,
                IsFavoriteTracker: false,
                IsSystemTracker: true,
                Open: 2,
                OpenPoints: 0,
                OpenPriority: [],
                TotalPoints: 0,
                Total: 2,
                TrackerId: 'tracker0752118',
                TrackerName: 'Actions',
                UnitId: 0,
                UnitName: null,
                ViewLink: '/sites/PerformanceTestS/TrackerForm/Lists/tracker0752118/TrackerHomeForm.aspx',
                sp_id: 1,
            };
            tracker.OpenPriority.push({
                Max: 2,
                Type: 'low',
                Value: 2,
            });
            this.trackers.push(tracker);
            this.formatDataTable(this.trackers);
        }
    }

    public ngOnInit() {
        console.log('onInit summary traker');
        // this.getActivatedRoute();
        // if (typeof this.activatedRoute.params != 'undefined') {
        //     this.sub = this.activatedRoute.params.subscribe(params => {
        //         // this.showMigrated = params['showMigrated']; // (+) converts string 'id' to a number
        //         this.showMigrated = false; // (+) converts string 'id' to a number
        //         this.tablegenericService.configureTable(this.columns, this.config);
        //         this.loadTitleSpService.loadTitle();
        //         this.getPermissionsForTracker();
        //         this.getTrackersByListName();
        //     });
        // }
    }

    public ngAfterViewInit() { }


    // tslint:disable-next-line:no-unused-variable
    private ngOnDestroy() {
        if (typeof this.sub != 'undefined') {
            this.sub.unsubscribe();
        }
    }

    //Tested
    public onRowClick(data: any): any {
        if (data !== null) {
            const arrayLineSelected: TableTracker[] = data._arrayLineSelected;

            if (data._arrayLineSelected.length === 1) {
                this.trackerIdSelected = arrayLineSelected[0]['trackerId'];
                this.trackerNameSelected = arrayLineSelected[0]['trackerName'].replace(/<\/?[^>]+(>|$)/g, '');
                this.editLink = arrayLineSelected[0].sp_id;
                this.viewLink = arrayLineSelected[0].ViewLink + '?';
                this.disabledEdit = false;
                this.disabledDelete = data._arrayLineSelected[0].IsSystemTracker ? true : false;
            } else {
                this.editLink = null;
                this.viewLink = '';
                this.disabledEdit = true;
                this.disabledDelete = true;
            }
        } else {
            this.editLink = null;
            this.viewLink = '';
            this.disabledEdit = true;
            this.disabledDelete = true;
        }

    }

    public favoriteEdited(data: any): any {
        this.trackerService.setFavoriteTracker(data);
    }

    public deleteTracker(trackerId: any): void {
        this.trackerService.deleteTracker(trackerId).subscribe((response) => {
            this.successMessage = 'Success ! The ' + this.trackerNameSelected + ' "'
                + this.trackerIdSelected + '"' + ' has been <b>deleted</b>';
            setTimeout(() => {
                this.successMessage = null;
            }, 3000);
            this.getTrackersByListName();
        }, (error) => {
            this.errorMessage = error;
            setTimeout(() => {
                this.errorMessage = null;
            }, 3000);
        });
        // .catch((response) => {
        //     this.errorMessage = response;
        //     setTimeout(() => {
        //         this.errorMessage = null;
        //     }, 3000);
        // });

    }

    // Don't need to be tested
    public onChangeItemsPage(event: any): any {
        this.onChangeTable(this.config);
    }

    // Tested
    public resetFilter(): any {
        this.config.filtering = { filterString: '' };
        this.onFilterChange(null);
    }

    // Define format of your data
    // Tested
    public formatDataTable(data: CTracker[]): void {
        this.data = [];
        this.showLoader = false;
        data.forEach((value: CTracker) => {
            const stacked = { 'max': 0, 'value': [] };
            let allvalues = 0;
            value.OpenPriority.forEach((stack: any) => {
                allvalues += stack.Value;
            });
            value.OpenPriority.forEach((stack: any) => {
                if (stack.Value !== 0) {
                    stacked.max = stack.Max;
                    stacked.value.push({ 'value': stack.Value, 'type': stack.Type, 'width': ((stack.Value / allvalues) * 100) });
                }
            });
            const tabletracker: TableTracker = {
                sp_id: value.sp_id,
                id: value.Id,
                // tslint:disable-next-line: max-line-length
                ViewLink: value.ViewLink + '?', // the ? is added to avoid the redirection to not found page by sharepoint by allowing the correct encoding for the redirect URL
                icon: '<img src=' + value.Icon + '></img>',
                trackerName: '<a>' + value.TrackerName + '</a>',
                openclose: '<span>' + value.Open + '</span><span> / ' + value.Close + '</span>',
                total: value.Total,
                openpriority: stacked,
                trackerId: value.TrackerId,
                open: value.Open,
                favorite: value.IsFavoriteTracker,
                IsSystemTracker: typeof value.IsSystemTracker != 'undefined' ? value.IsSystemTracker : false,
            };
            this.data.push(tabletracker);
        });
        this.dataSaved = this.data;
        this.tablegenericService.setData(this.data);
        this.tablegenericService.setDataSaved(this.data);
        this.onChangeTable(this.config);
        this.showLoader = false;
        console.log('this.datasaved', this.data);
    }

    //Tested
    public goTo(link: string): void {
        location.href = link;
    }

    //Tested
    public onCellClick(data: any) {

        if (data.column == 'trackerName') {
            location.href = data.row.ViewLink;
        }
    }

    //Tested
    public searchAdvanced() {
        if (this.disabledEdit) {
            this.redirectView('#/searchAdvancedAllTracker?showMigrated=' + this.showMigrated);
        } else {
            this.redirectView('#/searchAdvancedTracker?trackername=' + this.trackerIdSelected + '&showMigrated=' + this.showMigrated);
        }
    }

    //Tested
    public redirectView(link: string): void {
        location.hash = link;
    }

    //Service Calls
    //Tested
    public onChangeTable(config: any = this.config, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }) {
        if (typeof config != 'undefined') {
            this.tablegenericService.onChangeTable(config, page).then((response) => {
                this.rows = response['rows'];
                this.length = response['length'];
            },
            );
        }
    }

    //Tested
    public onFilterChange(data: any) {
        this.tablegenericService.onFilterChange(data).then((response) => {
            this.rows = response['rows'];
            this.length = response['length'];
        },
        );
    }

    //Tested
    getTrackersByListName(): void {
        this.showLoader = true;
        this.trackerService.getSummaryListTrackerMigrated(this.showMigrated).subscribe((listTrackers) => {
            this.trackers = listTrackers;
            this.formatDataTable(listTrackers);
        },
        );
    }

    //Tested
    public getPermissionsForTracker() {
        if (sessionStorage.getItem('MgmtPermission') != null) {
            const managmentPemrission = sessionStorage.getItem('MgmtPermission');
            const myPermission = Boolean(managmentPemrission);
            this.permissionsTracker = myPermission;
        } else {

            setTimeout(() => {
                this.permissionService.getPermissionsForTracker().subscribe((response) => {
                    this.permissionsTracker = response;
                });
            }, 1000);
        }
    }

    public submitState(value: string) {
        // this.appState.set('value', value);
    }

    public showDeletepopup() {
        this.showModelPopup = true;
    }
    public closeDeletePopup() {
        this.showModelPopup = false;
    }
}
