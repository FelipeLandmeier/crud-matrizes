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
    <div className="flex items-center justify-center min-h-screen bg-[#161616]">
      <div className="w-full max-w-md text-center p-8">
        {/* Logo */}
        <div className="mb-6">
          <h1 className="text-white font-bold text-lg">*LOGO DA VIPI*</h1>
        </div>

        {/* Título */}
        <h2 className="text-white text-lg font-bold mb-2">Acesse sua conta</h2>
        <p className="text-white text-sm mb-6">
          Faça login para continuar como Administrador
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@dominio.com"
            required
          />

          <input
            type="password"
            id="senha"
            className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="senha"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#949090] text-white py-2 rounded-md font-bold hover:bg-gray-600 transition cursor-pointer"
          >
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}
