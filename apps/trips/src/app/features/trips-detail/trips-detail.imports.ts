import { CommonModule } from '@angular/common';
import { ImageComponent, LoadingSpinnerComponent, StarRatingComponent, TagListComponent } from '@biz-away/widgets';
import { ComponentImport } from '@biz-away/core';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

export const TRIPS_DETAIL_IMPORTS: ComponentImport[] = [
   CommonModule,
   MatIcon,
   MatFabButton,
   ImageComponent,
   StarRatingComponent,
   TagListComponent,
   LoadingSpinnerComponent
];
