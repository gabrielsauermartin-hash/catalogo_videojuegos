import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyVideogamesPageRoutingModule } from './my-videogames-routing.module';

import { MyVideogamesPage } from './my-videogames.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyVideogamesPageRoutingModule
  ],
  declarations: [MyVideogamesPage]
})
export class MyVideogamesPageModule {}
