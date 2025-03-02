import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  platformId = inject(PLATFORM_ID);

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    // solve this problem: the ERROR ReferenceError: localStorage is not defined
    // https://stackoverflow.com/questions/78389518/local-storage-is-not-defined-when-try-to-fire-any-http-request-in-appcomponent-i
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(key) : 'no localstorage for this browser';
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
