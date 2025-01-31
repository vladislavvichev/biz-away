import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { TripsFilter, TripsFilterForm } from '../../domain';
import { TRIPS_FILTER_IMPORTS } from './trips-filter.imports';

// TODO: Add Documentation & Unit Tests
@Component({
   selector: 'app-trips-filter',
   templateUrl: './trips-filter.component.html',
   styleUrl: './trips-filter.component.scss',
   imports: TRIPS_FILTER_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TripsFilterComponent {
   @Output() filterChange: EventEmitter<TripsFilter | undefined> = new EventEmitter<TripsFilter | undefined>();

   // region<Constants>
   protected readonly separatorKeysCodes: number[] = [ENTER, COMMA] as const;
   // endregion

   protected formGroup: FormGroup<TripsFilterForm> = new FormGroup<TripsFilterForm>({
      rating: new FormControl<number>(1, { nonNullable: true }),
      minPrice: new FormControl<number>(0, { nonNullable: true }),
      maxPrice: new FormControl<number>(10000, { nonNullable: true }),
      tags: new FormControl<string[]>([], { nonNullable: true })
   });

   protected addTag(event: MatChipInputEvent): void {
      const tags: string[] = this.formGroup.controls.tags.value;
      const value: string = (event.value || '').trim();

      if (value && tags.length < 5) {
         const alreadyExists: boolean = tags.includes(value);

         if (!alreadyExists) {
            this.formGroup.controls.tags.setValue([...tags, value]);
         }
      }

      event.chipInput.clear();
   }

   protected removeTag(tag: string): void {
      const tags: string[] = this.formGroup.controls.tags.value;
      const index: number = tags.indexOf(tag);

      if (index >= 0) {
         tags.splice(index, 1);

         this.formGroup.controls.tags.setValue(tags);
      }
   }

   protected onReset(): void {
      this.formGroup.reset();

      this.filterChange.emit(undefined);
   }

   protected onAccept(): void {
      const minRating: number = this.formGroup.controls.rating.value;
      const minPrice: number = this.formGroup.controls.minPrice.value;
      const maxPrice: number = this.formGroup.controls.maxPrice.value;
      const tags: string[] = this.formGroup.controls.tags.value;

      this.filterChange.emit({
         minRating: minRating > 1 ? minRating : undefined,
         minPrice: minPrice > 0 ? minPrice : undefined,
         maxPrice: maxPrice < 10000 ? maxPrice : undefined,
         tags: tags.length > 0 ? tags : undefined
      });
   }
}
