import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TAG_LIST_IMPORTS } from './tag-list.imports';

// TODO: Add Documentation & Unit Tests
@Component({
   selector: 'biz-tag-list',
   templateUrl: './tag-list.component.html',
   styleUrl: './tag-list.component.scss',
   imports: TAG_LIST_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class TagListComponent {
   @Input({ required: true }) tags!: string[];
}
