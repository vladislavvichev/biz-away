import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { filter, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { TripsService } from '../../services';
import { PageDto } from '@biz-away/api';
import { TripDto, TripsSearchParamsDto } from '@biz-away/api/trips/v1';
import { PageStateManager, PageStatus, SortDirection, SortOption } from '@biz-away/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TRIPS_LIST_IMPORTS } from './trips-list.imports';
import { TripsHelper } from '../../helpers';
import { Trip, TripsFilter } from '../../domain';
import { catchError } from 'rxjs/operators';

// TODO: Add Documentation & Unit Tests
@Component({
   selector: 'app-trips-list',
   templateUrl: './trips-list.component.html',
   styleUrl: './trips-list.component.scss',
   imports: TRIPS_LIST_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TripsListComponent extends PageStateManager<Trip, TripsFilter> {
   // region<Dependency Injection>
   private readonly tripsService: TripsService = inject(TripsService);
   // endregion

   // region<Types>
   protected readonly PAGE_STATUS: typeof PageStatus = PageStatus;
   // endregion

   // region<Constants>
   protected readonly SORT_OPTIONS: SortOption[] = TripsHelper.sortOptions;
   // endregion

   constructor() {
      super('trips-list-page-state');

      this.stateChange$
         .pipe(
            takeUntilDestroyed(),
            startWith(undefined),
            tap(() => this.updateStatus(PageStatus.LOADING)),
            map(() => this.getSearchParams()),
            switchMap((searchParams: TripsSearchParamsDto) =>
               this.tripsService.searchTrips(searchParams).pipe(catchError(() => this.handleSearchError()))
            ),
            tap((page: PageDto<TripDto>) => this.updateTotalItems(page.total)),
            map((page: PageDto<TripDto>) => this.tripsService.mapTripsAndCalculateScores(page.items)),
            tap((trips: Trip[]) => this.updateItems(trips)),
            filter(() => this.status() !== PageStatus.ERROR),
            tap(() => this.updateStatus(PageStatus.VALID))
         )
         .subscribe();
   }

   // TODO: Move method to a Helper?
   private handleSearchError(): Observable<PageDto<TripDto>> {
      this.updateStatus(PageStatus.ERROR);

      return of({ items: [], total: 0, limit: 0, page: 0 });
   }

   // TODO: Move method to a Helper?
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
