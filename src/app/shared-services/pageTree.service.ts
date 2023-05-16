import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PageTreeService {
  private configUrl="http://localhost:3000/Pagetree"
  constructor(private http : HttpClient) {

   }
   getPageTreeById(id: number): Observable<any> {
    const url = `${this.configUrl}/${id}`;
    return this.http.get<any>(url);
  }

   getPagesTree(){
    return this.http.get(this.configUrl)
   }

   getPageChildren(id: number) {
        let idsOfChildren: number[] = [];
        this.getPageTreeById(id).subscribe(page => {
            for (let child of page.children) {
                idsOfChildren.push(child.id)
            }
        });
        return idsOfChildren;
        
    }
}
