import { Injectable } from '@angular/core';

@Injectable()
export class IsOnlineService {
    isOnline: any;

    update(message: boolean) {
        this.isOnline = message;
    }

    get(): boolean {
        switch (this.isOnline) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }
}