import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentShellComponent } from './containers/content-shell/content-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ContentShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
