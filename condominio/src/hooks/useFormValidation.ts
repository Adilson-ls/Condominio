import { useState, useCallback } from 'react';
import { ZodSchema, ZodError } from 'zod';

interface UseFormValidationProps<T> {
    initialValues: T;
    schema: ZodSchema<T>;
    onSubmit: (values: T) => Promise<void>;
}

const useFormValidation = <T>({ initialValues, schema, onSubmit }: UseFormValidationProps<T>) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        if (errors[name as keyof T]) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name as keyof T];
                return newErrors;
            });
        }
    }, [errors]);

    const validate = useCallback((data: T) => {
        try {
            schema.parse(data);
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof ZodError) {
                const newErrors: Partial<Record<keyof T, string>> = {};
                err.errors.forEach((e) => {
                    if (e.path.length > 0) {
                        newErrors[e.path[0] as keyof T] = e.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    }, [schema]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);

        if (validate(values)) {
            try {
                await onSubmit(values);
            } catch (err: any) {
                setSubmitError(err.message || 'Erro ao processar sua solicitação.');
            }
        }
        setIsSubmitting(false);
    }, [values, validate, onSubmit]);

    return {
        values,
        errors,
        isSubmitting,
        submitError,
        handleChange,
        handleSubmit,
    };
};

export default useFormValidation;