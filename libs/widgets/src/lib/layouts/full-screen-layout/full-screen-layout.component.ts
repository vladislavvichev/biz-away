import { Component } from '@angular/core';

@Component({
   selector: 'biz-full-screen-layout',
   template: `
      <div class="w-full h-screen">
         <ng-content />
      </div>
   `,
   styles: ``,
   standalone: true
})
export class FullScreenLayoutComponent {}
