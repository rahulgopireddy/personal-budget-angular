import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApidataService {
  private budgetDataSubject = new BehaviorSubject<any>(null);
  public data$ = this.budgetDataSubject.asObservable();
  constructor(private http: HttpClient) {}
  getBudgetData() {
    this.http.get('http://localhost:3000/budget').subscribe((data) => {
      console.log(data);
      this.budgetDataSubject.next(data);
    });
  }
}
