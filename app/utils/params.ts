import { ParamsProps } from "./types/params";

export async function getParams(context: {
    params: ParamsProps;
}): Promise<ParamsProps> {
    const params = await context.params;
    return { ...params };
}
