import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PageTreeService {
  private configUrl="http://LocalHost:8000/api/pages/tree"
  constructor(private http : HttpClient) {

   }
   getPageTreeById(id: number): Observable<any> {
    const url = `${this.configUrl}/${id}`;
    return this.http.get<any>(url);
  }

   getPagesTree(){
    return this.http.get(this.configUrl)
   }

   /**
 * Returns an Observable that emits an array of children IDs for a given page ID.
 *
 * @param id The ID of the page to get the children IDs for.
 * @returns An Observable that emits an array of children IDs.
 */
   getPageChildren(id: number): Observable<number[]> {
    let idsOfChildren: Subject<number[]> = new Subject<number[]>();
    this.getPageTreeById(id).subscribe(page => {
    let childrenIds = [];
    console.log(page.children)
    for (let child of page.children) {
      childrenIds.push(child.id)
    }
    idsOfChildren.next(childrenIds);
    });
    return idsOfChildren.asObservable();
   }
   
}
