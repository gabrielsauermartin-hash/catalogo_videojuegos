import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideogameFormPageRoutingModule } from './videogame-form-routing.module';

import { VideogameFormPage } from './videogame-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VideogameFormPageRoutingModule
  ],
  declarations: [VideogameFormPage]
})
export class VideogameFormPageModule {}
