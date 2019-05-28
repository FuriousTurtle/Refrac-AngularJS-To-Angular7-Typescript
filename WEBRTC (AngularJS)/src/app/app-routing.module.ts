import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {callIntComponent} from './call-int/call-int.component'

const routes: Routes = [
  {path: 'foo', component: callIntComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
