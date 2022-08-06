import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';

const routes: Routes = [
  {
    path: "timeline",
    component: TimelineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
