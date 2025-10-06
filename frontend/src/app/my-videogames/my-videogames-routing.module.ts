import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyVideogamesPage } from './my-videogames.page';

const routes: Routes = [
  {
    path: '',
    component: MyVideogamesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyVideogamesPageRoutingModule {}
