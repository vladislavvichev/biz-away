import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, startWith, switchMap, tap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TripsService } from '../../services/trips/trips.service';
import { PageDto, SearchParamsDto } from '@biz-away/api';
import { TripDto } from '@biz-away/api/trips/v1';
import { PageStateManager } from '@biz-away/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
   selector: 'app-trips-list',
   templateUrl: './trips-list.component.html',
   styleUrl: './trips-list.component.scss',
   imports: [MatPaginator],
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TripsListComponent extends PageStateManager<TripDto> {
   // region<Dependency Injection>
   private readonly tripsService: TripsService = inject(TripsService);
   // endregion

   constructor() {
      super();

      this.stateChange$
         .pipe(
            takeUntilDestroyed(),
            startWith(undefined),
            map(() => this.getSearchParams()),
            switchMap((searchParams: SearchParamsDto) => this.tripsService.searchTrips(searchParams)),
            tap((page: PageDto<TripDto>) => this.updateItems(page.items)),
            tap((page: PageDto<TripDto>) => this.updateTotalItems(page.total)),
            tap((page: PageDto<TripDto>) => console.log(page))
         )
         .subscribe();
   }

   protected onPageChange(page: PageEvent): void {
      if (page.pageIndex !== this.pageIndex()) {
         this.updatePageIndex(page.pageIndex);
      } else {
         this.updatePageSize(page.pageSize);
      }
   }

   private getSearchParams(): SearchParamsDto {
      return {
         page: this.pageIndex() + 1,
         limit: this.pageSize()
      };
   }
}
