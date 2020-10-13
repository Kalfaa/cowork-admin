import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from "@angular/material/stepper";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { CreateReservationComponent } from './create-openspace/create-reservation.component';
import { EditReservationComponent } from './edit-openspace/edit-reservation.component';
import {JwtInterceptor} from "./helpers/JWTInterceptor";
import {MatTableModule} from "@angular/material/table";
import { DetailOpenspaceComponent } from './detail-openspace/detail-openspace.component';
import {MatExpansionModule} from "@angular/material/expansion";


import {MatDialogModule} from '@angular/material/dialog';
import {DialogRoomComponent} from "./detail-openspace/dialog-room.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ErrorInterceptor} from "./helpers/ErrorInterceptor";
@NgModule({
  declarations: [
    AppComponent,LoginComponent, HomeComponent, CreateReservationComponent, EditReservationComponent, DetailOpenspaceComponent,DialogRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
