import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { TripsService } from '../../services';
import { TripDto } from '@biz-away/api/trips/v1';
import { ImageSize } from '@biz-away/widgets';
import { TRIPS_DETAIL_IMPORTS } from './trips-detail.imports';

@Component({
   selector: 'app-trips-detail',
   templateUrl: './trips-detail.component.html',
   styleUrl: './trips-detail.component.scss',
   imports: TRIPS_DETAIL_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TripsDetailComponent {
   // region<Dependency Injection>
   private readonly router: Router = inject(Router);
   private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
   private readonly tripsService: TripsService = inject(TripsService);
   // endregion

   // region<Types>
   protected readonly IMAGE_SIZE: typeof ImageSize = ImageSize;
   // endregion

   protected trip$: Observable<TripDto>;

   constructor() {
      this.trip$ = this.activatedRoute.paramMap.pipe(
         map((params: ParamMap) => params.get('id')),
         filter((tripId: string | null): tripId is string => tripId !== null),
         switchMap((tripId: string) => this.tripsService.getTrip(tripId))
      );
   }

   protected async navigateBack(): Promise<void> {
      await this.router.navigate(['/trips']);
   }
}
