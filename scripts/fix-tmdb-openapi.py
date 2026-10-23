
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SPEC_FILE = ROOT / "openapi" / "tmdb.json"

# Define os corpos JSON reais das operações afetadas.
BODY_SCHEMAS = {
    "account-add-favorite": {
        "properties": {
            "media_type": {"type": "string"},
            "media_id": {"type": "integer"},
            "favorite": {"type": "boolean"},
        },
        "required": ["media_type", "media_id", "favorite"],
    },
    "account-add-to-watchlist": {
        "properties": {
            "media_type": {"type": "string"},
            "media_id": {"type": "integer"},
            "watchlist": {"type": "boolean"},
        },
        "required": ["media_type", "media_id", "watchlist"],
    },
    "authentication-create-session": {
        "properties": {
            "request_token": {"type": "string"},
        },
        "required": ["request_token"],
    },
    "authentication-create-session-from-v4-token": {
        "properties": {
            "access_token": {"type": "string"},
        },
        "required": ["access_token"],
    },
    "authentication-create-session-from-login": {
        "properties": {
            "username": {"type": "string"},
            "password": {"type": "string"},
            "request_token": {"type": "string"},
        },
        "required": ["username", "password", "request_token"],
    },
    "authentication-delete-session": {
        "properties": {
            "session_id": {"type": "string"},
        },
        "required": ["session_id"],
    },
    "list-add-movie": {
        "properties": {
            "media_id": {"type": "integer"},
        },
        "required": ["media_id"],
    },
    "list-create": {
        "properties": {
            "name": {"type": "string"},
            "description": {"type": "string"},
            "language": {"type": "string"},
        },
        "required": ["name", "description", "language"],
    },
    "list-remove-movie": {
        "properties": {
            "media_id": {"type": "integer"},
        },
        "required": ["media_id"],
    },
    "movie-add-rating": {
        "properties": {
            "value": {"type": "number"},
        },
        "required": ["value"],
    },
    "tv-series-add-rating": {
        "properties": {
            "value": {"type": "number"},
        },
        "required": ["value"],
    },
    "tv-episode-add-rating": {
        "properties": {
            "value": {"type": "number"},
        },
        "required": ["value"],
    },
}


def main():
    with SPEC_FILE.open(encoding="utf-8") as file:
        spec = json.load(file)

    operations = {
        operation.get("operationId"): operation
        for path_item in spec["paths"].values()
        for operation in path_item.values()
        if isinstance(operation, dict) and operation.get("operationId")
    }

    missing = set(BODY_SCHEMAS) - operations.keys()

    if missing:
        raise RuntimeError(
            f"Operações não encontradas na especificação: {sorted(missing)}"
        )

    changed = 0

    for operation_id, body_schema in BODY_SCHEMAS.items():
        operation = operations[operation_id]
        content = (
            operation.get("requestBody", {})
            .get("content", {})
            .get("application/json")
        )

        if content is None:
            raise RuntimeError(
                f"Corpo application/json não encontrado: {operation_id}"
            )

        content["schema"] = {
            "type": "object",
            **body_schema,
        }

        changed += 1

    with SPEC_FILE.open("w", encoding="utf-8") as file:
        json.dump(spec, file, ensure_ascii=False, indent=2)
        file.write("\n")

    print(f"Especificação corrigida: {changed} operações.")


if __name__ == "__main__":
    main()
