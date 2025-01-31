import { inject, Injectable } from '@angular/core';
import { HttpParamsHelper, PageDto } from '@biz-away/api';
import { Observable } from 'rxjs';
import { HttpParamsObject } from '@biz-away/core';
import { TripDto, TripsHttpService, TripsSearchParamsDto } from '@biz-away/api/trips/v1';
import { Trip } from '../../domain';
import { ScoreService } from '../score/score.service';

// TODO: Add Unit Tests
@Injectable({ providedIn: 'root' })
export class TripsService {
   // region<Dependency Injection>
   private readonly tripsHttpService: TripsHttpService = inject(TripsHttpService);
   private readonly scoreService: ScoreService = inject(ScoreService);
   // endregion

   /**
    * @description - Searches **Trips** based on the given **Search Parameters**.
    *
    * @param searchParams - The **Search Parameters**.
    * @returns A paginated **Trips** result.
    */
   public searchTrips(searchParams: TripsSearchParamsDto): Observable<PageDto<TripDto>> {
      const httpParams: HttpParamsObject = HttpParamsHelper.fromSearchParams(searchParams);

      return this.tripsHttpService.search(httpParams);
   }

   /**
    * @description - Obtains the details of a **Trip** using the provided **Trip** `id`.
    *
    * @param tripId - The `id`.
    * @returns The **Trip** details.
    */
   public getTrip(tripId: string): Observable<TripDto> {
      return this.tripsHttpService.getById(tripId);
   }

   /**
    * @description - Obtains the **Trip of the Day**.
    *
    * @returns The **Trip of the Day**.
    */
   public getTripHighlighted(): Observable<TripDto> {
      return this.tripsHttpService.getHighlighted();
   }

   /**
    * @description - Maps an `Array` of `TripDto` to an array of `Trip`, calculating and adding the **Score** for each trip.
    *
    * @param trips - The `Array` of `TripDto`.
    * @returns An `Array` of `Trip`.
    */
   public mapTripsAndCalculateScores(trips: TripDto[]): Trip[] {
      return trips.map((trip: TripDto) => ({
         ...trip,
         score: this.scoreService.calculateScore(trip.co2, trip.rating, trip.nrOfRatings)
      }));
   }
}
