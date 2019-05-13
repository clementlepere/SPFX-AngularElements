import { Injectable } from '@angular/core';

@Injectable()
export class TableGenericService {


    columns: Array<any> = [];
    public rows: Array<any> = [];
    public page: number = 1;
    public itemsPerPage: number = 30;
    public length: number = 0;
    public filters: any;
    public config: any;

    public data: any;
    public dataSaved: any;

    constructor() { }


    public configureTable(columns: Array<any>, config: Array<any>): void {
        this.columns = columns;
        this.config = config;
    }

    public setData(data: any) {
        this.data = data;
    }

    public setDataSaved(data: any) {
        this.dataSaved = data;
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): Promise<any> {
        if (typeof config != "undefined" && typeof this.config != "undefined") {
            if (config.filtering) {
                Object.assign(this.config.filtering, config.filtering);
            }

            if (config.sorting) {
                Object.assign(this.config.sorting, config.sorting);
            }

            let filteredData = this.changeFilter(this.data, this.config);
            let sortedData = this.changeSort(filteredData, this.config);
            this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
            this.length = sortedData == null ? 0 : sortedData.length;
            return Promise.resolve(
                {
                    "rows": this.rows,
                    "length": this.length,
                },
            );
        } else {
            return Promise.resolve(
                {
                    "rows": this.rows,
                    "length": this.length,
                },
            );
        }
    }

    public changeFilter(data: any, config: any): any {
        let filteredData: Array<any> = data;
        if (typeof config != "undefined" && data != null && typeof data != "undefined" && data != []) {
            this.columns.forEach((column: any) => {
                if (typeof column != "undefined" && column.filtering && column.filtering != "undefined" && typeof column.filtering.filterString != "undefined") {
                    filteredData = filteredData.filter((item: any) => {
                        if (typeof item[column.name] != "undefined") {
                            return item[column.name].toString().replace(/<[^>]*>?/g, '').toUpperCase().match(column.filtering.filterString.toString().replace(/<[^>]*>?/g, '').toUpperCase());
                        }
                    });
                }
            });

            if (!config.filtering) {
                return filteredData;
            }

            if (config.filtering.columnName) {
                return filteredData.filter((item: any) =>
                    item[config.filtering.columnName].toString().replace(/<[^>]*>?/g, '').toUpperCase().match(this.config.filtering.filterString.toString().replace(/<[^>]*>?/g, '').toUpperCase()));
            }

            let tempArray: Array<any> = [];
            filteredData.forEach((item: any) => {
                let flag = false;
                this.columns.forEach((column: any) => {
                    if (item[column.name].toString().replace(/<[^>]*>?/g, '').toUpperCase().match(this.config.filtering.filterString.toString().replace(/<[^>]*>?/g, '').toUpperCase())) {
                        flag = true;
                    }
                });
                if (flag) {
                    tempArray.push(item);
                }
            });
            filteredData = tempArray;
        } else {
            filteredData = [];
        }
        return filteredData;
    }


    public changeSort(data: any, config: any): any {


        if (typeof config != "undefined" && (typeof config.groupBy != "undefined" || config.groupBy != null)) {
            let sortGroupBy = "asc";
            return data.sort((previous: any, current: any) => {
                if (previous[config.groupBy].toString().replace(/<[^>]*>?/g, '').toUpperCase() > current[config.groupBy].toString().replace(/<[^>]*>?/g, '').toUpperCase()) {
                    return sortGroupBy === 'desc' ? -1 : 1;
                } else if (previous[config.groupBy].toString().replace(/<[^>]*>?/g, '').toUpperCase() < current[config.groupBy].toString().replace(/<[^>]*>?/g, '').toUpperCase()) {
                    return sortGroupBy === 'asc' ? -1 : 1;
                }
            });
        }

        if (typeof config == "undefined" || !config.sorting) {
            return data;
        }
        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false && typeof columns[i].sort != "undefined") {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName || typeof columnName == "undefined" || typeof sort == "undefined") {
            return data;
        }

        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName].toString().replace(/<[^>]*>?/g, '').toUpperCase() > current[columnName].toString().replace(/<[^>]*>?/g, '').toUpperCase()) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName].toString().replace(/<[^>]*>?/g, '').toUpperCase() < current[columnName].toString().replace(/<[^>]*>?/g, '').toUpperCase()) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changePage(page: any, data: Array<any> = this.data): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    public onFilterChange(data: any): Promise<any> {
        let page: any = { page: this.page, itemsPerPage: this.itemsPerPage };
        if (data == null) {
            this.filters = {};
        } else {
            this.filters = data.filters;
        }
        this.data = this.dataSaved;
        if (data != null) {
            for (let namefilters of Object.keys(this.filters)) {
                if (this.filters[namefilters] != "" && !(this.filters[namefilters] instanceof Array)) {
                    this.data = this.data.filter(it => it[namefilters].indexOf(this.filters[namefilters]) >= 0);
                }
                if (this.filters[namefilters] != null && this.filters[namefilters] instanceof Array && this.filters[namefilters].length != 0) {
                    this.data = this.data.filter(it => this.filters[namefilters].indexOf(it[namefilters]) >= 0);
                }

            }
        }
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        if (typeof this.config != "undefined")
            this.rows = page && this.config.paging ? this.changePage(page, sortedData) : sortedData;
        else
            this.rows = sortedData;
        this.length = sortedData == null ? 0 : sortedData.length;

        return Promise.resolve(
            {
                "rows": this.rows,
                "length": this.length,
            },
        );
    }
}
