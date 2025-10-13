import z from 'zod';

export const confirmForgotPasswordSchema = z.object({
  email: z.email('Invalid email'),
  code: z.string().min(6, '"code" should be at least 6 characters long'),
  newPassword: z.string().min(8, '"newPassword" should be at least 8 characters long'),
});

export type ConfirmForgotPasswordBody = z.infer<typeof confirmForgotPasswordSchema>;
