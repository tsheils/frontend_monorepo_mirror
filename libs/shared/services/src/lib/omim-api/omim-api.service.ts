import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const OMIMAPI= 'https://api.omim.org/api/entry?mimNumber=';
const FORMAT = '&format=';
const INCLUDE = '&include=';

export interface OmimParams {
  omimId: string;
  format?: string;
  fields?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class OmimApiService {
headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { }

  setHeaders(headers: HttpHeaders) {
    console.log("setting key");
    this.headers = headers;
  }

fetch(params: OmimParams): Observable<any> {
    const url = `${OMIMAPI}${params.omimId}${INCLUDE}${params.fields ? params.fields.join(',') : 'text,references'}${FORMAT}${params.format ? params.format : 'json'}`;
return this.http.get(url,{headers: this.headers});
}
}
