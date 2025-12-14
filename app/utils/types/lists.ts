// --- Account/User Types ---

export interface CreateListBody {
    name: string;
    description: string;
    language: string;
}

export interface CreateListResponse {
    success: boolean;
    status_code: number;
    status_message: string;
    list_id: number;
}

export interface ListResponse {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface Result {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: string;
    name: string;
    poster_path: null;
}

export interface UserList {
    created_by: string;
    description: string;
    favorite_count: number;
    id: number;
    iso_639_1: string;
    item_count: number;
    items: [];
    name: string;
    page: number;
    poster_path: null;
    total_pages: number;
    total_results: number;
}

export interface UserListBody {
    media_id: number;
}
