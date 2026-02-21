import z from "zod";

export const CreateSessionIdBodySchema = z.object({
    request_token: z.string(),
});
