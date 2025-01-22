import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [AppComponent],
         providers: [provideRouter([])]
      }).compileComponents();
   });

   it(`should have as title 'trips'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('trips');
   });
});
