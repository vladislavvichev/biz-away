import { TripDto } from '@biz-away/api/trips/v1';
import { Score } from '../../enums';

export interface Trip extends TripDto {
   score: Score;
}
