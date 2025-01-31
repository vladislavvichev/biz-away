import { ComponentImport } from '@biz-away/core';
import { CommonModule } from '@angular/common';
import { InputSearchComponent, LoadingSpinnerComponent, PaginatorComponent, SortComponent } from '@biz-away/widgets';
import { TripsFilterComponent } from '../trips-filter';
import { TripsRowComponent } from '../trips-row';
import { TripsHighlightedTripComponent } from '../trips-highlighted-trip';

export const TRIPS_LIST_IMPORTS: ComponentImport[] = [
   CommonModule,
   TripsFilterComponent,
   TripsRowComponent,
   TripsHighlightedTripComponent,
   PaginatorComponent,
   SortComponent,
   InputSearchComponent,
   LoadingSpinnerComponent
];
