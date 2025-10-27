import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM matrizes ORDER BY id ASC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar matrizes:", error);
    return NextResponse.json({ error: "Erro ao buscar matrizes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const {
      nome,
      codigo,
      categoria,
      tamanho,
      material,
      custo,
      lucro,
      preco,
      imagem,
      descricao,
    } = await request.json();

    const result = await pool.query(
      `INSERT INTO matrizes
        (nome, codigo, categoria, tamanho, material, custo, lucro, preco, imagem, descricao)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [nome, codigo, categoria, tamanho, material, custo, lucro, preco, imagem, descricao]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao adicionar matriz:", error);
    return NextResponse.json({ error: "Erro ao adicionar matriz" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id, nome, codigo, categoria, tamanho, material, custo, lucro, preco, imagem, descricao } =
    await request.json();

  try {
    const result = await pool.query(
      `UPDATE matrizes
       SET nome=$1, codigo=$2, categoria=$3, tamanho=$4, material=$5,
           custo=$6, lucro=$7, preco=$8, imagem=$9, descricao=$10
       WHERE id=$11 RETURNING *`,
      [nome, codigo, categoria, tamanho, material, custo, lucro, preco, imagem, descricao, id]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao atualizar matriz:", error);
    return NextResponse.json({ error: "Erro ao atualizar matriz" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  try {
    await pool.query("DELETE FROM matrizes WHERE id = $1", [id]);
    return NextResponse.json({ message: "Matriz excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir matriz:", error);
    return NextResponse.json({ error: "Erro ao excluir matriz" }, { status: 500 });
  }
}

