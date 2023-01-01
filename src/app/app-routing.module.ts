import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddyUrlComponent } from './addy-url/addy-url.component';
import { AddyyRedirectComponent } from './addyy-redirect/addyy-redirect.component';

const routes: Routes = [
  {path:'app', component: AddyUrlComponent},
  {path: '**', component:AddyyRedirectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
