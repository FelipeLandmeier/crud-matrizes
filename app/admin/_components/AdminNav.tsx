"use client";
import Link from "next/link";

const links = [
  { href: "/admin", label: "Visão Geral" },
  { href: "/admin/financeiro", label: "Financeiro" },
  { href: "/admin/matrizes/producao", label: "Matrizes em produção" },
  { href: "/admin/matrizes/concluidas", label: "Matrizes concluídas" },
  { href: "/admin/estoque", label: "Estoque" },
  { href: "/admin/orcamentos", label: "Orçamentos" },
];

export default function AdminNav() {
  return (
    <nav className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        {/* Avatar inicial */}
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold">
          V
        </div>
        <span className="font-semibold text-lg">Painel VIPI</span>
      </div>

      <div className="flex gap-2 bg-gray-800 p-2 rounded-lg">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 transition"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="/login"
        className="text-red-400 hover:text-red-300 font-medium"
      >
        Sair
      </Link>
    </nav>
  );
}
