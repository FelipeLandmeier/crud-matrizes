export type MatrizPart = {
  id: string;
  name: string;
  hours: number;
};

export type NewMatrizPayload = {
  displayName: string;     // nome que o cliente vê
  originalName: string;    // nome original da peça
  parts: MatrizPart[];     // partes com horas
  totalHours: number;      // soma das horas
  laborRate: number;       // R$/hora aplicado
  laborCost: number;       // totalHours * laborRate
  imageBase64?: string;    // imagem (base64) para simplificar
};
