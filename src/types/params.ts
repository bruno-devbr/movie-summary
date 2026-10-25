export interface ApiRouteContext {
    params: Promise<{ item_id: string; season_number?: string }>;
}

export interface ApiRouteParams {
    item_id: number;
    season_number?: number;
}
