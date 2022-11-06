import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-bookings',
  template: `
    <table role="grid">
      <thead>
        <tr>
          <th><strong>Trip Id</strong></th>
          <th><strong>Customer</strong></th>
          <th><strong>Email</strong></th>
          <th><strong>Seats</strong></th>
          <th><strong>Date</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let booking of bookings$ | async">
          <td>{{ booking.tripId }}</td>
          <td>{{ booking.customer.name }}</td>
          <td>{{ booking.customer.email }}</td>
          <td>{{ booking.seats }}</td>
          <td>{{ booking.date | date: 'yyyy-MMM-dd' }}</td>
        </tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent implements OnInit {
  bookings$ = this.api.getBookings$();
  constructor(private api: ApiService) {}

  ngOnInit(): void {}
}
