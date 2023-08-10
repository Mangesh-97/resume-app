import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { Iresume } from '../../model/resume-form';

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
    private _resumeService: ResumeService
  ) { }

  ngOnInit(): void {
    this._route.params
      .subscribe(res => {
        this.resumeId = res['resId']
        console.log(this.resumeId);
        this._resumeService.getResume(this.resumeId)
          .subscribe(res => {
            console.log(res);
            this.resObj = res


          })
      })
  }

}
