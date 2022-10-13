import { Injectable } from '@angular/core';

const keyStorage = "SSID"

@Injectable({
    providedIn:'root'
})
export class LocalStorageService {

    set(value: string) {
        localStorage.setItem(keyStorage, value);
    }

    get() {
        return localStorage.getItem(keyStorage);
    }

    remove() {
        localStorage.removeItem(keyStorage);
    }
}
