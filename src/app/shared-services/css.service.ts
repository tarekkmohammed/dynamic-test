import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CssService {
  private configUrl="http://localhost:3000/CssClasses"
  constructor(private http : HttpClient) {

   }

   getCss(id:number){
    const url = `${this.configUrl}/${id}`
    return this.http.get(url)
   }
}
