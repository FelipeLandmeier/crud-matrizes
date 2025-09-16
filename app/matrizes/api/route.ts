import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // usado pelo form para ler a taxa do servidor
  const getRate = req.nextUrl.searchParams.get('getRate');
  if (getRate) {
    const laborRate = Number(process.env.LABOR_RATE ?? '0');
    return NextResponse.json({ laborRate });
  }
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // TODO: aqui você valida com Zod/Valibot, salva no DB e armazena imagem
    // Exemplo de log (remova em prod):
    console.log('Nova matriz recebida:', {
      displayName: body.displayName,
      originalName: body.originalName,
      parts: body.parts?.length,
      totalHours: body.totalHours,
      laborRate: body.laborRate,
      laborCost: body.laborCost,
      hasImage: !!body.imageBase64,
    });

    // Simula ID gerado
    const id = 'mx_' + Math.random().toString(36).slice(2, 8);

    return NextResponse.json({ id, ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
}
