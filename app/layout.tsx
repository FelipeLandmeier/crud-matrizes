import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Catálogo de Matrizes",
  description: "Sistema de orçamento e estoque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-50 text-gray-800">
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition">
              Catálogo
            </Link>
            <nav>
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
