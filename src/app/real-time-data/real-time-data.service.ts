import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealTimeDataService {

  constructor(private http: HttpClient) { }

  getRecords(){
            return this.http.get<any[]>('http://localhost:4210/latest-atm-data');
  }
}
