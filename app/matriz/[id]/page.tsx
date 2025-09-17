interface Props {
  params: { id: string };
}

export default function MatrizPage({ params }: Props) {
  const { id } = params;

  const matriz = {
    id,
    nome: `Matriz ${id}`,
    categoria: "Categoria X",
    descricao: "Essa é uma descrição mais detalhada da matriz, só pra teste.",
    material: "Aço",
    tamanho: "10x20",
  };

  return (
    <div className="bg-white max-w-2xl mx-auto p-8 rounded-2xl shadow-sm border">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{matriz.nome}</h2>
      <img src="/images/default.png" alt="" className="mx-auto"/>
      <dl className="space-y-2 text-gray-700">
        <div>
          <dt className="font-bold">Categoria:</dt>
          <dd>{matriz.categoria}</dd>
        </div>
        <div>
          <dt className="font-bold">Material:</dt>
          <dd>{matriz.material}</dd>
        </div>
        <div>
          <dt className="font-bold">Tamanho:</dt>
          <dd>{matriz.tamanho}</dd>
        </div>
        <div>
          <dt className="font-bold">Descrição:</dt>
          <dd>{matriz.descricao}</dd>
        </div>
      </dl>

      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
        Adicionar ao Orçamento
      </button>
    </div>
  );
}
