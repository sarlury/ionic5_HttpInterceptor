import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaketPage } from './paket.page';

const routes: Routes = [
  {
    path: '',
    component: PaketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaketPageRoutingModule {}
