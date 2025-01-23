import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullScreenLayoutComponent } from '../../../lib';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
   template: `
      <biz-full-screen-layout>
         <h1>Content</h1>
      </biz-full-screen-layout>
   `,
   standalone: true,
   imports: [FullScreenLayoutComponent]
})
class TestComponent {}

describe('FullScreenLayoutComponent', () => {
   let fixture: ComponentFixture<TestComponent>;
   let component: TestComponent;
   let debugElement: DebugElement;

   beforeEach(async () => {
      await TestBed.configureTestingModule({}).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
   });

   it('should create', () => {
      /* Assert */
      expect(component).toBeTruthy();
   });

   it('should render the container', () => {
      /* Arrange */
      fixture.detectChanges();
      const container: DebugElement = debugElement.query(By.css('.w-screen.h-screen'));

      /* Assert */
      expect(container).toBeTruthy();
   });

   it('should render the content', () => {
      /* Arrange */
      fixture.detectChanges();
      const content: DebugElement = debugElement.query(By.css('h1'));

      /* Assert */
      expect(content.nativeElement.textContent).toEqual('Content');
   });
});
