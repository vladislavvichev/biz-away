import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PAGINATOR_IMPORTS } from './paginator.imports';
import { PageEvent } from '@angular/material/paginator';

// TODO: Add Documentation & Unit Tests
@Component({
   selector: 'biz-paginator',
   templateUrl: './paginator.component.html',
   styleUrl: './paginator.component.scss',
   imports: PAGINATOR_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class PaginatorComponent {
   @Input({ required: true }) pageIndex!: number;
   @Input({ required: true }) pageSize!: number;
   @Input({ required: true }) totalItems!: number;
   @Input() pageSizeOptions!: number[];
   @Output() pageIndexChange: EventEmitter<number> = new EventEmitter<number>();
   @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

   protected readonly DEFAULT_PAGE_SIZE_OPTIONS: number[] = [10, 25, 50];

   /**
    * @description - Handles the page change event by emitting the corresponding page index or page size change.
    *
    * @param pageEvent - The event triggered when the page index or page size changes.
    */
   protected onPageChange(pageEvent: PageEvent): void {
      // Only emit if the page index has changed.
      if (pageEvent.pageIndex !== this.pageIndex) {
         this.pageIndexChange.emit(pageEvent.pageIndex);
      }
      // Only emit if the page size has changed.
      else if (pageEvent.pageSize !== this.pageSize) {
         this.pageSizeChange.emit(pageEvent.pageSize);
      }
   }
}
