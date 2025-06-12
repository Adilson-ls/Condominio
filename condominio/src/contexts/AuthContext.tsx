import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../config/firebase';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { signInUser, signUpUser, signOutUser, sendPasswordResetLink } from '../modules/Auth/api/authApi';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: typeof signInUser;
    register: typeof signUpUser;
    logout: typeof signOutUser;
    resetPassword: typeof sendPasswordResetLink;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value: AuthContextType = {
        currentUser,
        loading,
        login: signInUser,
        register: signUpUser,
        logout: signOutUser,
        resetPassword: sendPasswordResetLink
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};