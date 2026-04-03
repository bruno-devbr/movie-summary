export interface ParamsProps {
    media_id: number;
}

export interface ContextProps {
    params: Promise<ParamsProps>;
}
