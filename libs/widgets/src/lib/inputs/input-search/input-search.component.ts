import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputSearchMode } from '../../domain';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

/**
 * # InputSearchComponent
 *
 * ## Description
 * @description
 *
 * This component allows to perform Search actions using an Input.
 *
 * In `AUTOMATIC` mode, the component will emit the Search value via the `(searchValueChange)` `@Output` every time the value of
 * the Input changes. To prevent a new value emission with every Key stroke inside the Input, a RxJs `debounceTime()` operator is used with a
 * value of 800ms.
 *
 * In `MANUAL` mode, the component will emit the Search value via the `(searchValueChange)` `@Output` when the ENTER key is pressed.
 *
 * ## Usage Example
 * @example
 *
 *      // Automatic Search
 *      <biz-input-search [mode]="'AUTOMATIC'" (searchValueChange)="onSearch($event)" />
 *
 *      // Manual Search
 *      <biz-input-search [mode]="'MANUAL'" (searchValueChange)="onSearch($event)" />
 *
 * @property { InputSearchMode } mode - **default**: `AUTOMATIC`
 * @property { EventEmitter<string> } searchValueChange - **@Output**
 */
@Component({
   selector: 'biz-input-search',
   templateUrl: './input-search.component.html',
   styleUrl: './input-search.component.scss',
   imports: [CommonModule, MatIcon, ReactiveFormsModule],
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class InputSearchComponent {
   @Input() mode: InputSearchMode = InputSearchMode.AUTOMATIC;
   @Output() searchValueChange: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();

   protected searchFormControl: FormControl<string | undefined> = new FormControl(undefined, { nonNullable: true });

   constructor() {
      /* Listen for changes in the FormControl. */
      this.searchFormControl.valueChanges
         .pipe(
            takeUntilDestroyed(),
            /* Avoid new emitted value with each key press. */
            debounceTime(800),

            /* Avoid new emitted value when there's no change. */
            distinctUntilChanged(),

            /* Only emit in AUTOMATIC mode */
            filter(() => this.mode === InputSearchMode.AUTOMATIC),

            /* Map empty string to undefined */
            map((searchValue: string | undefined) => (searchValue !== '' ? searchValue : undefined)),

            /* Emit */
            tap((searchValue: string | undefined) =>
               this.searchValueChange.emit(searchValue?.replace(/\s+/g, ' ').trim())
            )
         )
         .subscribe();
   }

   /**
    * onManualSearch()
    *
    * @description - In Manual mode, emits the current value of the Search FormControl in the searchValueChange EventEmitter.
    */
   protected onManualSearch(): void {
      if (this.mode === InputSearchMode.MANUAL) {
         this.searchValueChange.emit(this.searchFormControl.value?.replace(/\s+/g, ' ').trim());
      }
   }
}
