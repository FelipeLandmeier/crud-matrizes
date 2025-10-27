"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


     if (email === "admin@vipi.com" && senha === "123456") {
       document.cookie = "auth=true; path=/;";

       router.push("/admin"); //
     } else {
       alert("Credenciais inválidas. Verifique seu e-mail e senha.");
     }
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


        {/* Formulário */}
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
             <button
                className="w-full bg-[#ADD8E6] text-white py-2 rounded-md font-bold hover:bg-gray-600 transition cursor-pointer"
                onClick={() => router.push("/")}
              >
                VOLTAR AO MENU INICIAL
              </button>
        </form>
      </div>
    </div>
  );
}
