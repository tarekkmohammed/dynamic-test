import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private configUrl="http://LocalHost:8000/api/display"
  constructor(private http : HttpClient) {

   }
   getDisplayById(id: number): Observable<any> {
    const url = `${this.configUrl}/${id}`;
    return this.http.get<any>(url);
  }

   getDisplays(){
    return this.http.get(this.configUrl)
   }
}
