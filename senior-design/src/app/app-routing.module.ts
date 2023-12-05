import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { PosComponent } from './pos/pos.component';

//When loaded, Shop Candy page loads
const routes: Routes = [
  { path: '', component: PosComponent},
  { path: 'management', component: ManagementComponent},
  { path: 'shop/candy', component: PosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
