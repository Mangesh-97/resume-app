import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeDashboardComponent } from './resume-dashboard/resume-dashboard.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResumesComponent } from './resumes/resumes.component';
import { RouterModule } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';



@NgModule({
  declarations: [
    ResumeDashboardComponent,
    ResumeFormComponent,
    ResumesComponent,
    ResumeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ResumeModule { }
