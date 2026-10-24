import { ApiRouteContext, ApiRouteParams } from "@/types/params";
import { AppError } from "@/lib/api/errors";

export async function getParams({ params }: ApiRouteContext): Promise<ApiRouteParams> {
    const { item_id: itemIdParam } = await params;
    const item_id = Number(itemIdParam);

    if (!Number.isInteger(item_id) || item_id <= 0) {
        throw new AppError("Id do item inválido", "INVALID_ITEM_ID", 400);
    }

    return {
        item_id,
    };
}
