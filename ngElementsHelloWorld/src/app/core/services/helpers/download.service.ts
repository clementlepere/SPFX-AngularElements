import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import { Observable } from 'rxjs';


@Injectable()
export class DownloadService {
    // NE PAS METTRE * DANS LES REQUETES
    constructor() {
    }

public downloadFiles(zipName: string, filesURLToDownload: string[]): Observable<any>  {

   return  Observable.create(observer => {
        let zip = new JSZip();
        //promises array is used to store all the promises before using them for zip generation
        let promises: Promise<any>[]  = [];

        filesURLToDownload.forEach((attachment) => {

                let promise: Promise<any>  = this.urlToPromise(attachment).then(function(data) {
                        zip.file(attachment.split('/').pop(), data, {binary: true});

                    });
                promises.push(promise);

        });

       Promise.all(promises).then(data => {
            zip.generateAsync({type: 'blob'})
                        .then(function(blob) {
                            saveAs(blob, zipName);
                            observer.next('OK');
                            observer.complete();

                });
        });
         observer.next('Downloading ... ');
     });

 }

 public urlToPromise(url): Promise<any> {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });

 }





}