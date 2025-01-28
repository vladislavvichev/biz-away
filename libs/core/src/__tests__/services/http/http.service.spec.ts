import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpRequest, provideHttpClient } from '@angular/common/http';
import { HttpParamsObject } from '../../../lib';
import {
   apiUrl,
   httpServiceUrl,
   TestHttpService,
   TestServiceWithApiUrl,
   TestServiceWithApiUrlEmpty,
   TestServiceWithHttpServiceUrlEmpty,
   TestServiceWithoutDecorators
} from './test-classes';

const testMethodUrl: string = 'testMethodUrl';
const testVersion: string = 'testVersion';
const testBody: { value: string } = { value: 'value' };
const testParams: HttpParamsObject = { param1: 'value1', param2: 'value2' };
const testWithCredentials: boolean = true;

const testResponse: string = 'testResponse';

describe('HttpService', () => {
   let httpTestingController: HttpTestingController;
   let service: TestHttpService;

   beforeEach(() => {
      // Configure the Angular testing module
      TestBed.configureTestingModule({
         providers: [provideHttpClient(), provideHttpClientTesting(), TestHttpService]
      });

      // Inject the testing tools
      httpTestingController = TestBed.inject(HttpTestingController);
      service = TestBed.inject(TestHttpService);
   });

   afterEach(() => {
      httpTestingController.verify();
   });

   describe('constructor', () => {
      it('should create', () => {
         /* Assert */
         expect(service).toBeTruthy();
      });

      it('should throw an error if ApiUrl decorator is missing', () => {
         /* Assert */
         expect(() => TestBed.inject(TestServiceWithoutDecorators)).toThrow(
            `The ApiUrl decorator is missing on the class 'TestServiceWithoutDecorators'.`
         );
      });

      it('should throw an error if HttpServiceUrl decorator is missing', () => {
         /* Assert */
         expect(() => TestBed.inject(TestServiceWithApiUrl)).toThrow(
            `The HttpServiceUrl decorator is missing on the class 'TestServiceWithApiUrl'.`
         );
      });

      it('should throw an error if apiUrl is not set', () => {
         /* Assert */
         expect(() => TestBed.inject(TestServiceWithApiUrlEmpty)).toThrow(
            `The 'apiUrl' property is not set for the class 'TestServiceWithApiUrlEmpty'.`
         );
      });

      it('should throw an error if httpServiceUrl is not set', () => {
         /* Assert */
         expect(() => TestBed.inject(TestServiceWithHttpServiceUrlEmpty)).toThrow(
            `The 'httpServiceUrl' property is not set for the class 'TestServiceWithHttpServiceUrlEmpty'.`
         );
      });
   });

   describe('get', () => {
      it('should call HttpClient.get with the correct endpoint URL and Param options', () => {
         /* Act */
         service
            .getMethod(testMethodUrl, testVersion, testParams, testWithCredentials)
            .subscribe((response: string) => {
               expect(response).toEqual(testResponse);
            });

         /* Assert */
         const testRequest: TestRequest = httpTestingController.expectOne(
            (request: HttpRequest<string>) =>
               request.url === `${apiUrl}/${testVersion}/${httpServiceUrl}/${testMethodUrl}`
         );

         expect(testRequest.request.method).toBe('GET');
         expect(testRequest.request.params.get('param1')).toBe('value1');
         expect(testRequest.request.withCredentials).toBe(true);

         testRequest.flush(testResponse);
      });

      it('should handle undefined params and withCredentials correctly', () => {
         /* Act */
         service.getMethod(testMethodUrl, testVersion).subscribe((response: string) => {
            expect(response).toEqual(testResponse);
         });

         /* Assert */
         const testRequest: TestRequest = httpTestingController.expectOne(
            `${apiUrl}/${testVersion}/${httpServiceUrl}/${testMethodUrl}`
         );

         expect(testRequest.request.method).toBe('GET');
         expect(testRequest.request.params.keys().length).toBe(0);
         expect(testRequest.request.withCredentials).toBe(false);

         testRequest.flush(testRequest);
      });
   });

   describe('post', () => {
      it('should call HttpClient.post with the correct endpoint URL, body, and Param options', () => {
         /* Act */
         service
            .postMethod(testMethodUrl, testVersion, testBody, testParams, testWithCredentials)
            .subscribe((response: string) => {
               expect(response).toEqual(testResponse);
            });

         /* Assert */
         const testRequest: TestRequest = httpTestingController.expectOne(
            (request: HttpRequest<string>) =>
               request.url === `${apiUrl}/${testVersion}/${httpServiceUrl}/${testMethodUrl}`
         );

         expect(testRequest.request.method).toBe('POST');
         expect(testRequest.request.body).toEqual(testBody);
         expect(testRequest.request.params.get('param1')).toBe('value1');
         expect(testRequest.request.withCredentials).toBe(true);

         testRequest.flush(testResponse);
      });
   });

   describe('put', () => {
      it('should call HttpClient.put with the correct endpoint URL, body and Param options', () => {
         /* Act */
         service
            .putMethod(testMethodUrl, testVersion, testBody, testParams, testWithCredentials)
            .subscribe((response: string) => {
               expect(response).toEqual(testResponse);
            });

         /* Assert */
         const testRequest: TestRequest = httpTestingController.expectOne(
            (request: HttpRequest<string>) =>
               request.url === `${apiUrl}/${testVersion}/${httpServiceUrl}/${testMethodUrl}`
         );

         expect(testRequest.request.method).toBe('PUT');
         expect(testRequest.request.body).toEqual(testBody);
         expect(testRequest.request.params.get('param1')).toBe('value1');
         expect(testRequest.request.withCredentials).toBe(true);

         testRequest.flush(testResponse);
      });
   });

   describe('patch', () => {
      it('should call HttpClient.patch with the correct endpoint URL, body and Param options', () => {
         /* Act */
         service
            .patchMethod(testMethodUrl, testVersion, testBody, testParams, testWithCredentials)
            .subscribe((response: string) => {
               expect(response).toEqual(testResponse);
            });

         /* Assert */
         const testRequest: TestRequest = httpTestingController.expectOne(
            (request: HttpRequest<string>) =>
               request.url === `${apiUrl}/${testVersion}/${httpServiceUrl}/${testMethodUrl}`
         );

         expect(testRequest.request.method).toBe('PATCH');
         expect(testRequest.request.body).toEqual(testBody);
         expect(testRequest.request.params.get('param1')).toBe('value1');
         expect(testRequest.request.withCredentials).toBe(true);

         testRequest.flush(testResponse);
      });
   });

   describe('delete', () => {
      it('should call HttpClient.delete with the correct endpoint URL and Param options', () => {
         /* Act */
         service
            .deleteMethod(testMethodUrl, testVersion, testParams, testWithCredentials)
            .subscribe((response: string) => {
               expect(response).toEqual(testResponse);
            });

         /* Assert */
         const testRequest: TestRequest = httpTestingController.expectOne(
            (request: HttpRequest<string>) =>
               request.url === `${apiUrl}/${testVersion}/${httpServiceUrl}/${testMethodUrl}`
         );

         expect(testRequest.request.method).toBe('DELETE');
         expect(testRequest.request.params.get('param1')).toBe('value1');
         expect(testRequest.request.withCredentials).toBe(true);

         testRequest.flush(testResponse);
      });
   });
});
