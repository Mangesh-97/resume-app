import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResumeFormComponent } from '../resume-form/resume-form.component';
import { ResumeService } from '../../services/resume.service';
import { map, tap } from 'rxjs';
import { Iresume } from '../../model/resume-form';
import { IntercepterService } from '../../services/intercepter.service';

@Component({
  selector: 'app-resume-dashboard',
  templateUrl: './resume-dashboard.component.html',
  styleUrls: ['./resume-dashboard.component.scss']
})
export class ResumeDashboardComponent implements OnInit, OnDestroy {

  resumesArray: Array<Iresume> = []
  panelOpenState = false;

  constructor(
    public dialog: MatDialog,
    private _resumeSerivce: ResumeService,
    private _intercepterService: IntercepterService
  ) { }

  ngOnInit(): void {

    
    this._resumeSerivce.getAllResume()
      .subscribe(res => {
        // console.log(res);
        this.resumesArray = res
      })

      this._resumeSerivce.deleteResume$
        .subscribe(res => {
          // console.log(res,'deletestatus in dashboard');
          
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
  openFormDialog() {

    const dialogConfig = new MatDialogConfig
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this.dialog.open(ResumeFormComponent, dialogConfig).afterClosed()
      .subscribe(res => {
        // console.log('result', res);
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

  
  ngOnDestroy(): void {
    this._intercepterService.unSubscribeAll()
  }
}
