import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IsOnlineService } from '@app/core/services/helpers/isOnline.service';
import { PeoplePickerService } from '@app/core/services/peoplePicker/peoplepicker.service';

@Component({
    selector: 'shared-table-generic',
    templateUrl: './shared-table-generic.component.html',
    styleUrls: ['./shared-table-generic.component.css'],
    providers: [
        PeoplePickerService,
    ],
})
export class SharedTableGenericComponent implements OnInit {

    public edit = false;

    private value: any = {};
    private _disabledV = '0';
    private disabled = false;
    private rowsFiltered: Array<any> = [];
    private filters: any = {};
    public showGroupBy = false;
    private keyArrayGroup: Array<any> = [];
    private arrayLineSelected: Array<any> = [];
    private listPeoplePicker: Array<any> = [];
    private listGroupPeoplePicker: Array<any> = [];
    private selectAllBoolean = true;

    public constructor(
        private sanitizer: DomSanitizer,
        public peoplePickerService: PeoplePickerService,
        private isOnlineService: IsOnlineService,
    ) { }

    public ngOnInit() {
        // TODO: use init
        console.log('table generic init');
        if (this.isOnlineService.get() === true) {
            this.getAllPeoplePicker();
            this.getGroupPeoplePicker();
        } else {
            const listPeoplePicker = [
                { id: 1,  text: 'Rudra Raju, Mani' },
                { id: 9,  text: 'Style Resource Readers' },
                { id: 14, text: 'Quick Deploy Users' },
                { id: 15, text: 'NT AUTHORITY\authenticated users' },
                { id: 16, text: 'Everyone' },
                { id: 16, text: 'Everyone' },
                { id: 17, text: 'SVC-COR-ECOPSRUSER' },
                { id: 19, text: 'RecentItems' },
                { id: 20, text: 'TrackerForm Management' },
                { id: 21, text: 'TrackerForm Engagement Site Administrators' },
                { id: 22, text: 'TrackerForm Members' },
                { id: 23, text: 'TrackerForm Reader' },
                { id: 24, text: 'TrackerForm Team' },
                { id: 25, text: 'TrackerForm Customer' },
                { id: 26, text: 'TrackerForm Contract' },
                { id: 27, text: 'TrackerForm Cysip' },
                { id: 28, text: 'TrackerForm Partner' },
                { id: 29, text: 'CORP, ECOINSrPool' },
                { id: 30, text: 'IN, auth-ema.int' },
                { id: 31, text: 'SVC-COR-ECOPSRREDR' },
                { id: 32, text: 'J, Suchithra' },
                { id: 33, text: 'LEPERE, Clément' },
            ];
            listPeoplePicker.forEach((value: any) => {
                this.listPeoplePicker.push({ 'id': value.Id, 'text': value.Name });
            });
            const listGroupPeoplePicker = [
                { id: 16, text: 'Everyone' },
                { id: 15, text: 'NT AUTHORITY\authenticated users' },
                { id: 14, text: 'Quick Deploy Users' },
                { id: 19, text: 'RecentItems' },
                { id: 9,  text: 'Style Resource Readers' },
                { id: 26, text: 'TrackerForm Contract' },
                { id: 25, text: 'TrackerForm Customer' },
                { id: 27, text: 'TrackerForm Cysip' },
                { id: 21, text: 'TrackerForm Engagement Site Administrators' },
                { id: 20, text: 'TrackerForm Management' },
                { id: 22, text: 'TrackerForm Members' },
                { id: 28, text: 'TrackerForm Partner' },
                { id: 23, text: 'TrackerForm Reader' },
                { id: 24, text: 'TrackerForm Team' },
            ];
            listGroupPeoplePicker.forEach((value: any) => {
                this.listGroupPeoplePicker.push({ 'id': value.Id, 'text': value.Name });
            });
        }
        console.log('rows', this.rows);
        console.log('columns', this.columns);
        console.log('filters', this.filters);
        console.log('config', this.config);
    }

    private get disabledV(): string {
        return this._disabledV;
    }

    private set disabledV(value: string) {
        this._disabledV = value;
        this.disabled = this._disabledV === '1';
    }

    public selectedInput(value: any, column: string): void {
        this.filters[column] = value.target.value;
        this.applyFilter();
    }

    public selected(value: any, column: string, type: string): void {
        this.filters[column] = value.text;
        this.applyFilter();
    }

    public selectedMulti(value: any, column: string): void {
        if (typeof this.filters[column] == 'undefined') {
            this.filters[column] = [];
        }
        this.filters[column].push(value.text);
        this.applyFilter();
    }

    public removedMulti(value: any, column: string): void {
        const indexSplice = this.filters[column].indexOf(value.text);
        this.filters[column].splice(indexSplice, 1);
        this.applyFilter();
    }

    public applyFilter(): void {

        this.filterChanged.emit({ filters: this.filters });
    }

    public removed(value: any, column: string): void {
        this.filters[column] = '';
        this.applyFilter();

    }

    public typed(value: any): void {
    }

    public refreshValue(value: any): void {
        this.value = value;
    }


    //EditSelect
    public selectedEdit(value: any, propertyName: string, row: any): void {
        this.rows.filter(ro => ro.id == row.id)[0][propertyName].value = { 'id': value.id, 'text': value.text };
    }

    public removedEdit(value: any, propertyName: string, row: any): void {
        this.rows.filter(ro => ro.id == row.id)[0][propertyName].value = '';
    }

    public typedEdit(value: any): void {
    }

    public refreshValueEdit(value: any): void {
        this.value = value;
    }

    //EditSelectMulti
    public selectedEditMulti(value: any, propertyName: string, row: any): void {
        if (typeof this.rows.filter(ro => ro.id == row.id)[0][propertyName].value == 'undefined' || this.rows.filter(ro => ro.id == row.id)[0][propertyName].value == '') {
            this.rows.filter(ro => ro.id == row.id)[0][propertyName].value = [];
        }
        this.rows.filter(ro => ro.id == row.id)[0][propertyName].value.push({ 'id': value.id, 'text': value.text });
    }

    public removedEditMulti(value: any, propertyName: string, row: any): void {
        let indexSplice = -1;
        const listValue = [];
        for (let i = 0; i < this.rows.filter(ro => ro.id == row.id)[0][propertyName].value.length; i++) {
            listValue.push(this.rows.filter(ro => ro.id == row.id)[0][propertyName].value[i].text);
        }
        indexSplice = listValue.indexOf(value.text);

        if (indexSplice != -1) {
            this.rows.filter(ro => ro.id == row.id)[0][propertyName].value.splice(indexSplice, 1);
        }
    }

    public typedEditMulti(value: any): void {
    }

    private _editTable(): void {
        this.edit = !this.edit;
    }
    private _cancelTable(): void {
        this.edit = !this.edit;
    }
    private _saveTable(): void {
        this.edit = !this.edit;
    }

    public refreshValueEditMulti(value: any): void {
        this.value = value;
    }

    // Table values
    @Input() public rows: Array<any> = [];

    @Input()
    public showLoader = false;

    // Table values
    public _data: Array<any> = [];

    @Input()
    public set data(data: any) {
        console.log('input data val', data);

        let error = false;
        if (typeof this.arrayLineSelected.length == 'undefined') {
            this.arrayLineSelected = [];
        }
        if (typeof data != 'undefined') {

            this._data = data;
            this.columns.forEach((value: any) => {
                value.arraySelected = [];
                this._data.forEach((valueRow: any) => {
                    //Error checking
                    if (valueRow[value.name] == '' && value.required) {
                        error = true;
                    }

                    if (this._data.filter(item => item.label == valueRow[value.name]).length > 1 && value.unique) {
                        console.error('error : the field must be unique');
                        error = true;
                    }

                    if (value.arraySelected.indexOf(valueRow[value.name]) == -1) {
                        value.arraySelected.push(valueRow[value.name]);
                    }

                    if ((typeof this._config.groupBy != 'undefined' || this._config.groupBy != null) && value.name == this._config.groupBy) {
                        this.keyArrayGroup.push(valueRow[value.name]);
                    }

                });
            });
            this.error.emit({ error });
        }
    }

    public _filters: Array<any> = [];

    @Input()
    public set filtersInput(filters: any) {
        this._filters = filters;
    }

    @Input()
    public set selectedArray(selected: any) {
        if (selected != null && selected.length != 0) {
            this.arrayLineSelected = selected;
        }
    }

    @Input()
    public set config(conf: any) {
        if (!conf.className) {
            conf.className = 'table-striped table-bordered';
        }
        if (conf.className instanceof Array) {
            conf.className = conf.className.join(' ');
        }
        this._config = conf;
    }

    // Outputs (Events)
    @Output() public tableChanged: EventEmitter<any> = new EventEmitter();
    @Output() public cellClicked: EventEmitter<any> = new EventEmitter();
    @Output() public favoriteEdited: EventEmitter<any> = new EventEmitter();
    @Output() public rowClicked: EventEmitter<any> = new EventEmitter();
    @Output() public filterChanged: EventEmitter<any> = new EventEmitter();
    @Output() public error: EventEmitter<any> = new EventEmitter();

    public showFilterRow: Boolean = false;

    @Input()
    public set columns(values: Array<any>) {
        console.log('columns', this.columns);

        this.rowsFiltered = this._data;
        if (typeof this._config.groupBy != 'undefined' || this._config.groupBy != null) {
            this.showGroupBy = true;
        }
        values.forEach((value: any) => {
            value.arraySelected = [];
            this._data.forEach((valueRow: any) => {
                if (value.arraySelected.indexOf(valueRow[value.name]) == -1) {
                    value.arraySelected.push(valueRow[value.name]);
                }

                if ((typeof this._config.groupBy != 'undefined' || this._config.groupBy != null) && value.name == this._config.groupBy) {
                    this.keyArrayGroup.push(valueRow[value.name]);
                }

            });

            if (value.filtering) {
                this.showFilterRow = true;
            }
            if (value.className && value.className instanceof Array) {
                value.className = value.className.join(' ');
            }
            const column = this._columns.find((col: any) => col.name === value.name);
            if (column) {
                Object.assign(column, value);
            }
            if (!column) {
                this._columns.push(value);
            }
        });
    }

    private _columns: Array<any> = [];
    private _config: any = {};


    public getErrorClass(column: any, row: any): string {
        let error = '';
        //Error checking
        if (row[column.name] == '' && column.required) {
            error = 'danger';
        }

        if (this._data.filter(item => item.label == row[column.name]).length > 1 && column.unique) {
            console.error('error : the field must be unique');
            error = 'danger';
        }
        return error;
    }


    public sanitize(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    public get columns(): Array<any> {
        return this._columns;
    }

    public get config(): any {
        return this._config;
    }

    public get configColumns(): any {
        const sortColumns: Array<any> = [];

        this.columns.forEach((column: any) => {
            if (column.sort) {
                sortColumns.push(column);
            }
        });

        return { columns: sortColumns };
    }

    public onChangeTable(column: any): void {
        this._columns.forEach((col: any) => {
            if (col.name !== column.name && col.sort !== false) {
                col.sort = '';
            }
        });
        this.tableChanged.emit({ sorting: this.configColumns });
        this.filterChanged.emit({ filters: this.filters });
    }
    public getRowspan(row: any, propertyName: string): number {

        const valueData = propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
        let value = 1;
        if (propertyName == this._config.groupBy) {
            value = this.rows.filter(dt => dt[propertyName] == valueData).length;
        }
        return value;
    }
    public getRowspanDisplay(previousrow: any, row: any, propertyName: string, index: number): string {

        const valueData = propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
        let value = 'table-cell';
        if (propertyName == this._config.groupBy && typeof previousrow != 'undefined' && previousrow != null) {
            const valueDataPrevious = propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], previousrow);
            if (valueDataPrevious == valueData) {
                value = 'none';
            }
        }
        return value;
    }
    public getData(row: any, propertyName: string): string {
        const value = propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
        if (typeof value.parent != 'undefined' && typeof value.value != 'undefined') {
            return '<div>' + value.parent + '</div>' +
                '<div><i class="glyphicon glyphicon-arrow-right"></i>  ' + value.value + '</div>';

        } else {
            return value;
        }
    }

    public getClassA(row: any, columnName: string): string {
        let className = '';

        if (typeof row['className'] != 'undefined' && columnName == 'kanbanName') {
            className = row['className'];
        }

        return className;
    }

    public cellClick(row: any, column: any): void {
        this.cellClicked.emit({ row, column });
    }

    public selectAll(): void {
        if (!(this._config.oneselect)) {
            const _arrayLineSelected = [];
            if (!this.selectAllBoolean) {
                this.arrayLineSelected = [];
            }
            if (this.selectAllBoolean) {
                for (let i = 0; i < this._data.length; i++) {
                    this.arrayLineSelected.push(this._data[i]);
                }
                for (let i = 0; i < this._data.length; i++) {
                    _arrayLineSelected.push(this._data[i]);
                }
            }
            this.selectAllBoolean = !this.selectAllBoolean;
            this.rowClicked.emit({ _arrayLineSelected });
        }
    }

    public onSetFavorite(row: any) {
        row.favorite = !row.favorite;
        this.favoriteEdited.emit({ row });
    }

    public rowClick(row: any): void {
        if (!(this._config.oneselect)) {
            const indexRow = this.arrayLineSelected.indexOf(row);
            if (indexRow == -1) {
                this.arrayLineSelected.push(row);
            } else {
                this.arrayLineSelected.splice(indexRow, 1);
            }
            this.arrayLineSelected = this.arrayLineSelected.filter(als => this._data.indexOf(als) != -1);
            const _arrayLineSelected = this.arrayLineSelected;
            this.rowClicked.emit({ _arrayLineSelected });
        } else {
            const indexRow = this.arrayLineSelected.indexOf(row);
            this.arrayLineSelected = [];

            if (indexRow == -1) {

                this.arrayLineSelected.push(row);
            }

            //this.arrayLineSelected = this.arrayLineSelected.filter(als => this._data.indexOf(als) != -1);
            const _arrayLineSelected = this.arrayLineSelected;
            this.rowClicked.emit({ _arrayLineSelected });
        }
    }

    //Method Rest API Call
    getAllPeoplePicker(): void {
        this.peoplePickerService.getAllPeoplePicker().then((listPeoplePicker) => {
            listPeoplePicker.forEach((value: any) => {
                this.listPeoplePicker.push({ 'id': value.Id, 'text': value.Name });
            });
        });
    }

    getGroupPeoplePicker(): void {
        this.peoplePickerService.getGroupPeoplePicker().then((listGroupPeoplePicker) => {
            listGroupPeoplePicker.forEach((value: any) => {
                this.listGroupPeoplePicker.push({ 'id': value.Id, 'text': value.Name });
            });
        });
    }
}
