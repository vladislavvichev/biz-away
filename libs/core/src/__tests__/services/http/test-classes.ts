// @ts-ignore
import { ApiUrl, HttpParamsObject, HttpService, HttpServiceUrl } from '../../../lib';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const apiUrl: string = 'apiUrl';
export const httpServiceUrl: string = 'httpServiceUrl';

// Test Class to be used for the test of HttpService
// @ts-ignore
@ApiUrl(apiUrl)
// @ts-ignore
@HttpServiceUrl(httpServiceUrl)
@Injectable({ providedIn: 'root' })
export class TestHttpService extends HttpService {
   constructor() {
      super();
   }

   public getMethod(
      url: string,
      version: string,
      params?: HttpParamsObject,
      withCredentials?: boolean
   ): Observable<string> {
      return this.get<string>(url, version, params, withCredentials);
   }

   public postMethod(
      url: string,
      version: string,
      body: any,
      params?: HttpParamsObject,
      withCredentials?: boolean
   ): Observable<string> {
      return this.post<string>(url, version, body, params, withCredentials);
   }

   public putMethod(
      url: string,
      version: string,
      body: any,
      params?: HttpParamsObject,
      withCredentials?: boolean
   ): Observable<string> {
      return this.put<string>(url, version, body, params, withCredentials);
   }

   public patchMethod(
      url: string,
      version: string,
      body: any,
      params?: HttpParamsObject,
      withCredentials?: boolean
   ): Observable<string> {
      return this.patch<string>(url, version, body, params, withCredentials);
   }

   public deleteMethod(
      url: string,
      version: string,
      params?: HttpParamsObject,
      withCredentials?: boolean
   ): Observable<string> {
      return this.delete<string>(url, version, params, withCredentials);
   }
}

// Test Class without any decorators
@Injectable({ providedIn: 'root' })
export class TestServiceWithoutDecorators extends HttpService {
   constructor() {
      super();
   }
}

// Test Class with only the ApiUrl decorator
// @ts-ignore
@ApiUrl(apiUrl)
@Injectable({ providedIn: 'root' })
export class TestServiceWithApiUrl extends HttpService {
   constructor() {
      super();
   }
}

// Test Class with ApiUrl decorator with empty value
// @ts-ignore
@ApiUrl('')
// @ts-ignore
@HttpServiceUrl(httpServiceUrl)
@Injectable({ providedIn: 'root' })
export class TestServiceWithApiUrlEmpty extends HttpService {
   constructor() {
      super();
   }
}

// Test Class with HttpServiceUrl decorator with empty value
// @ts-ignore
@ApiUrl(apiUrl)
// @ts-ignore
@HttpServiceUrl('')
@Injectable({ providedIn: 'root' })
export class TestServiceWithHttpServiceUrlEmpty extends HttpService {
   constructor() {
      super();
   }
}
