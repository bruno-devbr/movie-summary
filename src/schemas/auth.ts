import z from "zod";

export const CreateSessionSchema = z.object({
    request_token: z.string(),
});
