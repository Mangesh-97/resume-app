import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeDashboardComponent } from './shared/resume/resume-dashboard/resume-dashboard.component';
import { ResumeComponent } from './shared/resume/resume/resume.component';

const routes: Routes = [
  {
    path: '',
    component: ResumeDashboardComponent,
    children: [
      {
        path: ':resId',
        component: ResumeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
