import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { STAR_RATING_IMPORTS } from './star-rating.imports';

// TODO: Add Documentation and Unit Tests
@Component({
   selector: 'biz-star-rating',
   templateUrl: './star-rating.component.html',
   styleUrl: './star-rating.component.scss',
   imports: STAR_RATING_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class StarRatingComponent implements OnInit {
   @Input({ required: true }) rating!: number;
   @Input() totalReviews!: number;

   protected stars!: number[];

   ngOnInit() {
      this.stars = this.parseRating(this.rating);
   }

   /**
    * @description - Parses a numerical rating into an array of numbers, representing the rating as individual components.
    *                 The array will always have a length of 5, containing integer values of `1` for the whole part of the
    *                 rating, the decimal part if present, and `0` for the remaining items.
    *
    * @param value - The numerical rating to parse. Must be a value between 1 and 5, inclusive.
    * @returns An `Array` representing the parsed rating, with a fixed length of 5.
    * @throws Error - When the input rating is not between 1 and 5.
    */
   private parseRating(value: number): number[] {
      if (value < 1 || value > 5) {
         throw new Error('The provided Rating must be a number between 1 and 5.');
      }

      /* Obtain the Integer and Decimal parts of the Rating. */
      const integerPart: number = Math.floor(value);
      const decimalPart: number = parseFloat((value - integerPart).toFixed(1));

      const result: number[] = [];

      /* Fill the array with `1` for the integer part */
      for (let i = 0; i < integerPart; i++) {
         result.push(1);
      }

      /* Add the decimal part if it exists */
      if (decimalPart > 0) {
         result.push(decimalPart);
      }

      /* Fill the remaining items with `0` so the array is always of length 5 */
      while (result.length < 5) {
         result.push(0);
      }

      return result;
   }
}
