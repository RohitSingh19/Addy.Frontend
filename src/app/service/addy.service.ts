import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AddyResponse } from '../model/addy.response.model';


@Injectable({
  providedIn: 'root'
})
export class AddyService {

  // apiBaseUrl = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }


  getFullURL(key: string) {
      return this.http.get<AddyResponse>('https://localhost:44303/api/addy/' + key);
  }
  

  createAddyUrl(addyReq: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post<AddyResponse>('https://localhost:44303/api/addy/createUrl', {addyReq}, httpOptions);
  }
  

}
