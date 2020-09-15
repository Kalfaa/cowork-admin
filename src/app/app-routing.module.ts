import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CreateReservationComponent} from "./create-reservation/create-reservation.component";
import {EditReservationComponent} from "./edit-reservation/edit-reservation.component";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-reservation', component: CreateReservationComponent },
  { path: 'edit-reservation', component: EditReservationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
