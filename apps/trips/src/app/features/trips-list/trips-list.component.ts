import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, startWith, switchMap, tap } from 'rxjs';
import { TripsService } from '../../services/trips/trips.service';
import { PageDto } from '@biz-away/api';
import { TripDto, TripsSearchParamsDto } from '@biz-away/api/trips/v1';
import { PageStateManager, SortDirection, SortOption } from '@biz-away/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TRIPS_LIST_IMPORTS } from './trips-list.imports';
import { TripsHelper } from '../../helpers';
import { TripsFilter } from '../../domain';

@Component({
   selector: 'app-trips-list',
   templateUrl: './trips-list.component.html',
   styleUrl: './trips-list.component.scss',
   imports: TRIPS_LIST_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TripsListComponent extends PageStateManager<TripDto, TripsFilter> {
   // region<Dependency Injection>
   private readonly tripsService: TripsService = inject(TripsService);
   // endregion

   // region<Constants>
   protected readonly SORT_OPTIONS: SortOption[] = TripsHelper.sortOptions;
   // endregion

   constructor() {
      super();

      this.stateChange$
         .pipe(
            takeUntilDestroyed(),
            startWith(undefined),
            map(() => this.getSearchParams()),
            switchMap((searchParams: TripsSearchParamsDto) => this.tripsService.searchTrips(searchParams)),
            tap((page: PageDto<TripDto>) => this.updateItems(page.items)),
            tap((page: PageDto<TripDto>) => this.updateTotalItems(page.total)),
            tap((page: PageDto<TripDto>) => console.log(page))
         )
         .subscribe();
   }

   private getSearchParams(): TripsSearchParamsDto {
      return {
         page: this.pageIndex() + 1,
         limit: this.pageSize(),
         sortBy: this.sortOption() ?? undefined,
         sortOrder: this.sortOption() ? this.sortDirection() ?? SortDirection.ASC : undefined,
         titleFilter: this.search() ?? undefined,
         minRating: this.filter()?.minRating ?? undefined,
         minPrice: this.filter()?.minPrice ?? undefined,
         maxPrice: this.filter()?.maxPrice ?? undefined,
         tags: this.filter()?.tags ?? undefined
      };
   }
}
