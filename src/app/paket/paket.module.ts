import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaketPageRoutingModule } from './paket-routing.module';

import { PaketPage } from './paket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaketPageRoutingModule
  ],
  declarations: [PaketPage]
})
export class PaketPageModule {}
