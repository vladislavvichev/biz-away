import { ComponentImport } from '@biz-away/core';
import { CommonModule } from '@angular/common';
import { InputSearchComponent, PaginatorComponent, SortComponent } from '@biz-away/widgets';
import { TripsFilterComponent } from '../trips-filter';

export const TRIPS_LIST_IMPORTS: ComponentImport[] = [
   CommonModule,
   TripsFilterComponent,
   PaginatorComponent,
   SortComponent,
   InputSearchComponent
];
