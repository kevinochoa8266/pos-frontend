import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { HomeComponent } from './home/home.component';
import { PosComponent } from './pos/pos.component';

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
