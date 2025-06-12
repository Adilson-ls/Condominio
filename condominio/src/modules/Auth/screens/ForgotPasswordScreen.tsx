import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../contexts/AuthContext';
import useFormValidation from '../../../hooks/useFormValidation';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../schemas/authSchemas';

const ForgotPasswordScreen: React.FC = () => {
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const {
        values,
        errors,
        isSubmitting,
        submitError,
        handleChange,
        handleSubmit,
    } = useFormValidation<ForgotPasswordFormData>({
        initialValues: { email: '' },
        schema: forgotPasswordSchema,
        onSubmit: async (formData) => {
            await resetPassword(formData.email);
            navigate('/login');
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Recuperação de Senha</h2>
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
                    <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar Link de Recuperação'}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-blue-500 hover:underline text-sm">Voltar ao Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;