import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<any>(null);

  setData(data: any) {
    this.dataSubject.value(data)
  }

  getData() {
    return this.dataSubject.asObservable();
  }
}