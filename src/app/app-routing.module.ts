import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddyUrlComponent } from './addy-url/addy-url.component';

const routes: Routes = [
  {path:'app', component: AddyUrlComponent},
  {path:'', component: AddyUrlComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
