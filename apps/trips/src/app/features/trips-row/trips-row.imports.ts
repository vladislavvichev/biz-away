import { ComponentImport } from '@biz-away/core';
import { CommonModule } from '@angular/common';
import { ImageComponent, StarRatingComponent, TagListComponent } from '@biz-away/widgets';
import { TripsScoreComponent } from '../trips-score';
import { RouterLink } from '@angular/router';

export const TRIPS_ROW_IMPORTS: ComponentImport[] = [
   CommonModule,
   RouterLink,
   TripsScoreComponent,
   StarRatingComponent,
   TagListComponent,
   ImageComponent
];
