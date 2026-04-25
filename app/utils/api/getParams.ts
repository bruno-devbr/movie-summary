import { ContextProps, ParamsProps } from "../types/params";

export async function getParams(context: ContextProps): Promise<ParamsProps> {
    return context.params;
}
