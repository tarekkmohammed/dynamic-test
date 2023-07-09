import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteIdentityService {
  
  private url = "http://LocalHost:8000/api/siteIdentity/latest"

  constructor(private http : HttpClient) {

  }


  getSiteIdentity(){
    return this.http.get(this.url)
  }


}
