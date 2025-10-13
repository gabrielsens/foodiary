import z from 'zod';

export const signInSchema = z.object({
  email: z.email('Invalid email'),
  password: z
    .string()
    .min(8, '"password" should be at least 8 characters long'),
});

export type SignInBody = z.infer<typeof signInSchema>;
