import { SortOption } from '@biz-away/core';

// TODO: Add Documentation and UnitTests.
export abstract class TripsHelper {
   /**
    * @description - Provides a list of **Sort Options** for **Trips**.
    *
    * @returns An `Array` of **Sort Options**.
    */
   public static get sortOptions(): SortOption[] {
      return [
         {
            title: 'Title',
            value: 'title'
         },
         {
            title: 'Price',
            value: 'price'
         },
         {
            title: 'Rating',
            value: 'rating'
         },
         {
            title: 'Recently Added',
            value: 'creationDate'
         }
      ];
   }
}
