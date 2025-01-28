import { ApiUrl, HttpServiceUrl } from '../../../lib';
import {
   TestClassExtendsHttpService,
   TestClassExtendsHttpService2,
   TestClassNoExtend,
   TestClassWithProperties
} from './test-classes';

describe('ApiUrl Decorator', () => {
   it('should assign apiUrl to a class extending HttpService', () => {
      /* Arrange */
      const testUrl: string = 'test';

      /* Act */
      ApiUrl(testUrl)(TestClassExtendsHttpService);

      /* Assert */
      expect((TestClassExtendsHttpService.prototype as any).apiUrl).toBe(testUrl);
      expect((TestClassExtendsHttpService.prototype as any).__apiUrlApplied__).toBe(true);
   });

   it('should throw error if applied to a class that does not extend HttpService', () => {
      /* Arrange */
      const testUrl: string = 'test';

      /* Assert */
      expect(() => ApiUrl(testUrl)(TestClassNoExtend as any)).toThrow(
         'TestClassNoExtend must extend HttpService in order to use ApiUrl Decorator'
      );
   });

   it('should not modify unrelated properties of the class', () => {
      /* Arrange */
      const testUrl: string = 'test';

      /* Act */
      ApiUrl(testUrl)(TestClassWithProperties);
      HttpServiceUrl('testHttpServiceUrl')(TestClassWithProperties);
      const testClassInstance: TestClassWithProperties = new TestClassWithProperties();

      /* Assert */
      expect(testClassInstance.testProperty).toBe('test');
      expect(testClassInstance.testMethod()).toBe('test');
      expect((TestClassWithProperties.prototype as any).apiUrl).toBe(testUrl);
      expect((TestClassWithProperties.prototype as any).__apiUrlApplied__).toBe(true);
   });

   it('should support multiple classes with different apiUrl values', () => {
      /* Arrange */
      const firstTestUrl: string = 'firstTestUrl';
      const secondTestUrl: string = 'secondTestUrl';

      /* Act */
      ApiUrl(firstTestUrl)(TestClassExtendsHttpService);
      ApiUrl(secondTestUrl)(TestClassExtendsHttpService2);

      /* Assert */
      expect((TestClassExtendsHttpService.prototype as any).apiUrl).toBe(firstTestUrl);
      expect((TestClassExtendsHttpService2.prototype as any).apiUrl).toBe(secondTestUrl);
   });
});
