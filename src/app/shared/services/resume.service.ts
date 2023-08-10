import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iresume } from '../model/resume-form';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(
    private _http: HttpClient
  ) { }

  addResume(obj: Iresume): Observable<any> {
    return this._http.post<any>(`${environment.firbaseDB}resume.json`, obj)
  }

  getAllResume(): Observable<Iresume[]> {
    return this._http.get<Iresume[]>(`${environment.firbaseDB}resume.json`)
  }

  getResume(id: string): Observable<Iresume> {
    return this._http.get<Iresume>(`${environment.firbaseDB}resume/${id}/.json`)
  }
}
