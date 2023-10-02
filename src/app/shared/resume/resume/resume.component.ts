import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { Iresume } from '../../model/resume-form';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResumeFormComponent } from '../resume-form/resume-form.component';
import { map, tap } from 'rxjs';
import { IntercepterService } from '../../services/intercepter.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit , OnDestroy{
  resumeId!: string

  resObj!: Iresume

  constructor(
    private _route: ActivatedRoute,
    private _resumeService: ResumeService,
    private _dialog: MatDialog,
    private __intercepterService: IntercepterService
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
      dialogConfig.autoFocus = true
      dialogConfig.disableClose = true
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

  @ViewChild('resume') htmlEl!: ElementRef<HTMLElement>

  onDowaload() {
    html2canvas(this.htmlEl.nativeElement)
      .then(res => {
        // console.log(res, 'res');


        const imgData = res.toDataURL('image/png',1.0)
        console.log(imgData);
        const pageWidth = 210
        const pageHeight = 297
        const height = res.height * pageWidth / res.height
        let doc = new jsPDF('p', "mm", "a4")
        // let doc = new jsPDF()
        // doc.addImage(imgData, 'PNG', 20, 20, pageWidth, height)
        doc.addImage(imgData, 'PNG',5,5,200,0)
        doc.save('resume')
      })
      .catch(err => {
        // console.log(err);

      })
  }
  ngOnDestroy(): void {
    this.__intercepterService.unSubscribeAll()
  }
}
