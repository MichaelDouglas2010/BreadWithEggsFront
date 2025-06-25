export interface Equipment {
  description: string;
  marca: string;
  dataEntrada: string; // Data no formato ISO
  status: 'ativo' | 'inativo' | 'emprestado';
  qrCodeData?: string; // Opcional
}

export interface EquipmentGet {
  _id: string; // No frontend, o ObjectId sempre será uma string
  description: string;
  marca: string;
  dataEntrada: string; // Data no formato ISO
  status: 'ativo' | 'inativo' | 'emprestado';
  qrCodeData?: string; // Opcional
}