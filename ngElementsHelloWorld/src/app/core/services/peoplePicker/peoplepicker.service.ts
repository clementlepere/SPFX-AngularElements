import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { HttpInterceptorService } from '@app/core/services/helpers/httpinterceptor.service';

declare var _spPageContextInfo: any;

declare var SPClientPeoplePicker_InitStandaloneControlWrapper: any;
declare var SP: any;
declare var ExecuteOrDelayUntilScriptLoaded: any;
declare var SPClientPeoplePicker: any;
declare var $: any;

let listAlreadyLoad: any = [];
@Injectable()
export class PeoplePickerService {

    constructor(private http: HttpInterceptorService) { }

    private headers = new Headers({
        Accept: "application/json;odata=verbose",
    });
    private options = new RequestOptions({ headers: this.headers });

    getAllPeoplePicker(): Promise<any[]> {
        const url = _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/ListData.svc/UserInformationList";
        return this.http.get(url, this.options)
            .toPromise()
            .then(function (response) {
                return response.json().d.results as any[];
            })
            .catch(this.handleError);
    }

    getGroupPeoplePicker(): Promise<any[]> {
        const url = _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/ListData.svc/UserInformationList?$select=Id,Name&$filter=ContentType ne 'Person'&$orderby= Name asc";
        return this.http.get(url, this.options)
            .toPromise()
            .then(function (response) {
                return response.json().d.results as any[];
            })
            .catch(this.handleError);
    }

    getOnlyPersonPeoplePicker(): Promise<any[]> {
        const url = _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/ListData.svc/UserInformationList?$select=Id,Name&$filter=ContentType ne 'Group'&$orderby= Name asc";
        return this.http.get(url, this.options)
            .toPromise()
            .then(function (response) {
                return response.json().d.results as any[];
            })
            .catch(this.handleError);
    }

    initializePeoplePicker(listPeoplePickerElementId, options): void {
        ExecuteOrDelayUntilScriptLoaded(() => {
            SP.SOD.registerSod('sp.js', '/_layouts/sp.js');

            // Call this method to initialize the people picker
            // Create a schema to store picker properties, and set the properties.
            let schema = {};
            if (options == null) {
                schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
                schema['SearchPrincipalSource'] = 15;
                schema['ResolvePrincipalSource'] = 15;
                schema['AllowMultipleValues'] = true;
                schema['MaximumEntitySuggestions'] = 50;
                schema['Width'] = '280px';
            } else {
                schema = options;
            }

            // Get the SharePoint context
            let i = 0;                     //  set your counter to 1
            let l = listPeoplePickerElementId.length;
            function myLoop() {
                setTimeout(() => {
                    SPClientPeoplePicker_InitStandaloneControlWrapper(listPeoplePickerElementId[i].id, null, schema);
                    // var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[listPeoplePickerElementId[i] + '_TopSpan'];
                    setTimeout(() => {
                        if (listAlreadyLoad.indexOf(listPeoplePickerElementId[i].id) == -1 && typeof listPeoplePickerElementId[i] != "undefined") {
                            listAlreadyLoad.push(listPeoplePickerElementId[i].id);
                            let li = typeof listPeoplePickerElementId.filter(ppl => ppl.id == listPeoplePickerElementId[i].id) != "undefined"
                                && typeof listPeoplePickerElementId.filter(ppl => ppl.id == listPeoplePickerElementId[i].id)[0] != "undefined"
                                && typeof listPeoplePickerElementId.filter(ppl => ppl.id == listPeoplePickerElementId[i].id)[0].itemDefault != "undefined" ? listPeoplePickerElementId.filter(ppl => ppl.id == listPeoplePickerElementId[i].id)[0].itemDefault[0].length : 0;
                            for (let j = 0; j < li; j++) {
                                add(listPeoplePickerElementId[i].id, listPeoplePickerElementId.filter(ppl => ppl.id == listPeoplePickerElementId[i].id)[0].itemDefault[0][j]);
                            }
                        }
                        i++;
                        if (i < l) {
                            myLoop();
                        }
                    }, 1000);
                }, 500);
            }
            function add(peoplepickerId, defaultValue) {
                let peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplepickerId + '_TopSpan'];
                if (typeof defaultValue != "undefined") {
                    let usrObj = { 'Key': defaultValue.Value };
                    peoplePicker.AddUnresolvedUser(usrObj, true);
                }

            }
            myLoop();
            // });

        }, "sp.js");


    }

    public add() {

    }

    // public getUser(context, web, defaultValues): Promise<any> {
    //     let userList = [];
    //     for(let i = 0, l = defaultValues.length; i < l; i++){
    //     var peopleManager = new SP.UserProfiles.PeopleManager(context);
    //     let user = peopleManager.getPropertiesFor(targetUser);
    //     // personProperties = peopleManager.getPropertiesFor(targetUser);
    //     context.load(user);
    //     context.executeQueryAsync(
    //         () => {
    //             let object = {
    //                 "AutoFillDisplayText": user.get_title(),
    //                 "AutoFillKey": user.get_loginName(),
    //                 "Description": user.get_email(),
    //                 "DisplayText": user.get_title(),
    //                 "EntityType": "User",
    //                 "IsResolved": true,
    //                 "Key": user.get_loginName(),
    //                 "Resolved": true
    //             }
    //             userList.push(object);
    //             // return Promise.resolve(user);
    //         }),
    //         () => {
    //             return Promise.reject("Error to initialize peoplepicker ");
    //         };
    //     }
    //     return Promise.resolve(userList);
    // }


    cleaningAllPPL() {
        let lppl = $(".sp-peoplepicker-topLevel").length;
        for (let i = 0; i < lppl; i++) {
            let ppobject = SPClientPeoplePicker.SPClientPeoplePickerDict[$(".sp-peoplepicker-topLevel")[i]["id"]];
            let usersobject = ppobject.GetAllUserInfo();
            usersobject.forEach(function (index) {
                ppobject.DeleteProcessedUser(usersobject[index]);
            });
        }
    }

    destroyLoadList() {
        listAlreadyLoad = [];
    }

    private handleError(error: any): Promise<any> {
        if (error.status == 302) {
            location.reload();
        }
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
