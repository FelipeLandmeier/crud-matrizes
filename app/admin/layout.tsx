import React from "react";
import AdminNav from "./_components/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar em cima */}
      <header className="w-full bg-gray-800 p-4 shadow-lg">
        <AdminNav />
      </header>

      {/* Conteúdo flexível abaixo */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
