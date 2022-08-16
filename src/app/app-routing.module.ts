import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ATimelineComponent } from './components/a-timeline/a-timeline.component';
import { TimelineComponent } from './components/timeline/timeline.component';

const routes: Routes = [
  {
    path: "timeline",
    component: TimelineComponent
  },
  {
    path: "a-timeline",
    component: ATimelineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
