import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParamsObject } from '../../domain';

/**
 * Abstract base class designed to provide a framework for interacting between `HttpServices` and REST APIs.
 * It enforces strict structure and configuration through decorators such as `ApiUrl` and `HttpServiceUrl`
 * that must be applied in derived classes. These configurations define the API structure, ensures proper setup,
 * and validates the presence of required elements at runtime.
 *
 * Core features include the ability to send HTTP requests for common methods like GET, POST, PUT, PATCH, and DELETE.
 * The URL for each request is dynamically constructed based on defined API URLs, service-specific paths, and optional
 * query parameters or request bodies. All HTTP functionality utilizes Angular's `HttpClient`.
 *
 * The flow and requirements for using the class are:
 * - Derived `HttpService` classes inherit from `HttpService`.
 * - The `apiUrl` and `httpServiceUrl` are applied to the derived `HttpService` class.
 */
export abstract class HttpService {
   // region<Dependency Injection>
   private readonly httpClient: HttpClient = inject(HttpClient);
   // endregion

   private readonly apiUrl!: string;
   private readonly httpServiceUrl!: string;

   protected constructor() {
      /* Obtain the Child class that inherits HttpService. */
      const childPrototype: any = Object.getPrototypeOf(this);

      /* Validate that the Child class has the `ApiUrl` decorator applied. */
      if (!(childPrototype as any).__apiUrlApplied__) {
         throw new Error(`The ApiUrl decorator is missing on the class '${this.constructor.name}'.`);
      }

      /* Validate that the Child class has the `HttpServiceUrl` decorator applied. */
      if (!(childPrototype as any).__httpServiceUrlApplied__) {
         throw new Error(`The HttpServiceUrl decorator is missing on the class '${this.constructor.name}'.`);
      }

      /* Validate that `apiUrl` is set */
      if (!this.apiUrl) {
         throw new Error(`The 'apiUrl' property is not set for the class '${this.constructor.name}'.`);
      }

      /* Validate that `httpServiceUrl` is set */
      if (!this.httpServiceUrl) {
         throw new Error(`The 'httpServiceUrl' property is not set for the class '${this.constructor.name}'.`);
      }
   }

   /**
    * @description - Sends a GET request to a URL constructed as `{API_URL}/{VERSION}/{SERVICE_URL}/{METHOD_URL}` and
    *                returns an Observable of the provided Type.
    *                Only the `{VERSION}` and `{METHOD_URL}` are provided when calling this method and `{API_URL}` and
    *                `{SERVICE_URL}` are provided by the configuration of the **Child** that inherits `HttpService`.
    *
    * @param methodUrl - The endpoint URL (`{METHOD_URL}`) for the GET request.
    * @param version - The API version (`{VERSION}`) to include in the GET request URL.
    * @param [paramsObject] - Optional HTTP Query Parameters to include in the GET request.
    * @param [withCredentials] - Whether the request should include credentials. Defaults to false.
    * @return An Observable of Type `T` representing the HTTP response.
    */
   protected get<T>(
      methodUrl: string,
      version: string,
      paramsObject?: HttpParamsObject,
      withCredentials?: boolean
   ): Observable<T> {
      const fullUrl = `${this.apiUrl}/${version}/${this.httpServiceUrl}/${methodUrl}`;

      return this.httpClient.get<T>(fullUrl, {
         params: this.getHttpParams(paramsObject),
         withCredentials: withCredentials ?? false
      });
   }

   /**
    * @description - Sends a POST request to a URL constructed as `{API_URL}/{VERSION}/{SERVICE_URL}/{METHOD_URL}` with
    *                the provided body and returns an Observable of the provided Type.
    *                Only the `{VERSION}` and `{METHOD_URL}` are provided when calling this method and `{API_URL}` and
    *                `{SERVICE_URL}` are provided by the configuration of the **Child** that inherits `HttpService`.
    *
    * @param methodUrl - The endpoint URL (`{METHOD_URL}`) for the POST request.
    * @param version - The API version (`{VERSION}`) to include in the POST request URL.
    * @param body - The Body to include in the POST request.
    * @param [paramsObject] - Optional HTTP Query Parameters to include in the POST request.
    * @param [withCredentials] - Whether the request should include credentials. Defaults to false.
    * @return An Observable of Type `T` representing the HTTP response.
    */
   protected post<T>(
      methodUrl: string,
      version: string,
      body: any | null,
      paramsObject?: HttpParamsObject,
      withCredentials?: boolean
   ): Observable<T> {
      const fullUrl = `${this.apiUrl}/${version}/${this.httpServiceUrl}/${methodUrl}`;

      return this.httpClient.post<T>(fullUrl, body, {
         params: this.getHttpParams(paramsObject),
         withCredentials: withCredentials ?? false
      });
   }

   /**
    * @description - Sends a PUT request to a URL constructed as `{API_URL}/{VERSION}/{SERVICE_URL}/{METHOD_URL}` with
    *                the provided body and returns an Observable of the provided Type.
    *                Only the `{VERSION}` and `{METHOD_URL}` are provided when calling this method and `{API_URL}` and
    *                `{SERVICE_URL}` are provided by the configuration of the **Child** that inherits `HttpService`.
    *
    * @param methodUrl - The endpoint URL (`{METHOD_URL}`) for the PUT request.
    * @param version - The API version (`{VERSION}`) to include in the PUT request URL.
    * @param body - The Body to include in the PUT request.
    * @param [paramsObject] - Optional HTTP Query Parameters to include in the PUT request.
    * @param [withCredentials] - Whether the request should include credentials. Defaults to false.
    * @return An Observable of Type `T` representing the HTTP response.
    */
   protected put<T>(
      methodUrl: string,
      version: string,
      body: any | null,
      paramsObject?: HttpParamsObject,
      withCredentials?: boolean
   ): Observable<T> {
      const fullUrl = `${this.apiUrl}/${version}/${this.httpServiceUrl}/${methodUrl}`;

      return this.httpClient.put<T>(fullUrl, body, {
         params: this.getHttpParams(paramsObject),
         withCredentials: withCredentials ?? false
      });
   }

   /**
    * @description - Sends a PATCH request to a URL constructed as `{API_URL}/{VERSION}/{SERVICE_URL}/{METHOD_URL}` with
    *                the provided body and returns an Observable of the provided Type.
    *                Only the `{VERSION}` and `{METHOD_URL}` are provided when calling this method and `{API_URL}` and
    *                `{SERVICE_URL}` are provided by the configuration of the **Child** that inherits `HttpService`.
    *
    * @param methodUrl - The endpoint URL (`{METHOD_URL}`) for the PATCH request.
    * @param version - The API version (`{VERSION}`) to include in the PATCH request URL.
    * @param body - The Body to include in the PATCH request.
    * @param [paramsObject] - Optional HTTP Query Parameters to include in the PATCH request.
    * @param [withCredentials] - Whether the request should include credentials. Defaults to false.
    * @return An Observable of Type `T` representing the HTTP response.
    */
   protected patch<T>(
      methodUrl: string,
      version: string,
      body: any | null,
      paramsObject?: HttpParamsObject,
      withCredentials?: boolean
   ): Observable<T> {
      const fullUrl = `${this.apiUrl}/${version}/${this.httpServiceUrl}/${methodUrl}`;

      return this.httpClient.patch<T>(fullUrl, body, {
         params: this.getHttpParams(paramsObject),
         withCredentials: withCredentials ?? false
      });
   }

   /**
    * @description - Sends a DELETE request to a URL constructed as `{API_URL}/{VERSION}/{SERVICE_URL}/{METHOD_URL}` and
    *                returns an Observable of the provided Type.
    *                Only the `{VERSION}` and `{METHOD_URL}` are provided when calling this method and `{API_URL}` and
    *                `{SERVICE_URL}` are provided by the configuration of the **Child** that inherits `HttpService`.
    *
    * @param methodUrl - The endpoint URL (`{METHOD_URL}`) for the DELETE request.
    * @param version - The API version (`{VERSION}`) to include in the DELETE request URL.
    * @param [paramsObject] - Optional HTTP Query Parameters to include in the DELETE request.
    * @param [withCredentials] - Whether the request should include credentials. Defaults to false.
    * @return An Observable of Type `T` representing the HTTP response.
    */
   protected delete<T>(
      methodUrl: string,
      version: string,
      paramsObject?: HttpParamsObject,
      withCredentials?: boolean
   ): Observable<T> {
      const fullUrl = `${this.apiUrl}/${version}/${this.httpServiceUrl}/${methodUrl}`;

      return this.httpClient.delete<T>(fullUrl, {
         params: this.getHttpParams(paramsObject),
         withCredentials: withCredentials ?? false
      });
   }

   private getHttpParams(paramsObject: HttpParamsObject | undefined): HttpParams | undefined {
      return paramsObject ? new HttpParams({ fromObject: paramsObject }) : undefined;
   }
}
