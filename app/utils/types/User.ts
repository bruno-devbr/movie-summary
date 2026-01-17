import z from "zod";

export const UserSchema = z.object({
    avatar: z
        .object({
            gravatar: z.object({ hash: z.string() }),
            tmdb: z.object({ avatar_path: z.string().nullable() }),
        })
        .transform((avatar) =>
            avatar.tmdb.avatar_path
                ? `https://image.tmdb.org/t/p/w185/${avatar.tmdb.avatar_path}.jpg`
                : `https://gravatar.com/avatar/${avatar.gravatar.hash}`,
        ),
    id: z.number(),
    username: z.string(),
});
