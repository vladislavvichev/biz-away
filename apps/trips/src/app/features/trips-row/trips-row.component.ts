import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TripDto } from '@biz-away/api/trips/v1';
import { TRIPS_ROW_IMPORTS } from './trips-row.imports';

// TODO: Add Documentation & Unit Tests.
@Component({
   selector: 'app-trips-row',
   templateUrl: './trips-row.component.html',
   styleUrl: './trips-row.component.scss',
   imports: TRIPS_ROW_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TripsRowComponent {
   @Input({ required: true }) trip!: TripDto;
}
