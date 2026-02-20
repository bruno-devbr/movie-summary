import z from "zod";

export const UserCreateListSchema = z.object({
    name: z.string(),
    description: z.string(),
    language: z.literal("pt-BR"),
});
