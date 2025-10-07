import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideogameFormPage } from './videogame-form.page';

const routes: Routes = [
  { path: '', component: VideogameFormPage }, //Create a videogame
  { path: ':id', component: VideogameFormPage } //Edit a videogame 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideogameFormPageRoutingModule {}
