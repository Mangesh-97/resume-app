import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { Iresume } from '../../model/resume-form';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResumeFormComponent } from '../resume-form/resume-form.component';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  resumeId!: string

  resObj!: Iresume
  constructor(
    private _route: ActivatedRoute,
    private _resumeService: ResumeService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // console.log(this.resObj);

    this._route.params
      .subscribe(res => {
        this.resumeId = res['resId']
        // console.log(this.resumeId);
        if (this.resumeId) {
          this._resumeService.getResume(this.resumeId)
            .subscribe(res => {
              // console.log(res, 'get');
              this.resObj = res

            })
        }

      })
  }

  onEdit() {
    if (this.resObj) {

      const dialogConfig = new MatDialogConfig

      dialogConfig.data = this.resObj
      this._dialog.open(ResumeFormComponent, dialogConfig).afterClosed()
        .subscribe(res => {
          // console.log(res);
          if(res){
            setTimeout(() => {
              this._resumeService.getResume(this.resumeId)
              .subscribe(res => {
                // console.log(res, 'get');
                this.resObj = res
  
              })
            }, 500);
          }
        })
    }
  }
}
