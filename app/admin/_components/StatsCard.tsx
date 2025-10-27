// _components/StatsCard.tsx
"use client";

import { useState } from "react";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  onAction?: (action: "ver-detalhes" | "exportar" | "atualizar-meta") => void;
};

export default function StatsCard({ title, value, subtitle, onAction }: Props) {
  const [open, setOpen] = useState(false);

  const act = (a: Props["onAction"] extends (...args: any) => any ? Parameters<NonNullable<Props["onAction"]>>[0] : never) => {
    setOpen(false);
    onAction?.(a as any);
  };

  return (
    <div className="relative bg-white text-black rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-gray-500">{title}</div>
          <div className="text-2xl font-bold leading-tight">{value}</div>
          {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
        </div>

        {/* Menu opcional */}
        <div className="relative">
          <button
            type="button"
            className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-100"
            onClick={() => setOpen(v => !v)}
            aria-label="Ações do card"
            title="Ações"
          >
            ⋯
          </button>
          {open && (
            <div
              className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg text-sm"
              onMouseLeave={() => setOpen(false)}
            >
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => act("ver-detalhes")}>Ver detalhes</button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => act("exportar")}>Exportar CSV</button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => act("atualizar-meta")}>Atualizar meta</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
