#!/bin/bash

mkdir -p src/assets \
src/components \
src/contexts \
src/hooks \
src/modules/Auth \
src/services/firebase \
src/utils \
src/routes

# src/services/firebase/config.js
cat << 'EOF' > src/services/firebase/config.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default app;
EOF

# src/contexts/AuthContext.jsx
cat << 'EOF' > src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../services/firebase/config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
EOF

# src/modules/Auth/Login.jsx
cat << 'EOF' > src/modules/Auth/Login.jsx
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../services/firebase/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (err) {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Entrar</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="block w-full mb-2 border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        className="block w-full mb-2 border p-2 rounded"
      />
      {erro && <div className="text-red-500 mb-2">{erro}</div>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Entrar</button>
    </form>
  );
}
EOF

# src/routes/AppRoutes.jsx
cat << 'EOF' > src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../modules/Auth/Login";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
EOF

# src/App.js
cat << 'EOF' > src/App.js
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
EOF

# src/index.js
cat << 'EOF' > src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

echo "Estrutura criada com sucesso!"