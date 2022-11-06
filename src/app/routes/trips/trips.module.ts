import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips.component';
import { TripsForm } from './trips.form';
import { TripsList } from './trips.list';


@NgModule({
  declarations: [
    TripsComponent,
    TripsForm,
    TripsList
  ],
  imports: [
    CommonModule,
    TripsRoutingModule
  ]
})
export class TripsModule { }
