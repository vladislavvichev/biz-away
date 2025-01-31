import { Component, inject, OnDestroy } from '@angular/core';
import { APP_IMPORTS } from './app.imports';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { LocalStorageService } from '@biz-away/core';

registerLocaleData(localeEs, 'es');

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
   imports: APP_IMPORTS,
   standalone: true
})
export class AppComponent implements OnDestroy {
   // region<Dependency Injection>
   private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
   // endregion

   public title: string = 'trips';

   constructor() {
      this.localStorageService.clear();
   }

   ngOnDestroy(): void {
      this.localStorageService.clear();
   }
}
