import { ApiRouteContext, ApiRouteParams } from "@/types/params";
import { AppError } from "@/lib/api/errors";

export async function getParams({
    params,
}: ApiRouteContext): Promise<ApiRouteParams> {
    const { item_id: itemIdParam, season_number: seasonNumParam } =
        await params;

    const item_id = Number(itemIdParam);
    const season_number =
        seasonNumParam === undefined ? undefined : Number(seasonNumParam);

    if (!Number.isInteger(item_id) || item_id <= 0) {
        throw new AppError("Id do item inválido", "INVALID_ITEM_ID", 400);
    }

    if (
        season_number !== undefined &&
        (!Number.isInteger(season_number) || season_number < 0)
    ) {
        throw new AppError(
            "Número da temporada inválido",
            "INVALID_SEASON_NUMBER",
            400,
        );
    }

    return {
        item_id,
        season_number,
    };
}
