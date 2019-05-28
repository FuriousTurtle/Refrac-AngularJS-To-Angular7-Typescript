import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallComponent } from './components/callComponent/callComponent.component';
import { LogComponent } from './components/logComponent/logComponent.component';

const routes: Routes = [
  { path: 'login', component: LogComponent },
  { path: 'home', component: CallComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
