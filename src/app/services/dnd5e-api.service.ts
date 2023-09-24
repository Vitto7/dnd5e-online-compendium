import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Dnd5eApiService {
  private URL = 'https://www.dnd5eapi.co/api';

  constructor(private http: HttpClient) {}

  public getSpells = (filters: string): Observable<any> => {
    return this.http.get(`${this.URL}/spells${filters}`);
  };

  public getMonsters = (filters: string): Observable<any> => {
    return this.http.get(`${this.URL}/monsters${filters}`);
  };
}
