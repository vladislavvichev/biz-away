import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@biz-away/core';
import { TripsService } from '../../services';
import { TripHighlighted } from '../../domain';
import { Observable, tap } from 'rxjs';
import { TripDto } from '@biz-away/api/trips/v1';
import { TRIPS_HIGHLIGHTED_TRIP_IMPORTS } from './trips-highlighted-trip.imports';

@Component({
   selector: 'app-trips-highlighted-trip',
   templateUrl: './trips-highlighted-trip.component.html',
   styleUrl: './trips-highlighted-trip.component.scss',
   imports: TRIPS_HIGHLIGHTED_TRIP_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TripsHighlightedTripComponent {
   // region<Dependency Injection>
   private readonly router: Router = inject(Router);
   private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
   private readonly tripService: TripsService = inject(TripsService);
   // endregion

   protected async goToHighlightedTrip(): Promise<void> {
      const savedTrip: TripHighlighted | null = this.localStorageService.get('highlighted-trip');
      const today: Date = new Date();

      const highlightedTrip$: Observable<TripDto> = this.tripService.getTripHighlighted().pipe(
         tap((trip: TripDto) =>
            this.localStorageService.add<TripHighlighted>('highlighted-trip', {
               tripId: trip.id,
               date: today.toISOString()
            })
         ),
         tap((trip: TripDto) => this.router.navigate(['trip', trip.id]))
      );

      if (!savedTrip) {
         highlightedTrip$.subscribe();
      } else {
         const tripDate: Date = new Date(savedTrip.date);

         const isToday: boolean =
            tripDate.getFullYear() === today.getFullYear() &&
            tripDate.getMonth() === today.getMonth() &&
            tripDate.getDate() === today.getDate();

         if (isToday) {
            await this.router.navigate(['trip', savedTrip.tripId]);
         } else {
            highlightedTrip$.subscribe();
         }
      }
   }
}
