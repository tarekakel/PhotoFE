export class PagingRequest {
  PageSize = 10;
  Page = 0;
  First: number = 0;
  Rows: number = 10;
}

export class Pagination {
  page: number;
  count: number;
  pageSize: number;
  pageSizes: number[];
  constructor(page: number, count: number, pageSize: number, pageSizes: number[]) {
    this.page = page;
    this.count = count;
    this.pageSize = pageSize;
    this.pageSizes = pageSizes;
  }
}


export const PAGING_OPTIONS = new Pagination(1, 0, 2, [2, 10, 25, 50, 75, 100]);
