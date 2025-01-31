import { Route } from '@angular/router';

export const appRoutes: Route[] = [
   /* MAIN ENTRY */
   {
      path: '',
      redirectTo: 'trips',
      pathMatch: 'full'
   },

   /* TRIPS - LIST */
   {
      path: 'trips',
      loadComponent: () => import('./features/trips-list/trips-list.component').then((c) => c.TripsListComponent)
   },

   /* TRIPS - DETAIL */
   {
      path: 'trip/:id',
      loadComponent: () => import('./features/trips-detail/trips-detail.component').then((c) => c.TripsDetailComponent)
   },

   /* WILDCARD ROUTE */
   {
      path: '**',
      redirectTo: 'trips',
      pathMatch: 'full'
   }
];
