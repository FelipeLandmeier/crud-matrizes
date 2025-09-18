import "./globals.css";

export const metadata = {
  title: "Início",
  description: "Sistema de orçamento e estoque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-[#161616] text-gray-800">
        {children}
      </body>
    </html>
  );
}
