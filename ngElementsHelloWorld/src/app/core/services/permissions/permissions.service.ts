import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';

import { HttpInterceptorService } from './../helpers/httpinterceptor.service';
import { map, catchError } from 'rxjs/operators';

declare var _spPageContextInfo: any;
declare var SP: any;
@Injectable()
export class PermissionsService {

    constructor(private http: HttpInterceptorService) { }

    private headers = new Headers({
        Accept: "application/json;odata=verbose",
    });

    private options = new RequestOptions({ headers: this.headers });

    getPermissionsByList(listName: string): Observable<Array<any>> {
        function parseBasePermissions(value) {
            let permissions = new SP.BasePermissions();
            permissions.initPropertiesFromJson(value);
            let permLevels = [];
            for (let permLevelName in SP.PermissionKind.prototype) {
                if (SP.PermissionKind.hasOwnProperty(permLevelName)) {
                    let permLevel = SP.PermissionKind.parse(permLevelName);
                    if (permissions.has(permLevel)) {
                        permLevels.push(permLevelName);
                    }
                }
            }
            return permLevels;
        }
        var user;
        if (_spPageContextInfo.systemUserKey.indexOf("signin") > -1) {
            user = _spPageContextInfo.systemUserKey;
        } else {
            user = encodeURIComponent(_spPageContextInfo.systemUserKey.split('|')[0].replace(')', '#') + '|' 
            + _spPageContextInfo.userLoginName);
        }

        const url = typeof _spPageContextInfo != "undefined" ? _spPageContextInfo.webAbsoluteUrl +
         "/_api/Web/lists/getbytitle(\'" + listName + "\')/getusereffectivepermissions(@u)?@u=\'" + user + "\'" : "";
        return this.http.get(url, this.options).pipe(
            map(function (response) {
                return parseBasePermissions(response.json()['d'].GetUserEffectivePermissions);
            }), catchError(this.handleError));
    }

    getPermissionsByListByItem(listName: string, itemId: string): Promise<Array<any>> {
        function parseBasePermissions(value) {
            let permissions = new SP.BasePermissions();
            permissions.initPropertiesFromJson(value);
            let permLevels = [];
            for (let permLevelName in SP.PermissionKind.prototype) {
                if (SP.PermissionKind.hasOwnProperty(permLevelName)) {
                    let permLevel = SP.PermissionKind.parse(permLevelName);
                    if (permissions.has(permLevel)) {
                        permLevels.push(permLevelName);
                    }
                }
            }
            return permLevels;
        }
        var user;
        if (_spPageContextInfo.systemUserKey.indexOf("signin") > -1) {
            user = _spPageContextInfo.systemUserKey;
        } else {
            user = encodeURIComponent(_spPageContextInfo.systemUserKey.split('|')[0].replace(')', '#') + '|' + _spPageContextInfo.userLoginName);
        }
        const url = typeof _spPageContextInfo != "undefined" ? _spPageContextInfo.webAbsoluteUrl + "/_api/Web/lists/getbytitle(\'" + listName + "\')/getusereffectivepermissions(@u)?@u=\'" + user + "\'" : "";
        return this.http.get(url, this.options)
            .toPromise()
            .then(function (response) {
                return parseBasePermissions(response.json()['d'].GetUserEffectivePermissions);
            })
            .catch(this.handleError);
    }

    getPermissionsForTracker(): Observable<boolean> {
        if (sessionStorage.getItem('MgmtPermission') == null) {

            const url = typeof _spPageContextInfo != "undefined" ? _spPageContextInfo.webAbsoluteUrl + "/_api/Web/effectiveBasePermissions" : "";

            return this.http.get(url, this.options).pipe(map(function (response) {
                let manageListsPerms = new SP.BasePermissions();
                manageListsPerms.initPropertiesFromJson(response.json()['d'].EffectiveBasePermissions);
                let manageLists = manageListsPerms.has(SP.PermissionKind.manageLists);
                sessionStorage.setItem('MgmtPermission', manageLists as string);
                return manageLists as boolean;
            }), catchError(this.handleError));
        }
        else {
            var managmentPemrission = sessionStorage.getItem('MgmtPermission');
            var myPermission = Boolean(managmentPemrission);
            console.log(of(myPermission));
            return of(myPermission);
            // Promise<boolean> test = new Promise       
        }
    }

    private handleError(error: any): Promise<any> {
        if (error.status == 302) {
            location.reload();
        }
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
