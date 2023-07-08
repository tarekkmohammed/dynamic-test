import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PageService {
  private configUrl="http://localhost:3000/page"

  private url = "http://LocalHost:8000/api/"
  constructor(private http : HttpClient) {

   }
   getPageById(id: number): Observable<any> {
    const url = `${this.configUrl}/${id}`;
    return this.http.get<any>(url);
  }


   getPages(){
    return this.http.get(this.configUrl)
   }
}
