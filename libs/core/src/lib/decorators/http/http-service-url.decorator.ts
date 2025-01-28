import { HttpService } from '../../services';

/**
 * @description - A decorator that assigns an HTTP Service Url (`httpServiceUrl`) to a class that extends `HttpService`.
 *                Moreover, it also ensures the target class inherits from `HttpService`.
 *
 * @param httpServiceUrl - The HTTP Service Url to be assigned to the target class.
 * @return A class decorator which modifies the target class to include the `httpServiceUrl` property.
 * @throws Error when the target class does not extend `HttpService`.
 */
export function HttpServiceUrl(httpServiceUrl: string) {
   return function <T extends new (...args: any[]) => HttpService>(target: T): void {
      // Check that the `Class` the `Decorator` is applied to inherits `HttpService`.
      if (!HttpService.prototype.isPrototypeOf(target.prototype)) {
         throw new Error(`${target.name} must extend HttpService in order to use HttpServiceUrl Decorator`);
      }

      /* Set httpServiceUrl */
      (target.prototype as any).httpServiceUrl = httpServiceUrl;

      /* Set __httpServiceUrlApplied__ mark so that `HttpService` can check if its descendant has the `HttpServiceUrl`
       * decorator applied. */
      (target.prototype as any).__httpServiceUrlApplied__ = true;
   };
}
