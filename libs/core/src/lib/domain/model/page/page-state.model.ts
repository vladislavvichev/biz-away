import { SortDirection } from '../../enums';

export interface PageState {
   pageIndex: number;
   pageSize: number;
   sortOption?: string;
   sortDirection?: SortDirection;
}
