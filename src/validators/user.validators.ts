import { z } from "zod";

export const userSchema = z.object({
  email: z.email(),
  senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type UserInput = z.infer<typeof userSchema>;
