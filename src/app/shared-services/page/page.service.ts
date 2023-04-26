import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private configUrl="http://localhost:3000/page"
  constructor(private http : HttpClient) {

   }

   getPages(){
    return this.http.get(this.configUrl)
   }
}
