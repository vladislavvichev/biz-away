import { inject, Injectable } from '@angular/core';
import { HttpParamsHelper, PageDto, SearchParamsDto } from '@biz-away/api';
import { Observable } from 'rxjs';
import { HttpParamsObject } from '@biz-away/core';
import { TripDto, TripsHttpService } from '@biz-away/api/trips/v1';

@Injectable({ providedIn: 'root' })
export class TripsService {
   // region<Dependency Injection>
   private readonly tripsHttpService: TripsHttpService = inject(TripsHttpService);
   // endregion

   /**
    * @description - Searches **Trips** based on the given **Search Parameters**.
    *
    * @param searchParams - The **Search Parameters**.
    * @returns A paginated **Trips** result.
    */
   public searchTrips(searchParams: SearchParamsDto): Observable<PageDto<TripDto>> {
      const httpParams: HttpParamsObject = HttpParamsHelper.fromSearchParams(searchParams);

      return this.tripsHttpService.search(httpParams);
   }
}
