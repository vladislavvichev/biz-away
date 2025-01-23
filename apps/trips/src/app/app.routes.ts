import { Route } from '@angular/router';

export const appRoutes: Route[] = [
   /* MAIN ENTRY */
   {
      path: '',
      redirectTo: 'trips',
      pathMatch: 'full'
   },

   {
      path: 'trips',
      loadComponent: () => import('./features/trips-list/trips-list.component').then((c) => c.TripsListComponent)
   }
];
