import Link from "next/link";

const matrizes = [
  { id: 1, nome: "Matriz A", categoria: "Categoria X" },
  { id: 2, nome: "Matriz B", categoria: "Categoria Y" },
  { id: 3, nome: "Matriz C", categoria: "Categoria Z" },
];

export default function CatalogoPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Matrizes Disponíveis</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {matrizes.map((m) => (
          <div
            key={m.id}
            className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg text-gray-800">{m.nome}</h3>
            <p className="text-sm text-gray-500">{m.categoria}</p>
            <Link
              href={`/matriz/${m.id}`}
              className="inline-block mt-4 text-blue-600 font-medium hover:underline"
            >
              Ver detalhes →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
