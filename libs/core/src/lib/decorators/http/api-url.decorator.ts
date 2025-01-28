import { HttpService } from '../../services';

/**
 * @description - A decorator that assigns an Api Url (`apiUrl`) to a class that extends `HttpService`.
 *                Moreover, it also ensures the target class inherits from `HttpService`.
 *
 * @param apiUrl - The Api Url to be assigned to the target class.
 * @return A class decorator which modifies the target class to include the `apiUrl` property.
 * @throws Error when the target class does not extend `HttpService`.
 */
export function ApiUrl(apiUrl: string) {
   return function <T extends new (...args: any[]) => HttpService>(target: T): void {
      // Check that the `Class` the `Decorator` is applied to inherits `HttpService`.
      if (!HttpService.prototype.isPrototypeOf(target.prototype)) {
         throw new Error(`${target.name} must extend HttpService in order to use ApiUrl Decorator`);
      }

      /* Set apiUrl */
      (target.prototype as any).apiUrl = apiUrl;

      /* Set __apiUrlApplied__ mark so that `HttpService` can check if its descendant has the `ApiUrl` decorator applied. */
      (target.prototype as any).__apiUrlApplied__ = true;
   };
}
