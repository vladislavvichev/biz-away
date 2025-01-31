import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LOADING_SPINNER_IMPORTS } from './loading-spinner.imports';

@Component({
   selector: 'biz-loading-spinner',
   templateUrl: './loading-spinner.component.html',
   styleUrl: './loading-spinner.component.scss',
   imports: LOADING_SPINNER_IMPORTS,
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class LoadingSpinnerComponent {}
