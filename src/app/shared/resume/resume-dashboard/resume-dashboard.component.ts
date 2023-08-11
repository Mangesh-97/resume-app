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
      .subscribe(res => {
        // console.log(res);
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
        if (res) {
          setTimeout(() => {
            this._resumeSerivce.getAllResume()
              .subscribe(res => {
                // console.log(res);
                this.resumesArray = res
              })
          }, 500);
        }
      })
  }
}
