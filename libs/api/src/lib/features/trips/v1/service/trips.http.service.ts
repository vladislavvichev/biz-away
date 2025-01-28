import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TripDto } from '../dto';
import { PageDto } from '../../../../shared';
import { ApiUrl, HttpParamsObject, HttpService, HttpServiceUrl } from '@biz-away/core';
import { environment } from '../../../../../environments/environment.dev';

@ApiUrl(environment.apiUrl)
@HttpServiceUrl('trips')
@Injectable({ providedIn: 'root' })
export class TripsHttpService extends HttpService {
   constructor() {
      super();
   }

   public search(searchParams: HttpParamsObject): Observable<PageDto<TripDto>> {
      return this.get<PageDto<TripDto>>('', 'v1', searchParams);
   }
}
