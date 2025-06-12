import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth';
import { auth } from '../../../config/firebase';

const getFirebaseErrorMessage = (error: any): string => {
    switch (error.code) {
        case 'auth/user-not-found': return 'Usuário não encontrado.';
        case 'auth/wrong-password': return 'Senha incorreta.';
        case 'auth/invalid-email': return 'Email inválido.';
        case 'auth/email-already-in-use': return 'Este email já está em uso.';
        case 'auth/weak-password': return 'A senha deve ter pelo menos 6 caracteres.';
        default: return 'Ocorreu um erro inesperado. Tente novamente.';
    }
};

export const signInUser = async (email: string, password: string): Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        throw new Error(getFirebaseErrorMessage(error));
    }
};

export const signUpUser = async (email: string, password: string): Promise<void> => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        throw new Error(getFirebaseErrorMessage(error));
    }
};

export const sendPasswordResetLink = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        throw new Error(getFirebaseErrorMessage(error));
    }
};

export const signOutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error: any) {
        throw new Error('Não foi possível fazer logout. Tente novamente.');
    }
};