import Link from "next/link";

export default function MatrizesPage() {
  // por enquanto só layout, sem buscar no banco
  const matrizes = [
    { id: 1, nome: "Matriz A", preco: 1200 },
    { id: 2, nome: "Matriz B", preco: 2500 },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Matrizes</h1>
        <Link
          href="/matrizes/novo"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Cadastrar Matriz
        </Link>
      </div>

      <ul className="space-y-2">
        {matrizes.map((m) => (
          <li
            key={m.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <span>{m.nome}</span>
            <Link
              href={`/matrizes/${m.id}`}
              className="text-blue-600 hover:underline"
            >
              Ver detalhes
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
