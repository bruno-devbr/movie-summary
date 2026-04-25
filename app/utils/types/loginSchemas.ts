import z from "zod";

export const TokenBodySchema = z.object({ request_token: z.string() });

export const SessionIdDataSchema = z.object({
    success: z.boolean(),
    session_id: z.string(),
});
