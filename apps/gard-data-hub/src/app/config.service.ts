import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _configData: any;

  constructor(private http: HttpClient) { }

  // This is the method you want to call at bootstrap
  // Important: It should return a Promise
  load(): Promise<any> {
    this._configData = null;
    const configFilePath = `/assets/config.json`;
    return this.http
      .get(configFilePath)
      .toPromise()
      .then((config) => {
        this._configData = config;
      })
      .catch((err: any) => Promise.resolve());
  }

  get config() {
    return this._configData;
  }

  set config(configData) {
    this._configData = configData;
  }
}
