import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';

const routes: Routes = [
  {
    path: "timeline",
    component: TimelineComponent
  },
  { path: '', redirectTo: 'timeline', pathMatch: 'full' },
  { path: '**',   redirectTo: 'timeline', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
