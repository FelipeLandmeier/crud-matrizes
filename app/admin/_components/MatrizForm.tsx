'use client';

import { useMemo, useState, useEffect } from 'react';
import { brl } from '@/lib/currency';

type MatrizPart = {
  id: string;
  name: string;
  inputHours: string; // aceita "hh:mm" ou decimal
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** Converte "hh:mm" | "2.5" | "2,5" -> horas decimais */
function parseToHours(v: string): number {
  const s = (v || '').trim().replace(',', '.');
  if (!s) return 0;
  if (s.includes(':')) {
    const [hh, mm = '0'] = s.split(':');
    const h = Number(hh) || 0;
    const m = Math.max(0, Math.min(59, Number(mm) || 0));
    return h + m / 60;
  }
  return Number(s) || 0;
}

/** Converte "120,50" | "120.50" -> número */
function parseMoney(v: string): number {
  if (!v) return 0;
  const s = v.replace(/\./g, '').replace(',', '.').trim();
  return Number(s) || 0;
}

/** Converte "30" | "30,5" | "30.5" -> número (percentual) */
function parsePercent(v: string): number {
  if (!v) return 0;
  const s = v.replace('%', '').replace(',', '.').trim();
  return Number(s) || 0;
}

export default function MatrizForm() {
  const [displayName, setDisplayName] = useState('');
  const [originalName, setOriginalName] = useState('');

  const [parts, setParts] = useState<MatrizPart[]>([
    { id: uid(), name: '', inputHours: '' },
  ]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>();

  // Taxa/hora (string para permitir vazio) e % lucro
  const [laborRateInput, setLaborRateInput] = useState<string>(''); // começa vazio
  const [profitPctInput, setProfitPctInput] = useState<string>(''); // começa vazio

  const laborRate = useMemo(() => parseMoney(laborRateInput), [laborRateInput]);
  const profitPct = useMemo(() => parsePercent(profitPctInput), [profitPctInput]);

  const [submitting, setSubmitting] = useState(false);

  // Preview da imagem
  useEffect(() => {
    if (!imageFile) return setImagePreview(undefined);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  const totalHours = useMemo(
    () => parts.reduce((acc, p) => acc + parseToHours(p.inputHours), 0),
    [parts]
  );
  const laborCost = useMemo(
    () => (laborRate ? totalHours * laborRate : 0),
    [totalHours, laborRate]
  );
  const profitValue = useMemo(
    () => (laborRate ? laborCost * (profitPct / 100) : 0),
    [laborCost, laborRate, profitPct]
  );
  const priceWithProfit = useMemo(
    () => (laborRate ? laborCost + profitValue : 0),
    [laborCost, profitValue, laborRate]
  );

  function addPart(prefill?: Partial<MatrizPart>) {
    setParts(ps => [...ps, { id: uid(), name: prefill?.name ?? '', inputHours: prefill?.inputHours ?? '' }]);
  }
  function removePart(id: string) {
    setParts(ps => (ps.length > 1 ? ps.filter(p => p.id !== id) : ps));
  }
  function updatePart(id: string, patch: Partial<MatrizPart>) {
    setParts(ps => ps.map(p => (p.id === id ? { ...p, ...patch } : p)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageBase64: string | undefined = imagePreview;

      const payload = {
        displayName,
        originalName,
        parts: parts.map(p => ({ name: p.name, hours: parseToHours(p.inputHours) })),
        totalHours,
        laborRate,
        laborCost,
        profitPct,
        profitValue,
        priceWithProfit,
        imageBase64,
      };

      const res = await fetch('/api/matrizes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Falha ao salvar');

      alert('Matriz cadastrada com sucesso!');
      setDisplayName('');
      setOriginalName('');
      setParts([{ id: uid(), name: '', inputHours: '' }]);
      setImageFile(null);
      setLaborRateInput('');
      setProfitPctInput('');
    } catch (err: any) {
      alert(err?.message || 'Erro inesperado');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-32">
      {/* Foto */}
      <div className="grid gap-2">
        <label className="font-medium">Imagem da matriz</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          className="block w-full border rounded p-2 bg-black/20"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Pré-visualização"
            className="mt-2 h-40 w-auto rounded border object-cover bg-black/20"
          />
        )}
      </div>

      {/* Campos principais */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1">
          <label className="font-medium">Nome de exibição</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Ex.: Chinelo 2167"
            className="border rounded p-2 bg-black/20"
            required
          />
        </div>
        <div className="grid gap-1">
          <label className="font-medium">Nome interno</label>
          <input
            value={originalName}
            onChange={(e) => setOriginalName(e.target.value)}
            placeholder="Ex.: DMS - Chinelo 2167"
            className="border rounded p-2 bg-black/20"
            required
          />
        </div>
      </div>

      {/* Taxa e % de lucro */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1 sm:max-w-xs">
          <label className="font-medium">Custo hora da mão de obra (R$/h)</label>
          <div className="flex items-stretch border rounded overflow-hidden">
            <span className="w-10 px-3 py-2 text-sm bg-white/10 border-r flex items-center justify-center">R$</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="00,00"
              value={laborRateInput}
              onChange={(e) => setLaborRateInput(e.target.value)}
              className="flex-1 p-2 bg-black/20"
            />
          </div>
          <p className="text-xs opacity-70">Custo de mão de obra por hora trabalhada.</p>
        </div>

        <div className="grid gap-1 sm:max-w-xs">
          <label className="font-medium">Margem de lucro (%)</label>
          <div className="flex items-stretch border rounded overflow-hidden">
            <input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={profitPctInput}
              onChange={(e) => setProfitPctInput(e.target.value)}
              className="flex-1 p-2 bg-black/20"
            />
            <span className="w-10 px-3 py-2 text-sm bg-white/10 border-l flex items-center justify-center">%</span>
          </div>
          <p className="text-xs opacity-70">Aplicado sobre o custo de mão de obra.</p>
        </div>
      </div>

      {/* Partes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Componentes da matriz</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addPart()}
              className="px-3 py-2 rounded border hover:bg-white/10"
            >
              + Adicionar componente
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {parts.map((p, idx) => {
            const hoursDec = parseToHours(p.inputHours);
            return (
              <div key={p.id} className="grid grid-cols-12 gap-2 items-center">
                <input
                  className="col-span-7 border rounded p-2 bg-black/20"
                  placeholder={`Nome do componente (ex.: Macho Lado 1)`}
                  // placeholder={`Parte #${idx + 1} (ex.: Macho Lado 1)`}
                  value={p.name}
                  onChange={(e) => updatePart(p.id, { name: e.target.value })}
                  required
                />
                <input
                  className="col-span-3 border rounded p-2 bg-black/20"
                  placeholder="Tempo estimado (h)"
                  value={p.inputHours}
                  onChange={(e) => updatePart(p.id, { inputHours: e.target.value })}
                  aria-label="Horas trabalhadas"
                />
                <div className="col-span-1 text-xs opacity-70 text-right">
                  {hoursDec ? hoursDec.toFixed(2) + 'h' : ''}
                </div>
                <button
                  type="button"
                  onClick={() => removePart(p.id)}
                  className="col-span-1 px-2 py-2 border rounded hover:bg-white/10"
                  title="Remover"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Barra de resumo com alto contraste */}
      <div className="fixed left-0 right-0 bottom-4 mx-auto w-[min(1100px,92%)]">
        <div className="rounded-xl border border-white/30 bg-black/70 backdrop-blur px-4 py-3 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[15px]">
            <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20 font-medium">
              Tempo total: <span className="font-semibold">{totalHours.toFixed(2)} h</span>
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20">
                Custo hora aplicado: <strong>{laborRate ? `${brl(laborRate)} / h` : '—'}</strong>
              </span>
              <span className={`px-2 py-1 rounded-md border border-white/20 ${laborRate ? 'bg-white/10' : 'bg-white/10'} font-semibold`}>
                Custo Mão de Obra: {laborRate ? brl(laborCost) : '—'}
              </span>
              <span className={`px-2 py-1 rounded-md border border-white/20 ${laborRate ? 'bg-white/10' : 'bg-white/10'} font-semibold`}>
                Lucro: {laborRate ? brl(profitValue) : '—'} {profitPct ? `(${profitPct.toFixed(2)}%)` : ''}
              </span>
              <span className={`px-2 py-1 rounded-md border border-white/20 ${laborRate ? 'bg-white text-black' : 'bg-white/10'} font-semibold`}>
                Preço final: {laborRate ? brl(priceWithProfit) : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded bg-white text-black font-medium hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? 'Salvando...' : 'Salvar'}
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplayName(''); setOriginalName('');
            setParts([{ id: uid(), name: '', inputHours: '' }]);
            setImageFile(null); setLaborRateInput(''); setProfitPctInput('');
          }}
          className="px-4 py-2 rounded border hover:bg-white/10"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}
