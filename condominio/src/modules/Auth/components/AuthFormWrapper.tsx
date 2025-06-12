import React from 'react';

interface AuthFormWrapperProps {
    title: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    submitButtonText: string;
    isSubmitting: boolean;
    errorMessage?: string;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
    title,
    onSubmit,
    children,
    submitButtonText,
    isSubmitting,
    errorMessage,
}) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
                {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                <form onSubmit={onSubmit}>
                    {children}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Carregando...' : submitButtonText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthFormWrapper;