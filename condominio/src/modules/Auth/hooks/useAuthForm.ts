import { useState } from 'react';
import { LoginFormData, RegisterFormData, ForgotPasswordFormData } from '../schemas/authSchemas';
import { signInUser, signUpUser, sendPasswordResetLink } from '../api/authApi';

const useAuthForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (data: LoginFormData) => {
        setLoading(true);
        setError(null);
        try {
            await signInUser(data.email, data.password);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterFormData) => {
        setLoading(true);
        setError(null);
        try {
            await signUpUser(data.email, data.password);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (data: ForgotPasswordFormData) => {
        setLoading(true);
        setError(null);
        try {
            await sendPasswordResetLink(data.email);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        error,
        loading,
        login,
        register,
        resetPassword,
    };
};

export default useAuthForm;