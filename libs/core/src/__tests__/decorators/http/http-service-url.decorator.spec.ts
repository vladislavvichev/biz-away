import { ApiUrl, HttpServiceUrl } from '../../../lib';
import {
   TestClassExtendsHttpService,
   TestClassExtendsHttpService2,
   TestClassNoExtend,
   TestClassWithProperties
} from './test-classes';

describe('HttpServiceUrl Decorator', () => {
   it('should assign httpServiceUrl to a class extending HttpService', () => {
      /* Arrange */
      const testUrl: string = 'test';

      /* Act */
      HttpServiceUrl(testUrl)(TestClassExtendsHttpService);

      /* Assert */
      expect((TestClassExtendsHttpService.prototype as any).httpServiceUrl).toBe(testUrl);
      expect((TestClassExtendsHttpService.prototype as any).__httpServiceUrlApplied__).toBe(true);
   });

   it('should throw error if applied to a class that does not extend HttpService', () => {
      /* Arrange */
      const testUrl: string = 'test';

      /* Assert */
      expect(() => HttpServiceUrl(testUrl)(TestClassNoExtend as any)).toThrow(
         'TestClassNoExtend must extend HttpService in order to use HttpServiceUrl Decorator'
      );
   });

   it('should not modify unrelated properties of the class', () => {
      /* Arrange */
      const testUrl: string = 'test';

      /* Act */
      ApiUrl('testApiUrl')(TestClassWithProperties);
      HttpServiceUrl(testUrl)(TestClassWithProperties);
      const testClassInstance: TestClassWithProperties = new TestClassWithProperties();

      /* Assert */
      expect(testClassInstance.testProperty).toBe('test');
      expect(testClassInstance.testMethod()).toBe('test');
      expect((TestClassWithProperties.prototype as any).httpServiceUrl).toBe(testUrl);
      expect((TestClassWithProperties.prototype as any).__httpServiceUrlApplied__).toBe(true);
   });

   it('should support multiple classes with different httpServiceUrl values', () => {
      /* Arrange */
      const firstTestUrl: string = 'firstTestUrl';
      const secondTestUrl: string = 'secondTestUrl';

      /* Act */
      HttpServiceUrl(firstTestUrl)(TestClassExtendsHttpService);
      HttpServiceUrl(secondTestUrl)(TestClassExtendsHttpService2);

      /* Assert */
      expect((TestClassExtendsHttpService.prototype as any).httpServiceUrl).toBe(firstTestUrl);
      expect((TestClassExtendsHttpService2.prototype as any).httpServiceUrl).toBe(secondTestUrl);
   });
});
