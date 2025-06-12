import { z } from 'zod';

export const emailValidationSchema = z.string().email('Email inválido.');

export const passwordValidationSchema = z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.');

export const confirmPasswordValidationSchema = (password: string) => 
    z.string().min(6, 'Confirme sua senha.').refine((val) => val === password, {
        message: 'As senhas não coincidem.',
        path: ['confirmPassword'],
    });

export const validateEmail = (email: string) => {
    const result = emailValidationSchema.safeParse(email);
    return result.success ? null : result.error.errors[0].message;
};

export const validatePassword = (password: string) => {
    const result = passwordValidationSchema.safeParse(password);
    return result.success ? null : result.error.errors[0].message;
};