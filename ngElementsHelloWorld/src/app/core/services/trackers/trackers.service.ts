import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { BackendRequestClass } from '@app/backend.request';
import { HttpInterceptorService } from '@app/core/services/helpers/httpinterceptor.service';
import { CTracker } from '@app/shared/models/tracker/ctracker';
import { Tracker } from '@app/shared/models/tracker/tracker';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

declare var _spPageContextInfo: any;

@Injectable()
export class TrackerService {
    // NE PAS METTRE * DANS LES REQUETES
    constructor(private http: HttpInterceptorService, private backendRequestClass: BackendRequestClass) {
    }

    private headers = new Headers({
        Accept: 'application/json;odata=verbose',
    });

    private options = new RequestOptions({ headers: this.headers });
    private optionsCredentials = new RequestOptions({ headers: this.headers, withCredentials: true });


    getSearchTrackerById(id: number): Promise<any> {
        // const url = typeof _spPageContextInfo != "undefined" ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + "/api/TrackerSummary?spurl=" + _spPageContextInfo.webAbsoluteUrl + "&showMigrated=" + showMigrated : "";
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/SearchRequests?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&searchId=' + id : '';

        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    private A_headers = new Headers({
        Accept: 'application/json;odata=verbose',
    });

    private A_optionsCredentials = new RequestOptions({ headers: this.A_headers, withCredentials: true });


    //SearchAdvancedByTracker

    getSearchAdvanced(listtracker: any, idTracker: any): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/SearchTracker?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&trackerName=' + idTracker : '';

        return this.http.post(url, JSON.stringify(listtracker), this.A_optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json();
            })
            .catch(this.handleError);
    }

    getSavedSearchAdvanced(trackerName: string, shared: boolean): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/SearchRequests?trackerName=' + trackerName + '&spurl=' + _spPageContextInfo.webAbsoluteUrl + '&sharedRequest=' + shared : '';

        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    setFavoriteTracker(data: any): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/TrackerSummary?tracker=' + data.row.trackerId + '&isFavoriteTracker=' + data.row.favorite + '&spurl=' + _spPageContextInfo.webAbsoluteUrl : '';

        return this.http.post(url, JSON.stringify({}), this.A_optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json();
            })
            .catch(this.handleError);
    }

    saveSearchAdvanced(listSearch: any, currentId: any): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/SearchRequests?trackerName=' + currentId + '&spurl=' + _spPageContextInfo.webAbsoluteUrl : '';

        return this.http.post(url, JSON.stringify(listSearch), this.A_optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json();
            })
            .catch(this.handleError);
    }

    getSearchTrackerForm(idTracker: any): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/SearchTracker?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&trackerName=' + idTracker : '';
        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    deleteSearchAdvanced(idSearch: string): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/SearchRequests?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&searchId=' + idSearch + '&delete=true' : '';
        return this.http.get(url, this.A_optionsCredentials)
            .toPromise()
            .then(function (response) {
                return idSearch;
            })
            .catch(this.handleError);
    }

    //SearchAllAdvanced

    getSearchAllAdvanced(listtracker: any): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/SearchAllTracker?spurl=' + _spPageContextInfo.webAbsoluteUrl : '';

        // const url = "http://dev-services-ecollaborative.capgemini.com/eCollaborative_Common_Secure_Bmo/api/SearchAllTracker?spurl=http://dev-ecollaborative.capgemini.com/sites/packageBMO_Step64/Step64";
        return this.http.post(url, JSON.stringify(listtracker), this.A_optionsCredentials)
            .toPromise()
            .then(function (response) {

                return response.json().sort((n1, n2) => {
                    if (n1 > n2) {
                        return 1;
                    }

                    if (n1 < n2) {
                        return -1;
                    }

                    return 0;
                });
            })
            .catch(this.handleError);
    }

    getSavedSearchAllAdvanced(shared: boolean): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/SearchRequests?trackerName=AllTrackers&spurl=' + _spPageContextInfo.webAbsoluteUrl + '&sharedRequest=' + shared : '';

        // const url = "http://dev-services-ecollaborative.capgemini.com/eCollaborative_Common_Secure_Bmo/api/SearchRequests?&spurl=http://dev-ecollaborative.capgemini.com/sites/packageBMO_Step64/Step64&trackerName=AllTrackers";
        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json() as any;
            })
            .catch(this.handleError);
    }


    saveSearchAllAdvanced(listSearch: any): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/SearchRequests?trackerName=AllTrackers&spurl=' + _spPageContextInfo.webAbsoluteUrl : '';

        // const url = "http://dev-services-ecollaborative.capgemini.com/eCollaborative_Common_Secure_Bmo/api/SearchRequest?spurl=http://dev-ecollaborative.capgemini.com/sites/packageBMO_Step64/Step64";
        return this.http.post(url, JSON.stringify(listSearch), this.A_optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json();
            })
            .catch(this.handleError);
    }

    getSearchAllTrackerForm(): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/SearchAllTracker?trackerName=AllTrackers&spurl=' + _spPageContextInfo.webAbsoluteUrl : '';

        // const url = "http://dev-services-ecollaborative.capgemini.com/eCollaborative_Common_Secure_Bmo/api/SearchAllTracker?spurl=http://dev-ecollaborative.capgemini.com/sites/packageBMO_Step64/Step64";

        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    /* GETALL*/
    getSummaryListTracker(): Observable<CTracker[]> {

        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/TrackerSummary?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&getall=true' : '';
        return this.http.get(url, this.optionsCredentials)
            .pipe(map(function (response) {
                return response.json() as CTracker[];
            }), catchError(this.handleError));
    }
    /* GETALL*/
    getSummaryListTrackerTest(): Observable<CTracker[]> {

        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/TrackerSummary?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&getall=true' : '';
        return this.http.get(url, this.optionsCredentials)
            .pipe(map(function (response) {
                return response.json() as CTracker[];
            }), catchError(this.handleError));
    }

    getSummaryListTrackerMigrated(showMigrated: boolean): Observable<CTracker[]> {

        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/TrackerSummary?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&showMigrated=' + showMigrated : '';
        // const url =  typeof _spPageContextInfo != "undefined" ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + "/api/planningfoldersummary?spUrl=http://dev-ecollaborative.capgemini.com/sites/adrien-dev-0610/Step63&FolderId=6": "test";

        // const url = this.backendRequestClass.getResultECollaborativeSecureApiUrl() +"/api/Blublu";
        return this.http.get(url, this.optionsCredentials)
            .pipe(map(function (response) {
                return response.json() as CTracker[];
            }), catchError(this.handleError));
    }




    getTrackerGraphByTracker(trckId: string): Promise<any> {
        // a d�finir
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/TrackerCharts?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&trackerId=' + trckId : '';

        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return JSON.parse(response['_body']);
            })
            .catch(this.handleError);
    }
    getTrackerGraphByTrackerTest(trckId: string): Observable<any> {
        // a d�finir
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/TrackerCharts?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&trackerId=' + trckId : '';

        return this.http.get(url, this.optionsCredentials)
            .pipe(map(function (response) {
                return JSON.parse(response['_body']);
            }), catchError(this.handleError));
    }

    /*GetByFilter*/

    getTrackerByFilter(order: string): Promise<Array<CTracker>> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/TrackerSummary?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&orderby=' + order + '&getall=true' : '';

        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json() as Array<CTracker>;
            })
            .catch(this.handleError);
    }


    /*A UPDATE avec getFilterTracker */
    getTrackersByListNameGroupByDate(): Promise<CTracker> {
        // const url = typeof _spPageContextInfo != "undefined" ? _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$orderby= Created desc" : "";
        // const url = typeof _spPageContextInfo != "undefined" ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + "/api/TrackerSummary?spurl=" + _spPageContextInfo.webAbsoluteUrl : "";
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/Tracker?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&orderBy=dddd&getAll=false' : '';

        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json()[0] as CTracker;
            })
            .catch(this.handleError);
    }

    /*A UPDATE avec getFilterTracker */
    // getTrackerByListName(): Promise<CTracker[]> {
    //     // const url = typeof _spPageContextInfo != "undefined" ? _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=Id,TrackerDescription,TrackerName,TrackerIcon,TrackerUnitId,TrackerId&$orderby= TrackerId asc" : "";

    //     //OrderBy TrackerId
    //     const url = typeof _spPageContextInfo != "undefined" ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + "/api/TrackerSummary?spurl=" + _spPageContextInfo.webAbsoluteUrl : "";

    //     return this.http.get(url, this.optionsCredentials)
    //         .toPromise()
    //         .then(function (response) {
    //             return response.json() as CTracker[];
    //         })
    //         .catch(this.handleError);
    // }




    /*GetTrackerById*/
    getTrackerByListIdById(trackerId: string): Observable<CTracker> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/Tracker?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&trackerId=' + trackerId : '';


        return this.http.get(url, this.optionsCredentials)
            .pipe(map(function (response) {
                return response.json() as CTracker;
            }), catchError(this.handleError));
    }
    getTrackerByListIdByIdTest(trackerId: string): Observable<CTracker> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/Tracker?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&trackerId=' + trackerId : '';


        return this.http.get(url, this.optionsCredentials)
            .pipe(map(function (response) {
                return response.json() as CTracker;
            }), catchError(this.handleError));
    }


    /*AddTracker*/
    GetIdTracker(tracker: Tracker): Promise<Tracker> {
        //const url = "http://dev-services-ecollaborative.capgemini.com/eCollaborative_Associations2/Services/GetAssociations.svc/CreateListFromtemplate?url=" + _spPageContextInfo.webAbsoluteUrl + "&comment=''&description=''&templateName=TRACKER_LIST_TEMPLATE";
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultWebService() + 'Services/GetAssociations.svc/CreateListFromtemplate?url=' + _spPageContextInfo.webAbsoluteUrl + '&comment=\'\'&description=\'\'&templateName=TRACKER_LIST_TEMPLATE' : '';

        return this.http.get(url, this.options)
            .toPromise()
            .then(function (response) {
                tracker.TrackerId = response.json();
                return tracker;
            })
            .catch(this.handleError);
    }

    AddTrackerByListName(tracker: CTracker): Observable<Tracker> {

        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/tracker?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&comment=\'\'&description=' + encodeURIComponent(tracker.Description) + '&templateName=TRACKER_LIST_TEMPLATE&listName=' + encodeURIComponent(tracker.TrackerName) + '&unitId=' + tracker.UnitId + '&icon=' + tracker.Icon + '' : '';

        return this.http.get(url, this.optionsCredentials)
            .pipe(map(function (response) {
                return response.json() as Tracker;
            }), catchError(this.handleError));
    }


    /*UpdateTracker*/
    updateTracker(tracker: CTracker): Observable<void> {

        // const url = typeof _spPageContextInfo != "undefined" ? _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TRACKER_LIST')/items('" + trackerId + "')" : "";
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/TrackerSummary?spurl=' + _spPageContextInfo.webAbsoluteUrl : '';

        return this.http.post(url, JSON.stringify(tracker), this.optionsCredentials)
            .pipe(map(function (response) {
                return response.json();
            })
                , catchError(this.handleError));
    }

    /*DeleteTracker*/
    deleteTracker(trackerId: string): Observable<void> {
        const url = typeof _spPageContextInfo != 'undefined' ? this.backendRequestClass.getResultECollaborativeSecureApiUrl() + '/api/TrackerDelete?spurl=' + _spPageContextInfo.webAbsoluteUrl + '&trackerid=' + trackerId : '';

        return this.http.get(url, this.optionsCredentials)
            .pipe(map(function (response) {

            }), catchError(this.handleError));
    }



    // DO NOT CHANGE THIS
    // GET TRACKET ID BY LIST ID GET BY SP CONTEXT
    getTrackerByListId(listId: string): Promise<any> {
        const url = typeof _spPageContextInfo != 'undefined' ? _spPageContextInfo.webAbsoluteUrl + '/_api/web/lists(\'' + listId + '\')?$select=ID,Title' : '';

        return this.http.get(url, this.options)
            .toPromise()
            .then(function (response) {
                return response.json().d as any;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        if (error.status == 302) {
            location.reload();
        }
        console.error('An error occurred', error);
        return Promise.reject(error._body || error);
    }
}
