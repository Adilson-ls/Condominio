import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ className = '', children, ...props }) => {
    return (
        <button
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;