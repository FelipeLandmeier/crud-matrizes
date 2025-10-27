import pool from "@/lib/db";
import { NextResponse } from "next/server";

// GET – listar matrizes
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM matrizes ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar matrizes:", error);
    return NextResponse.json({ error: "Erro ao buscar matrizes" }, { status: 500 });
  }
}

// POST – criar nova matriz
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nome, codigo, categoria, tamanho, material, custo, lucro, preco, imagem, descricao } = data;

    const result = await pool.query(
      `INSERT INTO matrizes (nome, codigo, categoria, tamanho, material, custo, lucro, preco, imagem, descricao)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [nome, codigo, categoria, tamanho, material, custo, lucro, preco, imagem, descricao]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao salvar matriz:", error);
    return NextResponse.json({ error: "Erro ao salvar matriz" }, { status: 500 });
  }
}

// PUT – atualizar matriz existente
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, nome, codigo, categoria, tamanho, material, custo, lucro, preco, imagem, descricao } = data;

    const result = await pool.query(
      `UPDATE matrizes
       SET nome=$1, codigo=$2, categoria=$3, tamanho=$4, material=$5, custo=$6, lucro=$7, preco=$8, imagem=$9, descricao=$10
       WHERE id=$11 RETURNING *`,
      [nome, codigo, categoria, tamanho, material, custo, lucro, preco, imagem, descricao, id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao atualizar matriz:", error);
    return NextResponse.json({ error: "Erro ao atualizar matriz" }, { status: 500 });
  }
}

// DELETE – remover matriz
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }

    await pool.query("DELETE FROM matrizes WHERE id=$1", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir matriz:", error);
    return NextResponse.json({ error: "Erro ao excluir matriz" }, { status: 500 });
  }
}
