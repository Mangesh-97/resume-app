import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResumeFormComponent } from '../resume-form/resume-form.component';
import { ResumeService } from '../../services/resume.service';
import { map } from 'rxjs';
import { Iresume } from '../../model/resume-form';

@Component({
  selector: 'app-resume-dashboard',
  templateUrl: './resume-dashboard.component.html',
  styleUrls: ['./resume-dashboard.component.scss']
})
export class ResumeDashboardComponent implements OnInit {

  resumesArray: Array<Iresume> = []
  constructor(
    public dialog: MatDialog,
    private _resumeSerivce: ResumeService
  ) { }

  ngOnInit(): void {
    this._resumeSerivce.getAllResume()
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
              schoolUni: res[key].schoolUni,
              skillsArray: res[key].skillsArray,
              id: key
            }

            console.log(obj);
            arr.push(obj)
          }

          return arr
        })
      )
      .subscribe(res => {
        console.log(res);
        this.resumesArray = res
      })
  }
  openFormDialog() {

    const dialogConfig = new MatDialogConfig
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this.dialog.open(ResumeFormComponent, dialogConfig).afterClosed()
      .subscribe(res => {
        console.log('result', res);

      })
  }
}
