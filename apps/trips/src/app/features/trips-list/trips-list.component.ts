import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TripDto, TripsHttpService } from '../../../../../../libs/api/src/lib/features/trips/v1';
import { map, Observable, shareReplay, Subject, tap } from 'rxjs';
import { TRIPS_LIST_IMPORTS } from './trips-list.imports';
import { PageDto, SearchParamsDto } from '@biz-away/api';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
   selector: 'app-trips-list',
   templateUrl: './trips-list.component.html',
   styleUrl: './trips-list.component.scss',
   imports: [TRIPS_LIST_IMPORTS, MatPaginator],
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TripsListComponent implements OnInit {
   // region<Dependency Injection>
   private readonly tripsHttpService: TripsHttpService = inject(TripsHttpService);
   // endregion

   protected state$: Subject<PageDto<TripDto>> = new Subject();

   protected page$!: Observable<PageDto<TripDto>>;
   protected trips$!: Observable<TripDto[]>;

   ngOnInit() {
      this.tripsHttpService
         .search({ page: 1, limit: 10 })
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

      this.tripsHttpService
         .search(searchParams)
         .pipe(tap((page) => this.state$.next(page)))
         .subscribe();
   }
}
