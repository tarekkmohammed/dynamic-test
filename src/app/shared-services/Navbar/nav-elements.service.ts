import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavElementsService {
  private configUrl="http://localhost:3000/navBar"
  constructor(private http : HttpClient) {

   }

   getElements(){
    return this.http.get(this.configUrl)
   }
}
