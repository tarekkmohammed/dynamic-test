import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavElementsService {
  private configUrl="http://LocalHost:8000/api/navBar"
  constructor(private http : HttpClient) {

   }

   getElements(){
    return this.http.get(this.configUrl)
   }
}
