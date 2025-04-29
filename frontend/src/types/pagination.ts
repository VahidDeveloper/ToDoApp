export interface UrlParams {
    pagination: PaginationParams,
    sort: SortParams,
    search: string,
    trashed: boolean,
    querySearch: string
}

export interface PaginationParams {
    page: number,
    size: number,
}

export interface SortParams {
    key: string,
    mode: 'asc' | 'desc',
}