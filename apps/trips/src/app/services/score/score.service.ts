import { Injectable } from '@angular/core';
import { Score } from '../../domain';

@Injectable({ providedIn: 'root' })
export class ScoreService {
   private readonly _cache: Map<string, Score> = new Map();
   private readonly _cacheLimit: number = 100;

   /**
    * @description - Calculates a **Score** based on **CO2 Emission**, **Rating**, and **Total Ratings**.
    *                Implements **memoization** to improve performance, and uses **Least Recently Used (LRU)** strategy
    *                to manage the **Cache** size.
    *
    * @param co2 - The **CO2 Emission**.
    * @param rating - The **Rating**.
    * @param totalRatings - The **Total Ratings**.
    * @returns The calculated **Score**.
    */
   public calculateScore(co2: number, rating: number, totalRatings: number): Score {
      /* Create a unique key for the Cache */
      const key: string = `${co2}-${rating}-${totalRatings}`;

      /* Check if the Score is already in the Cache */
      if (this._cache.has(key)) {
         const value: Score = this._cache.get(key)!;

         /* Move the Score to the most recently used position */
         this._cache.delete(key);
         this._cache.set(key, value);

         return value;
      }

      /* If the Score is not in the Cache, calculate it */
      let score: Score;

      if (co2 <= 200 && rating >= 4 && totalRatings > 100) {
         score = Score.AWESOME;
      } else if (co2 <= 500 && rating >= 3 && totalRatings > 50) {
         score = Score.GOOD;
      } else {
         score = Score.AVERAGE;
      }

      /* Save the calculated Score in the Cache */
      this._cache.set(key, score);

      /* Apply Least Recently Used logic to the Cache */
      if (this._cache.size > this._cacheLimit) {
         /* Obtain the oldest key (in the first position, since it has been inserted first) */
         const oldestKey: string = this._cache.keys().next().value;

         /* Remove the Least Recently Used Score */
         this._cache.delete(oldestKey);
      }

      return score;
   }
}
