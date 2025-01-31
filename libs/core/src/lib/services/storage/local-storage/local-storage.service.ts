import { Injectable } from '@angular/core';

// TODO: Add Documentation and Unit Tests.
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
   /**
    * @description - Retrieves a value from **localStorage** associated with the provided `key`.
    *
    * @param key - The `key`.
    * @returns The parsed value stored in localStorage if it exists, or null if the key does not exist or if the value
    *          cannot be parsed.
    */
   public get<T>(key: string): T | null {
      const item: unknown = localStorage.getItem(key);

      /* If the item exists */
      if (typeof item === 'string') {
         try {
            return JSON.parse(item) as T;
         } catch (error) {
            console.error(`Failed to parse localStorage item: "${key}": `, error);
            return null;
         }
      }

      return null;
   }

   /**
    * @description - Adds a **Value** to **localStorage** by associating it to the provided `key`.
    *
    * @param key - The `key`.
    * @param value - The **Value**.
    */
   public add<T>(key: string, value: T): void {
      try {
         localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
         console.error(`Failed to store item with key: "${key}": `, error);
      }
   }

   /**
    * @description - Deletes an **Item** from **localStorage** using the provide `key`.
    *
    * @param key - The `key`.
    */
   public delete(key: string): void {
      localStorage.removeItem(key);
   }

   /**
    * @description - Updates an **Item** from **localStorage** using the provide `key` and **Value**.
    *                If the `key` exists, its **Value** is replaced, otherwise the **Value** is added.
    *
    * @param key - The `key`.
    * @param value - The **Value**.
    */
   public update<T>(key: string, value: T): void {
      this.add(key, value);
   }

   /**
    * @description - Clears **localStorage**.
    */
   public clear(): void {
      localStorage.clear();
   }
}
