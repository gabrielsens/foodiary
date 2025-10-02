import z from 'zod';

export const helloSchema = z.object({
  email: z.email(),
});

export type HelloBody = z.infer<typeof helloSchema>;
