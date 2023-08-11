import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
      .pipe(
        map(res => {
          let arr = []

          for (let key in res) {
            let obj: Iresume = {
              address: res[key].address,
              education: res[key].education,
              email: res[key].email,
              fullName: res[key].fullName,
              langEnglish: res[key].langEnglish,
              langHindi: res[key].langHindi,
              langMarathi: res[key].langMarathi,
              objective: res[key].objective,
              phone: res[key].phone,
              board: res[key].board,
              skillsArray: res[key].skillsArray,
              id: key
            }

            // console.log(obj);
            arr.push(obj)
          }

          return arr
        })
      )
  }

  getResume(id: string): Observable<Iresume> {
    return this._http.get<Iresume>(`${environment.firbaseDB}resume/${id}/.json`)
  }
}
