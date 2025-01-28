import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { map, Observable, shareReplay, Subject, tap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TripsService } from '../../services/trips/trips.service';
import { PageDto, SearchParamsDto } from '@biz-away/api';
import { TripDto } from '@biz-away/api/trips/v1';

@Component({
   selector: 'app-trips-list',
   templateUrl: './trips-list.component.html',
   styleUrl: './trips-list.component.scss',
   imports: [MatPaginator],
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TripsListComponent implements OnInit {
   // region<Dependency Injection>
   private readonly tripsService: TripsService = inject(TripsService);
   // endregion

   protected state$: Subject<PageDto<TripDto>> = new Subject();

   protected page$!: Observable<PageDto<TripDto>>;
   protected trips$!: Observable<TripDto[]>;

   ngOnInit() {
      this.tripsService
         .searchTrips({ page: 1, limit: 10 })
         .pipe(
            tap((page) => this.state$.next(page)),
            shareReplay()
         )
         .subscribe();

      this.trips$ = this.state$.pipe(
         tap(console.log),
         map((trips: PageDto<TripDto>) => trips.items),
         shareReplay()
      );
   }

   protected onPageChange(page: PageEvent): void {
      const searchParams: SearchParamsDto = {
         page: page.pageIndex + 1,
         limit: page.pageSize
      };

      this.tripsService
         .searchTrips(searchParams)
         .pipe(tap((page) => this.state$.next(page)))
         .subscribe();
   }
}
