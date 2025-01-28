import { TripsHttpService } from '../../../../../../lib/features/trips/v1';
import { Provider } from '@angular/core';

export const TripsHttpServiceTesting: Partial<TripsHttpService> = {
   search: jest.fn()
};

export function provideTripsHttpServiceTesting(): Provider {
   return {
      provide: TripsHttpService,
      useValue: TripsHttpServiceTesting
   };
}
