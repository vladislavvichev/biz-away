// Test class that extends HttpService
import { HttpService } from '../../../lib';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TestClassExtendsHttpService extends HttpService {
   constructor() {
      super();
   }
}

// Another test class that extends HttpService
@Injectable({ providedIn: 'root' })
export class TestClassExtendsHttpService2 extends HttpService {
   constructor() {
      super();
   }
}

// Test class with properties and methods that extends HttpService
@Injectable({ providedIn: 'root' })
export class TestClassWithProperties extends HttpService {
   public testProperty: string = 'test';

   public testMethod(): string {
      return 'test';
   }

   constructor() {
      super();
   }
}

// Test class that doesn't extend HttpService
export class TestClassNoExtend {}
