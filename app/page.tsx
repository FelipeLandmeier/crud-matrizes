import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-white">Bem-vindo ao Menu Principal!</h1>
      <h2 className="mb-5 text-white">Selecione abaixo o que desejar:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          href="/catalogo"
          className="bg-white px-8 py-6 rounded-2xl shadow-sm border hover:shadow-md transition text-center"
        >
          <h2 className="text-xl font-semibold text-gray-800">Catálogo</h2>
          <p className="text-sm text-gray-500 mt-2">Visualizar matrizes cadastradas</p>
        </Link>

        <Link
          href="/matrizes"
          className="bg-white px-8 py-6 rounded-2xl shadow-sm border hover:shadow-md transition text-center"
        >
          <h2 className="text-xl font-semibold text-gray-800">Cadastro</h2>
          <p className="text-sm text-gray-500 mt-2">Cadastrar nova matriz</p>
        </Link>
      </div>
    </div>
  );
}
