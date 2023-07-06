import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteIdentityService {
  private configUrl="http://localhost:3000/Site_identity"

  constructor(private http : HttpClient) { 

  }

  getSiteIdentityById(id:number):Observable<any>{
    const url = `${this.configUrl}/${id}`;
    return this.http.get<any>(url);
  }

}
