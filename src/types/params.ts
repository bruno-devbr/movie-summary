export interface ApiRouteContext {
    params: Promise<{ list_id: string }>;
}

export interface ApiRouteParams {
    list_id: number;
}
