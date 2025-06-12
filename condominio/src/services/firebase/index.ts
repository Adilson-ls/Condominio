// src/services/firebase/index.ts
import { auth } from '../../config/firebase';

// Funções auxiliares para interagir com o Firebase Auth

export const getCurrentUser = () => {
    return auth.currentUser;
};

// Outras funções auxiliares podem ser adicionadas aqui conforme necessário.