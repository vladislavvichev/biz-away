import { PageState, SortDirection } from '../../domain';
import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// TODO: Add Documentation & Unit Tests
export abstract class PageStateManager<T> {
   // region<Page State Signals>
   private _pageState: WritableSignal<PageState> = signal<PageState>(this.initialState);

   protected pageIndex: Signal<number> = computed(() => this._pageState().pageIndex);
   protected pageSize: Signal<number> = computed(() => this._pageState().pageSize);
   protected sortOption: Signal<string | undefined> = computed(() => this._pageState().sortOption);
   protected sortDirection: Signal<SortDirection | undefined> = computed(() => this._pageState().sortDirection);
   // endregion

   // region<Items Signals>
   private _items: WritableSignal<T[]> = signal<T[]>([]);
   private _totalItems: WritableSignal<number> = signal<number>(0);
   // endregion

   // region<State Change>
   private _stateChangeSubject$: Subject<void> = new Subject<void>();
   // endregion

   protected constructor() {}

   // region<Getters & Setters>
   protected get items(): Signal<T[]> {
      return this._items.asReadonly();
   }

   protected get totalItems(): Signal<number> {
      return this._totalItems.asReadonly();
   }

   protected get stateChange$(): Observable<void> {
      return this._stateChangeSubject$.asObservable();
   }
   // endregion

   // region<Page State Update Methods>
   protected updatePageIndex(pageIndex: number): void {
      this.updateStateAndNotifyChange({ pageIndex });
   }

   protected updatePageSize(pageSize: number): void {
      this.updateStateAndNotifyChange({ pageSize });
   }

   protected updateSortOption(sortOption: string | undefined): void {
      this.updateStateAndNotifyChange({ sortOption }, true);
   }

   protected updateSortDirection(sortDirection: SortDirection): void {
      this.updateStateAndNotifyChange({ sortDirection }, true);
   }

   private updateStateAndNotifyChange(newState: Partial<PageState>, resetPageNumber: boolean = false): void {
      if (resetPageNumber) {
         this._pageState.update((currentState: PageState) => ({ ...currentState, ...newState, pageIndex: 0 }));
      } else {
         this._pageState.update((currentState: PageState) => ({ ...currentState, ...newState }));
      }

      this._stateChangeSubject$.next();
   }

   // region<Items Update Methods>

   protected updateItems(items: T[]): void {
      this._items.set([...items]);
   }

   protected updateTotalItems(totalItems: number): void {
      this._totalItems.set(totalItems);
   }

   // endregion

   // endregion

   // region<Other Methods>
   private get initialState(): PageState {
      return {
         pageIndex: 0,
         pageSize: 10
      };
   }
   // endregion
}
