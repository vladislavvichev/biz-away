import { TripDto, TripsHttpService } from '../../../../../lib/features/trips/v1';
import { HttpParamsObject, HttpService } from '@biz-away/core';
import { TestBed } from '@angular/core/testing';
import { PageDto } from '../../../../../lib';
import { TRIP_DTO_MOCK } from '../../../../__mocks__/features/trips/v1';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment.dev';

describe('TripsHttpService', () => {
   let service: TripsHttpService;
   let httpTesting: HttpTestingController;

   const PATH: string = `${environment.apiUrl}`;

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [TripsHttpService, provideHttpClient(), provideHttpClientTesting()]
      });

      service = TestBed.inject(TripsHttpService);
      httpTesting = TestBed.inject(HttpTestingController);
   });

   it('should be create', () => {
      /* Assert */
      expect(service).toBeTruthy();
   });

   describe('search', () => {
      it('should call HttpService.get with correct parameters', () => {
         /* Arrange */
         const mockSearchParams: HttpParamsObject = { page: '1', size: '10' };
         const mockResponse: PageDto<TripDto> = TRIP_DTO_MOCK;

         /* Act */
         service.search(mockSearchParams).subscribe((result: PageDto<TripDto>) => {
            expect(result).toEqual(mockResponse);
            expect(HttpService.prototype['get']).toHaveBeenCalledWith('', 'v1', mockSearchParams);
         });

         /* Assert */
         const testRequest: TestRequest = httpTesting.expectOne(`${PATH}/v1/trips/?page=1&size=10`);
         expect(testRequest.request.method).toEqual('GET');
         expect(testRequest.request.params.get('page')).toEqual('1');
         expect(testRequest.request.params.get('size')).toEqual('10');
         testRequest.flush(mockResponse);
      });
   });
});
