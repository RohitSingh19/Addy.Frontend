import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AddyResponse } from '../model/addy.response.model';
import { RestrictedDomains } from '../shared/RestrictedDomains';

@Injectable({
  providedIn: 'root'
})
export class AddyService {

  apiBaseUrl = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }


  getFullURL(key: string) {
      return this.http.get<AddyResponse>(this.apiBaseUrl + key);
  }

  createAddyUrl(addyReq: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post<AddyResponse>(`${this.apiBaseUrl}createUrl`,{addyReq}, httpOptions);
  }
  
  saveQRCodeAsImage(element: any) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = 'ADDYY_QR_CODE.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
      xhr.open('GET', element); // This is to download the canvas Image
      xhr.send();
  }

  IsThisRestrictedDomain(domain: string) {
    const restrictedDomains = new RestrictedDomains();
    return restrictedDomains.domains.includes(domain);
  }

  IsValidUrl(inputUrl: string): boolean {
    let url;
    try
    {
      url = new URL(inputUrl);
    }
    catch(_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  
}
