import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { BackEndRequest } from './shared/models/backendRequest/backendRequest';

const versionNumber = 1256;
declare var _spPageContextInfo: any;
@Injectable()
export class BackendRequestClass {

    private result = '';
    private resultWebService = '';
    private resultStructureWeb = '';
    private resultECollaborativePlanningFolder = '';
    private resultECollaborativeSecureApiUrl = '';
    private resultEcollaborativeSinginUrl = '';
    private resultEcollaborativeHomePageConfig: any = { DisplayStandardContact: true };
    isOnline: boolean;
    constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

    public getResult() {
        return this.result;
    }

    public getResultWebService() {
        return this.resultWebService;
    }

    public getResultStructureWeb() {
        return this.resultStructureWeb;
    }

    public getResultECollaborativePlanningFolder() {
        return this.resultECollaborativePlanningFolder;
    }

    public getResultECollaborativeSecureApiUrl() {
        return this.resultECollaborativeSecureApiUrl;
    }
    public getResultEcollaborativeSinginUrl() {
        return this.resultEcollaborativeSinginUrl;
    }

    public getResultEcollaborativeHomePageConfig() {
        return this.resultEcollaborativeHomePageConfig;
    }
    public replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    public load() {
        //To enhance performances with by passing of property bags loading
        this.isOnline = false;
        if (this.isOnline === false) {
            // if (savedPropertyBag == null || savedPropertyBag.version != versionNumber) {
            if (sessionStorage.getItem('webServiceUrl') == null) {
                // return new Promise((resolve, reject) => {
                //     this.http.get(_spPageContextInfo.webAbsoluteUrl 
                //         + '/_api/web/allProperties?$select=eCollaborativeApiURL,webservice,structureWeb,eCollaborativePlanningFolder,eCollaborativeSecureApiURL,eCollaborativeSigninURL,eCollaborativeHomePageConfig')
                //         .pipe(catchError(error => {
                //             reject(false);
                //             return observableThrowError(error.json().error || 'Server error');
                //         }))
                //         .subscribe((callResult) => {
                //             const storagePropertyBag: BackEndRequest = {
                //                 version: versionNumber,
                //                 result: callResult['eCollaborativeApiURL'],
                //                 resultWebService: callResult['webservice'],
                //                 resultStructureWeb: callResult['structureWeb'],
                //                 resultECollaborativePlanningFolder: callResult['eCollaborativePlanningFolder'],
                //                 resultECollaborativeSecureApiUrl: callResult['eCollaborativeSecureApiURL'],
                //                 resultEcollaborativeSinginUrl: callResult['eCollaborativeSigninURL'],
                //                 resulteCollaborativeHomePageConfig: this.replaceAll(callResult['eCollaborativeHomePageConfig'], '\'', '"'),
                //             };
                //             this.localStorageService.set('savedPropertyBag', storagePropertyBag);

                //             this.result = callResult['eCollaborativeApiURL'];
                //             this.resultWebService = callResult['webservice'];
                //             this.resultStructureWeb = callResult['structureWeb'];
                //             this.resultECollaborativePlanningFolder = callResult['eCollaborativePlanningFolder'];
                //             this.resultECollaborativeSecureApiUrl = callResult['eCollaborativeSecureApiURL'];
                //             // console.log('before eCollaborativeSigninURL');
                //             this.resultEcollaborativeSinginUrl = callResult['eCollaborativeSigninURL'];
                //             this.resultEcollaborativeHomePageConfig = JSON.parse(this.replaceAll(callResult['eCollaborativeHomePageConfig'], '\'', '"'));
                //             resolve(true);
                //         });
                // });
            } else {
                this.result = sessionStorage.getItem('eCollaborativeApiURL');
                this.resultWebService = sessionStorage.getItem('webservice');
                this.resultStructureWeb = sessionStorage.getItem('structureWeb');
                this.resultECollaborativePlanningFolder = sessionStorage.getItem('webSecureUrl');
                this.resultECollaborativeSecureApiUrl = sessionStorage.getItem('webSecureUrl');

                this.resultEcollaborativeSinginUrl = sessionStorage.getItem('eCollaborativeSigninURL');
                this.resultEcollaborativeHomePageConfig = JSON.parse(this.replaceAll(sessionStorage.getItem('eCollaborativeHomePageConfig'), '\'', '"'));
            }
        }
    }

}
