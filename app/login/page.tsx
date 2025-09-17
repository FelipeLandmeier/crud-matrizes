"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, senha });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border p-8">
        {/* espaço pra logo futuramente */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Acesse sua conta</h1>
          {/* <h1 className="text-2xl font-bold text-gray-800">Área Restrita</h1> */}
          <p className="text-gray-500 text-sm">Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-500">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-500">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Entrar
          </button>
          <p className="text-gray-500 text-sm">Não possui conta? <a className="text-blue-500 text-sm" href="">Registre-se.</a></p>
        </form>
      </div>
    </div>
  );
}
