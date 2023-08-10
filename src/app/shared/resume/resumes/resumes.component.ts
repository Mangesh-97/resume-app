import { Component, Input, OnInit } from '@angular/core';
import { Iresume } from '../../model/resume-form';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.scss']
})
export class ResumesComponent implements OnInit {
  @Input()
  resumesArray!: Iresume[]

  constructor(
  ) { }

  ngOnInit(): void {


  }

}
