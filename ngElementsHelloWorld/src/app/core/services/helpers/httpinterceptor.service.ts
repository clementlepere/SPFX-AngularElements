import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackendRequestClass } from '../../../backend.request';

// import { Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
// operators
@Injectable()
export class HttpInterceptorService extends Http {

    private headers = new Headers({
        Accept: "application/json;odata=verbose",
    });
    private optionsCredentials = new RequestOptions({ headers: this.headers, withCredentials: true });

    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http,
        private backendRequestClass: BackendRequestClass,
    ) {
        super(backend, options);
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).pipe(catchError(this.handleError));
    }

    public handleError = (error: Response) => {

        if (error.status == 0 || error.status == 403 || error.status == 302) {
            const url = this.backendRequestClass.getResultECollaborativeSecureApiUrl() + "/api/signin";
            this.http.get(url, this.optionsCredentials)
                .toPromise()
                .then(data => { })
                .catch(error => {
                    window.location.href = this.backendRequestClass.getResultEcollaborativeSinginUrl() + "?goto=" + window.location;
                });
        }
        return throwError(error);
    }
}