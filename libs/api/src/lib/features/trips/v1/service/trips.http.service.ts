import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TripDto } from '../dto';
import { PageDto, SearchParamsDto } from '../../../../shared';

@Injectable({ providedIn: 'root' })
export class TripsHttpService {
   // region<Dependency Injection>
   private readonly httpClient: HttpClient = inject(HttpClient);
   // endregion

   public search(searchParams: SearchParamsDto): Observable<PageDto<TripDto>> {
      const params: HttpParams = new HttpParams()
         .set('page', searchParams.page.toString())
         .set('limit', searchParams.limit.toString());

      return this.httpClient.get<PageDto<TripDto>>(
         'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips',
         {
            params
         }
      );
   }
}
