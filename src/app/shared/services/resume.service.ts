import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iresume } from '../model/resume-form';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  deleteResume$ = new BehaviorSubject<boolean>(false)

  constructor(
    private _http: HttpClient
  ) { }

  addResume(obj: Iresume): Observable<any> {
    return this._http.post<any>(`${environment.firbaseDB}resume.json`, obj)
  }

  getAllResume(): Observable<Iresume[]> {
    return this._http.get<Iresume[]>(`${environment.firbaseDB}resume.json`)
      .pipe(
        map((res: Iresume[]) => {
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
              employment: res[key].employment,
              companyName: res[key].companyName,
              experience: res[key].experience,
              designation: res[key].designation,
              id: key
            }

            // console.log(obj);
            arr.unshift(obj)
          }

          return arr
        })
      )
  }

  getResume(id: string): Observable<Iresume> {
    return this._http.get<Iresume>(`${environment.firbaseDB}resume/${id}/.json`)
      .pipe(
        map((res: Iresume) => {
          // console.log(res);
          let obj = {
            ...res,
            id: id
          }
          return obj
        })
      )
  }

  updateResume(id: string, obj: Iresume): Observable<Iresume> {
    return this._http.patch<Iresume>(`${environment.firbaseDB}resume/${id}/.json`, obj)

  }

  deleteResume(id: string): Observable<any> {
    return this._http.delete<Iresume>(`${environment.firbaseDB}resume/${id}/.json`)
  }
}
