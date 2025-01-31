import { PageState, PageStatus, SortDirection } from '../../domain';
import { computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../../services';

// TODO: Add Documentation & Unit Tests
export abstract class PageStateManager<T, U> {
   // region<Dependency Injection>
   private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
   // endregion

   // region<Page State Signals>
   private _pageState: WritableSignal<PageState>;

   protected pageIndex: Signal<number> = computed(() => this._pageState().pageIndex);
   protected pageSize: Signal<number> = computed(() => this._pageState().pageSize);
   protected sortOption: Signal<string | undefined> = computed(() => this._pageState().sortOption);
   protected sortDirection: Signal<SortDirection | undefined> = computed(() => this._pageState().sortDirection);
   protected search: Signal<string | undefined> = computed(() => this._pageState().search);
   // endregion

   // region<Filter Signals>
   private _filter: WritableSignal<U | undefined> = signal<U | undefined>(undefined);
   // endregion

   // region<Items Signals>
   private _items: WritableSignal<T[]> = signal<T[]>([]);
   private _totalItems: WritableSignal<number> = signal<number>(0);
   private _status: WritableSignal<PageStatus> = signal<PageStatus>(PageStatus.LOADING);
   // endregion

   // region<State Change>
   private _stateChangeSubject$: Subject<void> = new Subject<void>();
   // endregion

   private readonly _storeId: string | undefined;

   protected constructor(storeId?: string) {
      this._storeId = storeId;

      const savedState: PageState | null = storeId ? this.localStorageService.get(storeId) : null;

      this._pageState = signal<PageState>(
         {
            ...this.initialState,
            sortOption: savedState?.sortOption ?? undefined,
            sortDirection: savedState?.sortDirection ?? undefined
         } ?? this.initialState
      );
   }

   // region<Getters & Setters>
   protected get filter(): Signal<U | undefined> {
      return this._filter.asReadonly();
   }

   protected get items(): Signal<T[]> {
      return this._items.asReadonly();
   }

   protected get totalItems(): Signal<number> {
      return this._totalItems.asReadonly();
   }

   protected get status(): Signal<PageStatus> {
      return this._status.asReadonly();
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
      if (this._storeId) {
         this.saveStateInStorage(this._storeId, {
            sortOption,
            sortDirection: this.sortDirection() ?? SortDirection.ASC
         });
      }

      this.updateStateAndNotifyChange({ sortOption }, true);
   }

   protected updateSortDirection(sortDirection: SortDirection): void {
      if (this._storeId) {
         this.saveStateInStorage(this._storeId, { sortOption: this.sortOption(), sortDirection });
      }

      this.updateStateAndNotifyChange({ sortDirection }, true);
   }

   protected updateSearch(search: string | undefined): void {
      this.updateStateAndNotifyChange({ search }, true);
   }

   private updateStateAndNotifyChange(newState: Partial<PageState>, resetPageNumber: boolean = false): void {
      if (resetPageNumber) {
         this._pageState.update((currentState: PageState) => ({ ...currentState, ...newState, pageIndex: 0 }));
      } else {
         this._pageState.update((currentState: PageState) => ({ ...currentState, ...newState }));
      }

      this._stateChangeSubject$.next();
   }

   private saveStateInStorage(key: string, newState: Partial<PageState>): void {
      this.localStorageService.update<Partial<PageState>>(key, newState);
   }

   // endregion

   // region<Filter Update Methods>

   protected updateFilter(filter: U | undefined): void {
      this._filter.set(filter);

      this._pageState.update((currentState: PageState) => ({ ...currentState, pageIndex: 0 }));

      this._stateChangeSubject$.next();
   }

   // endregion

   // region<Items Update Methods>

   protected updateItems(items: T[]): void {
      this._items.set([...items]);
   }

   protected updateTotalItems(totalItems: number): void {
      this._totalItems.set(totalItems);
   }

   protected updateStatus(status: PageStatus): void {
      this._status.set(status);
   }

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
