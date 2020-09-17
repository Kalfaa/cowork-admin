import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CreateReservationComponent} from "./create-openspace/create-reservation.component";
import {EditReservationComponent} from "./edit-openspace/edit-reservation.component";
import {DetailOpenspaceComponent} from "./detail-openspace/detail-openspace.component";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-openspace', component: CreateReservationComponent },
  { path: 'edit-openspace', component: EditReservationComponent },
  { path: 'detail-openspace/:id', component: DetailOpenspaceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
