import { Injectable } from '@angular/core';
import { Trip } from '@models/trip.interface';
import { ApiService } from '@services/api.service';
import { ApiStore } from '@services/api.store';

@Injectable()
export class HomeService {
  constructor(private api: ApiService, private store: ApiStore<Trip>) {}

  loadTrips() {
    this.store.setIsWorking();
    this.api.getTrips$().subscribe({
      next: (trips) => this.store.setData(trips),
      error: (error) => this.store.setError(error.message),
    });
  }
  selectState$() {
    return this.store.selectState$();
  }
}