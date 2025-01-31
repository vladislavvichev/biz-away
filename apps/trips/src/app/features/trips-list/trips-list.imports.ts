import { ComponentImport } from '@biz-away/core';
import { CommonModule } from '@angular/common';
import { InputSearchComponent, LoadingSpinnerComponent, PaginatorComponent, SortComponent } from '@biz-away/widgets';
import { TripsFilterComponent } from '../trips-filter';
import { TripsRowComponent } from '../trips-row';

export const TRIPS_LIST_IMPORTS: ComponentImport[] = [
   CommonModule,
   TripsFilterComponent,
   TripsRowComponent,
   PaginatorComponent,
   SortComponent,
   InputSearchComponent,
   LoadingSpinnerComponent
];
