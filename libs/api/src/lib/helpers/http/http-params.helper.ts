import { HttpParamsObject } from '@biz-away/core';
import { SearchParamsDto } from '../../shared';

export abstract class HttpParamsHelper {
   // TODO: Add documentation and unit tests
   public static fromSearchParams(searchParams: SearchParamsDto): HttpParamsObject {
      const httpParams: HttpParamsObject = {};

      for (const [key, value] of Object.entries(searchParams)) {
         if (value != null) {
            let parsedValue: string;

            if (typeof value === 'string') {
               parsedValue = value;
            } else if (typeof value === 'number' || typeof value === 'boolean') {
               parsedValue = value.toString();
            } else if (Array.isArray(value)) {
               parsedValue = value.join(',');
            } else if (typeof value === 'object') {
               // TODO: Implement
               parsedValue = JSON.stringify(value);
            } else {
               throw new Error(`Invalid value type: ${typeof value}`);
            }

            httpParams[key] = parsedValue;
         }
      }

      return httpParams;
   }
}
