import z from "zod";

export const TokenSchema = z.object({
    request_token: z.string(),
});

export const SessionIdSchema = z.object({
    success: z.boolean(),
    session_id: z.string(),
});
