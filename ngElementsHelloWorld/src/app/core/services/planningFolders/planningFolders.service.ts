import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { BackendRequestClass } from '@app/backend.request';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpInterceptorService } from './../helpers/httpinterceptor.service';

declare var _spPageContextInfo: any;

@Injectable()
export class PlanningFolderService {

    constructor(private http: HttpInterceptorService, private backendRequestClass: BackendRequestClass) { }

    private headers = new Headers({
        Accept: "application/json;odata=verbose",
    });


    private P_headers = new Headers(
        {
            "Accept": "application/json;odata=verbose",
        },
    );

    private optionsCredentials = new RequestOptions({ headers: this.headers, withCredentials: true });

    private postCredentials = new RequestOptions({ headers: this.P_headers, withCredentials: true });

    getAllPlanningFolder(): Observable<any[]> {

        //const url = localStorage.getItem("eCollaborativePlanningFolder") + "/api/planningfolder?spUrl=" + _spPageContextInfo.webAbsoluteUrl;

        const url = this.backendRequestClass.getResultECollaborativePlanningFolder() + "/api/planningfolder?spUrl=" + _spPageContextInfo.webAbsoluteUrl;


        return this.http.get(url, this.optionsCredentials).pipe(map(function (response) {
            return response.json() as any[];
            //return cont as any[];
        }), catchError(this.handleError));
    }

    getPlanningFolderById(planningFolderId: string): Observable<any[]> {

        const url = this.backendRequestClass.getResultECollaborativePlanningFolder() + "/api/planningfoldersummary?spUrl=" + _spPageContextInfo.webAbsoluteUrl + "&FolderId=" + planningFolderId;
        return this.http.get(url, this.optionsCredentials).pipe(map(function (response) {
            return response.json() as any[];
        }), catchError(this.handleError));
    }


    pasteArtifactsInPlanning(idPlanningFolder: string, artifacts: any[]): Promise<any> {

        const url = this.backendRequestClass.getResultECollaborativePlanningFolder() + "/api/artifacts?spUrl=" + _spPageContextInfo.webAbsoluteUrl;


        let jsonObj = { planningId: idPlanningFolder, spUrl: _spPageContextInfo.webAbsoluteUrl, artifactsId: [] };

        for (let art of artifacts) {
            jsonObj.artifactsId.push(
                { id: art.id, artifactId: art.name, trackerId: art.tracker },
            );
        }

        // return Promise.resolve(true);

        return this.http.post(url, JSON.stringify(jsonObj), this.postCredentials)
            .toPromise()
            .then(function (response) {
                return response;
            })
            .catch(this.handleError);

    }


    getPlanningFolderEditUrlById(planningFolderId: string): Promise<any[]> {
        //const url = localStorage.getItem("eCollaborativePlanningFolder") + "/api/planningfolderparent?spUrl=" + _spPageContextInfo.webAbsoluteUrl + "&FolderId=" + planningFolderId;
        const url = this.backendRequestClass.getResultECollaborativePlanningFolder() + "/api/planningfolderparent?spUrl=" + _spPageContextInfo.webAbsoluteUrl + "&FolderId=" + planningFolderId;

        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json() as any[];
            })
            .catch(this.handleError);
    }

    getPlanningFolderNewUrlById(planningFolderId: string): Promise<any[]> {

        //const url = localStorage.getItem("eCollaborativePlanningFolder") + "/api/planningfolderNew?spUrl=" + _spPageContextInfo.webAbsoluteUrl + "&id=" + planningFolderId;
        const url = this.backendRequestClass.getResultECollaborativePlanningFolder() + "/api/planningfolderNew?spUrl=" + _spPageContextInfo.webAbsoluteUrl + "&id=" + planningFolderId;
        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json() as any[];
            })
            .catch(this.handleError);
    }

    pastePlanningFolder(idPlanningFolder: string, idParentPlanningFolder: string): Promise<any> {
        //const url = localStorage.getItem("eCollaborativePlanningFolder") + "/api/PlanningFolderPaste/?spUrl=" + _spPageContextInfo.webAbsoluteUrl + "&FolderId=" + idPlanningFolder + "&DestFolderId=" + idParentPlanningFolder;
        const url = this.backendRequestClass.getResultECollaborativePlanningFolder() + "/api/PlanningFolderPaste/?spUrl=" + _spPageContextInfo.webAbsoluteUrl + "&FolderId=" + idPlanningFolder + "&DestFolderId=" + idParentPlanningFolder;

        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(function (response) {
                return response.json();
            })
            .catch(this.handleError);
    }

    deletePlanningFolder(idPlanningFolder: string): Promise<boolean> {
        //const url = localStorage.getItem("eCollaborativePlanningFolder") + "/api/planningfolder?spUrl=" + _spPageContextInfo.webAbsoluteUrl + "&FolderId=" + idPlanningFolder;
        const url = this.backendRequestClass.getResultECollaborativePlanningFolder() + "/api/planningfolder?spUrl=" + _spPageContextInfo.webAbsoluteUrl + "&FolderId=" + idPlanningFolder + "&delete=true";
        //const url = "Canceled";
        return this.http.get(url, this.optionsCredentials)
            .toPromise()
            .then(
                () => {
                    return true;
                })
            .catch(
                (error) => {
                    if (error.status == 302) {
                        location.reload();
                    }
                    return false;
                });
    }

    private handleError(error: any): Promise<any> {
        if (error.status == 302) {
            location.reload();
        }
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
