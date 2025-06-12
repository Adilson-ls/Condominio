import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../contexts/AuthContext';
import useFormValidation from '../../../hooks/useFormValidation';
import { registerSchema, RegisterFormData } from '../schemas/authSchemas';

const RegisterScreen: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const {
        values,
        errors,
        isSubmitting,
        submitError,
        handleChange,
        handleSubmit,
    } = useFormValidation<RegisterFormData>({
        initialValues: { email: '', password: '', confirmPassword: '' },
        schema: registerSchema,
        onSubmit: async (formData) => {
            await register(formData.email, formData.password);
            navigate('/dashboard');
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Registro - Condomínio Conectado</h2>
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
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirmar Senha"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        placeholder="********"
                        error={errors.confirmPassword}
                    />
                    <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                        {isSubmitting ? 'Registrando...' : 'Registrar'}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    Já tem uma conta? <Link to="/login" className="text-blue-500 hover:underline text-sm">Faça login</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;