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
