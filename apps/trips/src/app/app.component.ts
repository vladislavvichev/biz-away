import { Component } from '@angular/core';
import { APP_IMPORTS } from './app.imports';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es');

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
   imports: APP_IMPORTS,
   standalone: true
})
export class AppComponent {
   public title: string = 'trips';
}
