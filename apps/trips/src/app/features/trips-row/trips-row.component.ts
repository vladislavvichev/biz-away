import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TRIPS_ROW_IMPORTS } from './trips-row.imports';
import { Trip } from '../../domain';

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
   @Input({ required: true }) trip!: Trip;
}
