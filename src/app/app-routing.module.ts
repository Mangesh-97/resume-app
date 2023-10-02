import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeDashboardComponent } from './shared/resume/resume-dashboard/resume-dashboard.component';
import { ResumeComponent } from './shared/resume/resume/resume.component';
import { MainDashboardComponent } from './shared/components/main-dashboard/main-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent
  },
  {
    path: 'resume',
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
