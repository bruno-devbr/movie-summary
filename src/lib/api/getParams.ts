import { ApiRouteContext, ApiRouteParams } from "@/types/params";
import { AppError } from "@/lib/api/errors";

export async function getParams({ params }: ApiRouteContext): Promise<ApiRouteParams> {
    const { list_id: listIdParam } = await params;
    const list_id = Number(listIdParam);

    if (!Number.isInteger(list_id) || list_id <= 0) {
        throw new AppError("Id da lista invalido", "INVALID_LIST_ID", 400);
    }

    return {
        list_id,
    };
}
