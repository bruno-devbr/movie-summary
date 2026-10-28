export interface MediaListInterface {
    page: number;
    results?:
        | {
              id: number;
              poster_path?: string | undefined;
              release_date?: string | undefined;
              title?: string | undefined;
          }[]
        | undefined;
    total_pages: number;
    total_results: number;
}
