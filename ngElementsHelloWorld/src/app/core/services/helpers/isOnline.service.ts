import { Injectable } from '@angular/core';

@Injectable()
export class IsOnlineService {
    isOnline: boolean;

    update(message: boolean) {
        this.isOnline = message;
    }

    get(): boolean {
        return this.isOnline;
    }
}