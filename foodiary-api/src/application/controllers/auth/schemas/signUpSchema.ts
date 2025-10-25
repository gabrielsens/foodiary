import { Profile } from '@application/entities/Profile';
import z from 'zod';

export const signUpSchema = z.object({
  account: z.object({
    email: z.email('Invalid email'),
    password: z
      .string()
      .min(8, '"password" should be at least 8 characters long'),
  }),
  profile: z.object({
    name: z.string().min(1, '"name" is required'),
    birthDate: z.iso
      .date('"birthDate" should be a valid date (YYYY-MM-DD)')
      .transform((date) => new Date(date)),
    gender: z.enum(Profile.Gender),
    height: z.number(),
    weight: z.number(),
    goal: z.enum(Profile.Goal),
    activityLevel: z.enum(Profile.ActivityLevel),
  }),
});

export type SignUpBody = z.infer<typeof signUpSchema>;
