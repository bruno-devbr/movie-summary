// --- Token Types ---
export interface TokenProps {
    request_token: string;
    success: boolean;
    expires_at: string;
}

// --- Session Types ---
export interface SessionProps {
    session_id: string;
}
