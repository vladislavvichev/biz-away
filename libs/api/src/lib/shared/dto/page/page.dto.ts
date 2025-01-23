export interface PageDto<T> {
   items: T[];
   limit: number;
   page: number;
   total: number;
}
