import { Component } from '@angular/core';

@Component({
   selector: 'biz-full-screen-layout',
   template: `
      <div class="flex w-screen h-screen">
         <ng-content />
      </div>
   `,
   styles: ``,
   standalone: true
})
export class FullScreenLayoutComponent {}
