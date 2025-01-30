import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { SortDirection, SortOption } from '@biz-away/core';
import { SORT_IMPORTS } from './sort.imports';

// TODO: Add Documentation and Unit Tests.
@Component({
   selector: 'biz-sort',
   templateUrl: './sort.component.html',
   styleUrl: './sort.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: SORT_IMPORTS,
   standalone: true
})
export class SortComponent {
   @Input({ required: true }) sortOption: string | undefined;
   @Input({ required: true }) sortDirection: SortDirection | undefined;
   @Input({ required: true }) sortOptions!: SortOption[];
   @Output() sortOptionChange: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();
   @Output() sortDirectionChange: EventEmitter<SortDirection> = new EventEmitter<SortDirection>();

   // region<Types>
   protected readonly SORT_DIRECTION: typeof SortDirection = SortDirection;
   // endregion

   /**
    * @description - Handles the change event for the **Sort Option** change.
    *
    * @param sortOption - The selected **Sort Option**.
    */
   protected onSortOptionChange(sortOption: MatSelectChange): void {
      this.sortOptionChange.emit(sortOption.value);
   }

   /**
    * @description - Handles the change event for the **Sort Direction** by toggling between ASC and DESC, if there is
    *                a **Sort Option** currently selected.
    */
   protected onSortDirectionChange(): void {
      if (this.sortOption) {
         const sortDirection: SortDirection = this.sortDirection ?? SortDirection.ASC;

         this.sortDirectionChange.emit(sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
      }
   }
}
