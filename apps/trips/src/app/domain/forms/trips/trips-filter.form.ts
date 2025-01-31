import { FormControl } from '@angular/forms';

export interface TripsFilterForm {
   rating: FormControl<number>;
   minPrice: FormControl<number>;
   maxPrice: FormControl<number>;
   tags: FormControl<string[]>;
}
