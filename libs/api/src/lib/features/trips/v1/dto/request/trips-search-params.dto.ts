import { SearchParamsDto } from '../../../../../shared';

export interface TripsSearchParamsDto extends SearchParamsDto {
   titleFilter?: string;
   minRating?: number;
   minPrice?: number;
   maxPrice?: number;
   tags?: string[];
}
