export interface ApiRouteContext {
    params: Promise<{ item_id: string }>;
}

export interface ApiRouteParams {
    item_id: number;
}
