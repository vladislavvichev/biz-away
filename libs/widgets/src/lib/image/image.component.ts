import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSize } from '../domain';

// TODO: Add Documentation & Unit Tests
@Component({
   selector: 'biz-image',
   templateUrl: './image.component.html',
   styleUrl: './image.component.scss',
   imports: [CommonModule],
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class ImageComponent {
   @Input({ required: true }) source!: string;
   @Input() size: ImageSize = ImageSize.SMALL;
   @Input() alt!: string;

   // region<Constants>
   protected readonly DEFAULT_PLACEHOLDER: string = '/assets/images/image_placeholder_160dp.png';
   // endregion

   protected onError(): void {
      this.source = this.DEFAULT_PLACEHOLDER;
   }
}
