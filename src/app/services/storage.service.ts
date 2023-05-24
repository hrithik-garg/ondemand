import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getValueFromLocalStorage(key: string) {
    if (key === 'MRAUid') {      
      const encodedToken = localStorage.getItem(key);
      return encodedToken ? JSON.parse(atob(encodedToken)).value : null;
    }
    return JSON.parse(localStorage.getItem(key) as string);
  }


  setValueInLocalStorage(key: string, value: any) {
    if (key === 'MRAUid') {
      localStorage.setItem('MRAUid', btoa(JSON.stringify({ value })));
    }
    else{
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}