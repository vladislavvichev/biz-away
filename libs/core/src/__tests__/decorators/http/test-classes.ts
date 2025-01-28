// Test class that extends HttpService
import { HttpService } from '../../../lib';

export class TestClassExtendsHttpService extends HttpService {
   constructor() {
      super();
   }
}

// Another test class that extends HttpService
export class TestClassExtendsHttpService2 extends HttpService {
   constructor() {
      super();
   }
}

// Test class with properties and methods that extends HttpService
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
