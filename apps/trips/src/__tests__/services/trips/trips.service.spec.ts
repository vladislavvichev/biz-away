import { TestBed } from '@angular/core/testing';
import { TripDto } from '@biz-away/api/trips/v1';
import { HttpParamsHelper, PageDto, SearchParamsDto } from '@biz-away/api';
import { Observable, of } from 'rxjs';
import { TripsService } from '../../../app/services/trips/trips.service';
import { provideTripsHttpServiceTesting, TripsHttpServiceTesting } from '@biz-away/api/trips/mocks/v1';
import { HttpParamsObject } from '@biz-away/core';

describe('TripsService', () => {
   let tripsService: TripsService;

   const httpParamsHelper: jest.Mocked<typeof HttpParamsHelper> = {
      fromSearchParams: jest.fn()
   } as unknown as jest.Mocked<typeof HttpParamsHelper>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [TripsService, provideTripsHttpServiceTesting()]
      });

      tripsService = TestBed.inject(TripsService);
   });

   it('should create', () => {
      /* Assert */
      expect(tripsService).toBeTruthy();
   });

   describe('searchTrips', () => {
      it('should call HttpParamsHelper.fromSearchParams and TripsHttpService.search', () => {
         /* Arrange */
         const searchParams: SearchParamsDto = { page: 1, limit: 10 };
         const httpParams: HttpParamsObject = { page: '1', limit: '10' };
         const response: PageDto<TripDto> = { items: [], limit: 10, page: 1, total: 10 };

         jest.spyOn(TripsHttpServiceTesting, 'search').mockReturnValue(of(response));

         httpParamsHelper.fromSearchParams.mockReturnValue(httpParams);

         /* Act */
         const result$: Observable<PageDto<TripDto>> = tripsService.searchTrips(searchParams);

         /* Assert */
         result$.subscribe((page: PageDto<TripDto>) => {
            expect(httpParamsHelper.fromSearchParams).toHaveBeenCalledWith(searchParams);
            expect(TripsHttpServiceTesting.search).toHaveBeenCalledWith(httpParams);
            expect(page).toEqual(response);
         });
      });
   });
});
