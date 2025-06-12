import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../contexts/AuthContext';
import useFormValidation from '../../../hooks/useFormValidation';
import { loginSchema, LoginFormData } from '../schemas/authSchemas';

const LoginScreen: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        values,
        errors,
        isSubmitting,
        submitError,
        handleChange,
        handleSubmit,
    } = useFormValidation<LoginFormData>({
        initialValues: { email: '', password: '' },
        schema: loginSchema,
        onSubmit: async (formData) => {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login - Condomínio Conectado</h2>
                {submitError && <p className="text-red-500 text-sm mb-4">{submitError}</p>}
                <form onSubmit={handleSubmit}>
                    <Input
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        error={errors.email}
                    />
                    <Input
                        id="password"
                        name="password"
                        label="Senha"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="********"
                        error={errors.password}
                    />
                    <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                        {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/forgot-password" className="text-blue-500 hover:underline text-sm">Esqueceu a senha?</Link>
                </div>
                <div className="mt-2 text-center">
                    Não tem uma conta? <Link to="/register" className="text-blue-500 hover:underline text-sm">Registre-se</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;