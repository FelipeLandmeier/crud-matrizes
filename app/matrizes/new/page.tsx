'use client';

import MatrizForm from '../../components/matriz/MatrizForm';


export default function NewMatrizPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Nova Matriz</h1>
        <p className="text-sm text-gray-600 mb-6">
          Cadastre a matriz, adicione as partes com as horas de usinagem e veja o custo de mão de obra automaticamente.
        </p>
        <MatrizForm />
      </div>
    </main>
  );
}
