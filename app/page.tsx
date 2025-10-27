"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const matrizes = [
  { id: 1, nome: "Matriz 1", categoria: "Categoria X" },
  { id: 2, nome: "Matriz 2", categoria: "Categoria X" },
  { id: 3, nome: "Matriz 3", categoria: "Categoria X" },
  { id: 4, nome: "Matriz 4", categoria: "Categoria X" },
  { id: 5, nome: "Matriz 5", categoria: "Categoria X" },
  { id: 6, nome: "Matriz 6", categoria: "Categoria X" },
  { id: 7, nome: "Matriz 7", categoria: "Categoria X" },
  { id: 8, nome: "Matriz 8", categoria: "Categoria X" },
];

export default function CatalogoPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#161616] flex flex-col p-6 relative">
      {/* Botão Menu */}
     {!open && (
        <button
          className="absolute top-4 left-4 text-white z-50"
          onClick={() => setOpen(true)}
        >
          <Menu size={28} />
        </button>
      )}
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1f1f1f] text-white p-6 transform transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botão fechar */}
        <button className="mb-6" onClick={() => setOpen(false)}>
          <X size={28} />
        </button>

        <nav className="flex flex-col gap-4">
          <Link href="/login" className="hover:text-blue-400">Login</Link>
          <Link href="/sobre" className="hover:text-blue-400">Sobre</Link>
          <Link href="/contato" className="hover:text-blue-400">Contato</Link>
        </nav>
      </div>

      {/* Cabeçalho */}
      <div className="text-center mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">Bem-vindo ao Matriz Control!</h1>
        <p className="text-gray-300 mt-2">Aqui estão alguns modelos de matrizes já produzidos por nós:</p>
      </div>

      {/* Grid de matrizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {matrizes.map((m) => (
          <div
            key={m.id}
            className="bg-[#f5f5f5] p-4 rounded-lg shadow-md flex items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-black">{m.nome}</h3>
              <p className="text-gray-700">{m.categoria}</p>
              <Link
                href={`/matriz/${m.id}`}
                className="inline-block mt-2 text-blue-500 font-medium hover:underline cursor-pointer"
              >
                Ver Detalhes →
              </Link>
            </div>

            <div className="h-20 w-20 flex items-center justify-center rounded-md overflow-hidden bg-gray-200">
              <Image
                src="/images/default.png"
                alt={`Imagem da ${m.nome}`}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
