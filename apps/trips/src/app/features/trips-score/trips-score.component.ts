import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Score } from '../../domain';
import { TRIPS_SCORE_IMPORTS } from './trips-score.imports';

// TODO: Add Documentation & Unit Tests
@Component({
   selector: 'app-trips-score',
   templateUrl: './trips-score.component.html',
   styleUrl: './trips-score.component.scss',
   imports: TRIPS_SCORE_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TripsScoreComponent {
   @Input({ required: true }) score!: Score;

   // region<Types>
   protected readonly SCORE: typeof Score = Score;
   // endregion
}
